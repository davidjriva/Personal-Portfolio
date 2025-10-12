import { searchEmbeddings } from '../../../lib/search';
import OpenAI from 'openai';
import jwt from 'jsonwebtoken';
import { Redis } from '@upstash/redis';

// Initialize Upstash Redis (no persistent socket needed)
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_KV_REST_API_URL,
  token: process.env.UPSTASH_REDIS_KV_REST_API_TOKEN,
});

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const sessionMemory = new Map();
const MAX_MEMORY_PAIRS = 2;
const MAX_REQUESTS = 5;
const WINDOW_MS = 60 * 1000;
const MAX_MESSAGE_LENGTH = 1500;

// --- Rate limiting helper ---
async function checkRateLimit(ip) {
  const key = `rate:${ip}`;
  const now = Date.now();

  const entry = (await redis.get(key)) || { count: 0, timestamp: now };

  if (now - entry.timestamp > WINDOW_MS) {
    entry.count = 0;
    entry.timestamp = now;
  }

  entry.count += 1;
  await redis.set(key, entry, { ex: WINDOW_MS / 1000 });
  return entry.count <= MAX_REQUESTS;
}

// --- Route handler ---
export async function POST(req) {
  const startTotal = Date.now();
  console.log(`[${new Date().toISOString()}] POST /api/chat start`);

  try {
    // JWT verification
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    if (!token) return new Response(JSON.stringify({ error: 'Missing token' }), { status: 401 });

    try {
      jwt.verify(token, process.env.FRONTEND_JWT_SECRET);
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
    }

    // Parse body
    const body = await req.json();
    const { message, sessionId } = body;

    if (!message || !sessionId || message.trim() === '') {
      return new Response(JSON.stringify({ error: 'Message and sessionId are required' }), { status: 400 });
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return new Response(
        JSON.stringify({ error: `Message too long. Max length is ${MAX_MESSAGE_LENGTH}.` }),
        { status: 400 },
      );
    }

    // Rate limit
    const forwarded = req.headers.get('x-forwarded-for');
    let ip = forwarded ? forwarded.split(',')[0].trim() : req.headers.get('x-real-ip') || 'unknown';
    if (process.env.NODE_ENV === 'development' && ip === 'unknown') ip = sessionId;

    if (!(await checkRateLimit(ip))) {
      return new Response(JSON.stringify({ error: '⚠️ Rate limit exceeded. Please wait 1 minute.' }), { status: 429 });
    }

    // Retrieve embeddings
    const results = await searchEmbeddings(message);
    const context = results
      .map((item) =>
        Object.entries(item)
          .filter(([k, v]) => k !== 'embedding' && v)
          .map(([k, v]) => (Array.isArray(v) ? v.join('. ') : v))
          .join('. ')
      )
      .join('\n\n');

    // Retrieve memory
    const memory = sessionMemory.get(sessionId) || [];
    const recentMemory = memory.slice(-MAX_MEMORY_PAIRS);
    const memoryContext = recentMemory
      .map((pair) => `User: ${pair.question}\nAssistant: ${pair.answer}`)
      .join('\n\n');

    // System prompt
    const systemPrompt = `
You are a concise, professional AI assistant for David Riva's personal website.
- Answer accurately using the provided context and memory.
- Keep answers short and focused (≤300 words, avoid extra commentary).
- Use basic Markdown only (headings, lists, bold).
- Friendly and professional tone.
`;

    // Stream response from OpenAI
    const stream = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Memory:\n${memoryContext}\n\nContext:\n${context}\n\nQuestion:\n${message}` },
      ],
      stream: true,
      temperature: 0.2,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        let fullText = '';
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content;
            if (text) {
              controller.enqueue(encoder.encode(text));
              fullText += text;
            }
          }
          sessionMemory.set(sessionId, [...recentMemory, { question: message, answer: fullText }]);
          console.log('LLM stream finished');
        } catch (err) {
          console.error('Streaming error:', err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (err) {
    console.error('Error in /api/chat:', err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    console.log(`Total request duration: ${Date.now() - startTotal}ms`);
  }
}
