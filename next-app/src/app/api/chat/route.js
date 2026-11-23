import { searchEmbeddings } from '../../../lib/search';
import OpenAI from 'openai';
import { jwtVerify } from 'jose';
import { getSystemPrompt, toolsDefinitions } from '../../../lib/chatConfig';
import { checkRateLimit, getClientIp, validateOrigin } from '../../../lib/rateLimit';
import { CHAT_COOKIE_NAME } from '../token/route';
import sanitizeHtml from 'sanitize-html';

export const runtime = 'nodejs';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const sessionMemory = new Map();
const MAX_MEMORY_PAIRS = 3;
const MAX_MEMORY_SESSIONS = 1000;
const MAX_REQUESTS = 20;
const WINDOW_MS = 60 * 1000;
const MAX_MESSAGE_LENGTH = 1500;
const MAX_TOOL_ROUNDS = 2;
const MAX_TOOL_CALLS_PER_ROUND = 3;
const MAX_QUERY_LENGTH = 400;
const MAX_COMPLETION_TOKENS = 700;
const MODEL_UNAVAILABLE_MSG = 'The model is currently unavailable. Please try again later.';

function extractToken(req) {
  // 1. Prefer HttpOnly cookie set by /api/token (invisible to client JS & request headers)
  const cookieHeader = req.headers.get('cookie') || '';
  for (const part of cookieHeader.split(';')) {
    const [rawName, ...rest] = part.trim().split('=');
    if (rawName === CHAT_COOKIE_NAME && rest.length > 0) {
      return rest.join('=');
    }
  }
  // 2. Fallback to Authorization header for automated eval test runner
  const authHeader = req.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7).trim();
  }
  return null;
}

