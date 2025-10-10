import { searchEmbeddings } from '../../../lib/search';
import OpenAI from 'openai';
import jwt from 'jsonwebtoken';
import { createClient } from 'redis';

let redis;

async function getRedisClient() {
  if (!redis) {
    redis = createClient({ url: process.env.REDIS_URL });
    redis.on('error', (err) => console.error('Redis Client Error', err));
    await redis.connect();
    console.log('Redis client connected');
  }
  return redis;
}

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Simple in-memory session store (short-term memory)
const sessionMemory = new Map();
const MAX_MEMORY_PAIRS = 2; // last 2 Q&A pairs

// Rate limiting
const MAX_REQUESTS = 5;
const WINDOW_MS = 60 * 1000;

// Max message length
const MAX_MESSAGE_LENGTH = 1500;

async function checkRateLimit(redis, ip) {
  const now = Date.now();
  const key = `rate:${ip}`;
  const data = await redis.get(key);
  let entry = data ? JSON.parse(data) : { count: 0, timestamp: now };

  if (now - entry.timestamp > WINDOW_MS) {
    entry.count = 0;
    entry.timestamp = now;
  }

  entry.count += 1;
  await redis.set(key, JSON.stringify(entry), { PX: WINDOW_MS });

  console.log(`Rate limit check - IP: ${ip}, count: ${entry.count}`);
  return entry.count <= MAX_REQUESTS;
}

export async function POST(req) {
  const startTime = Date.now();
  console.log(`[${new Date().toISOString()}] POST /api/chat start`);

  try {
    // Verify JWT
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    if (!token) {
      console.log('Missing token');
      return new Response(JSON.stringify({ error: 'Missing token' }), { status: 401 });
    }

    try {
      jwt.verify(token, process.env.FRONTEND_JWT_SECRET);
      console.log('JWT verified successfully');
    } catch (err) {
      console.log('Invalid JWT:', err);
      return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
    }

    // Parse request body
    const body = await req.json();
    const { message, sessionId } = body;

    if (!message || !sessionId || message.trim() === '') {
      console.log('Missing message or sessionId');
      return new Response(JSON.stringify({ error: 'Message and sessionId are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      console.log(`Message too long: ${message.length}`);
      return new Response(
        JSON.stringify({ error: `Message too long. Maximum length is ${MAX_MESSAGE_LENGTH} characters.` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // IP and rate limiting
    const forwarded = req.headers.get('x-forwarded-for');
    let ip = forwarded ? forwarded.split(',')[0].trim() : req.headers.get('x-real-ip') || 'unknown';
    if (process.env.NODE_ENV === 'development' && ip === 'unknown') ip = sessionId;

    redis = await getRedisClient();
    if (!(await checkRateLimit(redis, ip))) {
      console.log('Rate limit exceeded for IP:', ip);
      return new Response(
        JSON.stringify({
          error:
            '⚠️ You have exceeded the rate limit for messages. Please wait 1 minute before sending another message.',
        }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Retrieve embeddings
    console.log('Searching embeddings...');
    const results = await searchEmbeddings(message);
    console.log(`Found ${results.length} embedding results`);

    const context = results
      .map((item) =>
        Object.entries(item)
          .filter(([key, value]) => key !== 'embedding' && value)
          .map(([key, value]) => (Array.isArray(value) ? value.join('. ') : value))
          .join('. ')
      )
      .join('\n\n');

    // Add last 3 Q&A pairs
    const memory = sessionMemory.get(sessionId) || [];
    const recentMemory = memory.slice(-MAX_MEMORY_PAIRS);
    const memoryContext = recentMemory.map((pair) => `User: ${pair.question}\nAssistant: ${pair.answer}`).join('\n\n');

    // Optimized system prompt
    const systemPrompt = `
    You are a concise, professional AI assistant for David Riva's personal website.
  - Answer accurately using the provided context and memory.
  - Keep answers short and focused (≤200 words, avoid extra commentary).
  - If information is missing, say "I don't know" instead of guessing.
  - Use basic Markdown only (headings, lists, bold).
  - Friendly and professional tone.
  `;

    // Create OpenAI streaming
    console.log('Starting LLM stream...');
    const stream = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Memory:\n${memoryContext}\n\nContext:\n${context}\n\nQuestion:\n${message}` },
      ],
      stream: true,
      temperature: 0.2,
      max_tokens: 300, // limit response length for faster output
    });

    // Stream response to client
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        let fullText = '';

        // First byte to avoid 10s timeout
        controller.enqueue(encoder.encode(' '));
        console.log('Sent first byte to bypass 10s timeout');

        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content || '';
            if (text) {
              console.log('Chunk received (first 50 chars):', text.slice(0, 50));
              fullText += text;
              controller.enqueue(encoder.encode(text));
            }
          }

          console.log('Stream complete, saving session memory');
          sessionMemory.set(sessionId, [...recentMemory, { question: message, answer: fullText }]);
        } catch (err) {
          console.error('Streaming error:', err);
        } finally {
          controller.close();
          console.log('Controller closed');
        }
      },
    });

    console.log('Returning ReadableStream response');
    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error streaming response in /api/chat:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    const duration = Date.now() - startTime;
    console.log(`Request duration: ${duration} ms`);
  }
}
