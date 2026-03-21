import { searchEmbeddings } from '../../../lib/search';
import OpenAI from 'openai';
import { Redis } from '@upstash/redis';
import { jwtVerify } from 'jose';
import { getSystemPrompt, toolsDefinitions } from '../../../lib/chatConfig';
import sanitizeHtml from 'sanitize-html';

export const runtime = 'edge';

// Initialize Upstash Redis (REST API, no persistent socket)
const redis = new Redis({
  url: process.env.REDISUPSTASH_REDIS_REDIS_KV_REST_API_URL,
  token: process.env.REDISUPSTASH_REDIS_REDIS_KV_REST_API_TOKEN,
});

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const sessionMemory = new Map();
const MAX_MEMORY_PAIRS = 3;
const MAX_REQUESTS = 5;
const WINDOW_MS = 60 * 1000;
const MAX_MESSAGE_LENGTH = 1500;

// --- Rate limiting ---
async function checkRateLimit(ip) {
  const key = `rate:${ip}`;
  const now = Date.now();

  let entry = await redis.get(key);
  if (!entry) entry = { count: 0, timestamp: now };

  if (now - entry.timestamp > WINDOW_MS) {
    entry.count = 0;
    entry.timestamp = now;
  }

  entry.count += 1;
  await redis.set(key, entry, { ex: WINDOW_MS / 1000 });
  return entry.count <= MAX_REQUESTS;
}

// --- Edge route handler ---
export async function POST(req) {
  const startTotal = Date.now();
  console.log(`[${new Date().toISOString()}] POST /api/chat start`);

  try {
    // JWT verification using 'jose'
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    if (!token) return new Response(JSON.stringify({ error: 'Missing token' }), { status: 401 });

    try {
      await jwtVerify(token, new TextEncoder().encode(process.env.FRONTEND_JWT_SECRET));
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
    }

    // Parse body
    const body = await req.json();
    const rawMessage = body.message;
    const rawSessionId = body.sessionId;

    if (!rawMessage || !rawSessionId || rawMessage.trim() === '') {
      return new Response(JSON.stringify({ error: 'Message and sessionId are required' }), { status: 400 });
    }

    const message = sanitizeHtml(rawMessage, { allowedTags: [], allowedAttributes: {} });
    const sessionId = sanitizeHtml(rawSessionId, { allowedTags: [], allowedAttributes: {} });

    if (message.length > MAX_MESSAGE_LENGTH) {
      return new Response(JSON.stringify({ error: `Message too long. Max length is ${MAX_MESSAGE_LENGTH}.` }), {
        status: 400,
      });
    }

    // Rate limiting
    const forwarded = req.headers.get('x-forwarded-for');
    let ip = forwarded ? forwarded.split(',')[0].trim() : req.headers.get('x-real-ip') || 'unknown';
    if (process.env.NODE_ENV === 'development' && ip === 'unknown') ip = sessionId;

    if (!(await checkRateLimit(ip))) {
      return new Response(JSON.stringify({ error: '⚠️ Rate limit exceeded. Please wait 1 minute.' }), { status: 429 });
    }

    // Retrieve memory
    const memory = sessionMemory.get(sessionId) || [];
    const recentMemory = memory.slice(-MAX_MEMORY_PAIRS);
    const memoryContext = recentMemory.map((pair) => `User: ${pair.question}\nAssistant: ${pair.answer}`).join('\n\n');

    const systemPrompt = getSystemPrompt();

    let currentMessages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Memory:\n${memoryContext}\n\nQuestion:\n${message}` }
    ];

    while (true) {
      const stream = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: currentMessages,
        tools: toolsDefinitions,
        stream: true,
        temperature: 0.2,
      });

      const streamIter = stream[Symbol.asyncIterator]();
      const firstChunk = await streamIter.next();
      if (firstChunk.done) break;

      const delta = firstChunk.value.choices[0]?.delta;

      if (delta?.tool_calls) {
        let toolCallsMap = new Map();
        const mergeToolCall = (tc) => {
          if (!toolCallsMap.has(tc.index)) {
            toolCallsMap.set(tc.index, { id: tc.id, type: 'function', function: { name: tc.function?.name || '', arguments: '' } });
          }
          let existing = toolCallsMap.get(tc.index);
          if (tc.function?.arguments) existing.function.arguments += tc.function.arguments;
        };

        delta.tool_calls.forEach(mergeToolCall);
        
        for await (const chunk of streamIter) {
          if (chunk.choices[0]?.delta?.tool_calls) {
            chunk.choices[0].delta.tool_calls.forEach(mergeToolCall);
          }
        }

        const toolCalls = Array.from(toolCallsMap.values());
        currentMessages.push({
          role: 'assistant',
          tool_calls: toolCalls,
          content: null,
        });

        for (const tc of toolCalls) {
          if (tc.function.name === 'search_resume_data') {
            try {
              const args = JSON.parse(tc.function.arguments);
              const results = await searchEmbeddings(args.query);

              const context = results.map(item => Object.entries(item).filter(([k,v]) => k !== 'embedding' && v).map(([k,v]) => `**${k}:** ${Array.isArray(v) ? v.join('. ') : v}`).join('\n')).join('\n\n');
                            
              currentMessages.push({ role: 'tool', tool_call_id: tc.id, name: tc.function.name, content: context || "No relevant data found." });
            } catch (e) {
              currentMessages.push({ role: 'tool', tool_call_id: tc.id, name: tc.function.name, content: "Error executing search." });
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
              sessionMemory.set(sessionId, [...recentMemory, { question: message, answer: fullText }]);
            } catch (err) {
              console.error('Streaming error:', err);
            } finally {
              controller.close();
            }
          }
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
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