export async function POST(req) {
  console.log(`[${new Date().toISOString()}] POST /api/chat start`);

  try {
    const token = extractToken(req);
    let jwtPayload = null;
    if (token) {
      try {
        const verified = await jwtVerify(token, new TextEncoder().encode(process.env.FRONTEND_JWT_SECRET));
        jwtPayload = verified.payload;
      } catch {
        jwtPayload = null;
      }
    }

    const isEvaluatorToken = jwtPayload?.role === 'evaluator';
    const originCheck = validateOrigin(req, {
      allowEvaluatorBypass: isEvaluatorToken && process.env.VERCEL_ENV !== 'production',
    });
    if (!originCheck.allowed) {
      return new Response(JSON.stringify({ error: originCheck.reason }), { status: 403 });
    }

    if (!token) {
      return new Response(JSON.stringify({ error: 'Missing token' }), { status: 401 });
    }
    if (!jwtPayload) {
      return new Response(JSON.stringify({ error: 'Invalid or expired token' }), { status: 401 });
    }

    // Parse body
    const body = await req.json();
    const rawMessage = body.message;

    // Eval Mode is strictly restricted to non-production or tokens explicitly signed with role === 'evaluator'
    const evalHeader = req.headers.get('x-eval-mode');
    const isEvalMode =
      evalHeader === 'true' && (process.env.VERCEL_ENV !== 'production' && (process.env.NODE_ENV !== 'production' || isEvaluatorToken));
    const evalData = { contexts: [], tool_calls: [] };

    if (!rawMessage || typeof rawMessage !== 'string' || rawMessage.trim() === '') {
      return new Response(JSON.stringify({ error: 'Message is required' }), { status: 400 });
    }

    // Derive sessionId from the signed JWT payload so clients cannot spoof other sessions
    const rawSessionId =
      typeof jwtPayload?.sid === 'string' && jwtPayload.sid
        ? jwtPayload.sid
        : typeof body.sessionId === 'string' && body.sessionId
          ? body.sessionId
          : 'anonymous';

    const message = sanitizeHtml(rawMessage, { allowedTags: [], allowedAttributes: {} });
    const sessionId = sanitizeHtml(rawSessionId, { allowedTags: [], allowedAttributes: {} });

    if (message.length > MAX_MESSAGE_LENGTH) {
      return new Response(JSON.stringify({ error: `Message too long. Max length is ${MAX_MESSAGE_LENGTH}.` }), {
        status: 400,
      });
    }

    // Self-managed rate limiting across both client IP and signed session ID
    const ip = getClientIp(req, sessionId);
    if (!isEvalMode) {
      const ipAllowed = checkRateLimit(`chat:ip:${ip}`, MAX_REQUESTS, WINDOW_MS);
      const sessionAllowed = checkRateLimit(`chat:sid:${sessionId}`, MAX_REQUESTS, WINDOW_MS);
      if (!ipAllowed || !sessionAllowed) {
        return new Response(JSON.stringify({ error: '⚠️ Rate limit exceeded. Please wait 1 minute.' }), {
          status: 429,
        });
      }
    }

    // Retrieve memory
    const memory = sessionMemory.get(sessionId) || [];
    const recentMemory = memory.slice(-MAX_MEMORY_PAIRS);
    const memoryContext = recentMemory.map((pair) => `User: ${pair.question}\nAssistant: ${pair.answer}`).join('\n\n');

    const systemPrompt = getSystemPrompt();

    const currentMessages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Memory:\n${memoryContext}\n\nQuestion:\n${message}` },
    ];

    let toolRounds = 0;

    while (true) {
      const allowTools = toolRounds < MAX_TOOL_ROUNDS;
      const stream = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: currentMessages,
        ...(allowTools ? { tools: toolsDefinitions } : { tool_choice: 'none' }),
        stream: true,
        temperature: 0.2,
        max_completion_tokens: MAX_COMPLETION_TOKENS,
      });

      const streamIter = stream[Symbol.asyncIterator]();
      const firstChunk = await streamIter.next();
      if (firstChunk.done) break;

      const delta = firstChunk.value.choices[0]?.delta;

      if (delta?.tool_calls && allowTools) {
        toolRounds += 1;
        const toolCallsMap = new Map();
        const mergeToolCall = (tc) => {
          if (!toolCallsMap.has(tc.index)) {
            toolCallsMap.set(tc.index, {
              id: tc.id,
              type: 'function',
              function: { name: tc.function?.name || '', arguments: '' },
            });
          }
          const existing = toolCallsMap.get(tc.index);
          if (tc.function?.arguments) existing.function.arguments += tc.function.arguments;
        };

        delta.tool_calls.forEach(mergeToolCall);

        for await (const chunk of streamIter) {
          if (chunk.choices[0]?.delta?.tool_calls) {
            chunk.choices[0].delta.tool_calls.forEach(mergeToolCall);
          }
        }

        const toolCalls = Array.from(toolCallsMap.values()).slice(0, MAX_TOOL_CALLS_PER_ROUND);
        currentMessages.push({
          role: 'assistant',
          tool_calls: toolCalls,
          content: null,
        });

        for (const tc of toolCalls) {
          if (isEvalMode) evalData.tool_calls.push(tc.function.name);
          if (tc.function.name === 'search_resume_data') {
            try {
              const args = JSON.parse(tc.function.arguments);
              const safeQuery = String(args.query || '').slice(0, MAX_QUERY_LENGTH);
              const results = await searchEmbeddings(safeQuery);

              const context = results
                .map((item) =>
                  Object.entries(item)
                    .filter(([k, v]) => k !== 'embedding' && k !== 'similarity' && v)
                    .map(([k, v]) => `**${k}:** ${Array.isArray(v) ? v.join('. ') : v}`)
                    .join('\n')
                )
                .join('\n\n');

              if (isEvalMode && context) evalData.contexts.push(context);

              currentMessages.push({
                role: 'tool',
                tool_call_id: tc.id,
                name: tc.function.name,
                content: context || 'No relevant data found.',
              });
            } catch (err) {
              console.error('Embedding search failed:', err);
              // Surface upstream OpenAI quota / availability failure immediately instead of looping into another failing completion call
              if (err?.status === 429 || err?.status >= 500 || err?.code === 'credit_balance_exhausted' || err?.code === 'insufficient_quota') {
                throw err;
              }
              currentMessages.push({
                role: 'tool',
                tool_call_id: tc.id,
                name: tc.function.name,
                content: 'Error executing search.',
              });
            }
          }
        }
      } else {
        const encoder = new TextEncoder();
        const readable = new ReadableStream({
          async start(controller) {
            let fullText = delta?.content || '';
            if (delta?.content) controller.enqueue(encoder.encode(delta.content));

            try {
              for await (const chunk of streamIter) {
                const text = chunk.choices[0]?.delta?.content;
                if (text) {
                  controller.enqueue(encoder.encode(text));
                  fullText += text;
                }
              }

              // Evict oldest session if memory map reaches cap
              if (!sessionMemory.has(sessionId) && sessionMemory.size >= MAX_MEMORY_SESSIONS) {
                const oldestKey = sessionMemory.keys().next().value;
                if (oldestKey) sessionMemory.delete(oldestKey);
              }
              sessionMemory.set(sessionId, [...recentMemory, { question: message, answer: fullText }]);

              if (isEvalMode) {
                const maxContexts = 5;
                const maxLength = 500;
                const truncatedContexts = evalData.contexts
                  .slice(0, maxContexts)
                  .map((ctx) => (ctx.length > maxLength ? ctx.slice(0, maxLength) + '...' : ctx));
                evalData.contexts = truncatedContexts;
                controller.enqueue(encoder.encode(`\n\n[EVAL_CONTEXTS]: ${JSON.stringify(evalData)}`));
              }
            } catch (err) {
              console.error('Streaming error:', err);
            } finally {
              controller.close();
            }
          },
        });

        return new Response(readable, {
          headers: {
            'Content-Type': 'text/event-stream; charset=utf-8',
            'Cache-Control': 'no-cache, no-transform',
            Connection: 'keep-alive',
          },
        });
      }
    }
  } catch (err) {
    console.error('Error in /api/chat:', err);
    return new Response(JSON.stringify({ error: MODEL_UNAVAILABLE_MSG }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
