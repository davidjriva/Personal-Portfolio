import { searchEmbeddings } from '../../../lib/search';
import OpenAI from 'openai';

import jwt from 'jsonwebtoken';

export const runtime = 'nodejs'; // ensures it uses Node.js Server Function. If you run as an edge function, this will get cut-off mid-stream since they can only run for 10 seconds.

// Redis kv store for maintaing state across edge (serverless) functions. This is especially important since we need to maintain rate limiting state across serverless functions to harden this endpoint.
import { createClient } from 'redis';

let redis;

async function getRedisClient() {
  if (!redis) {
    redis = createClient({ url: process.env.REDIS_URL });
    redis.on('error', (err) => console.error('Redis Client Error', err));
    await redis.connect();
  }
  return redis;
}

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Simple in-memory session store
const sessionMemory = new Map();
const MAX_MEMORY_PAIRS = 3; // last 3 Q&A pairs

// Rate limiting map: IP -> { count, timestamp }
const MAX_REQUESTS = 5; // max requests
const WINDOW_MS = 60 * 1000; // per 1 minute

// The maximum allowed message length in characters
const MAX_MESSAGE_LENGTH = 1500;

async function checkRateLimit(redis, ip) {
  const now = Date.now();
  const key = `rate:${ip}`;

  const data = await redis.get(key);
  let entry = data ? JSON.parse(data) : { count: 0, timestamp: now };

  // reset window if expired
  if (now - entry.timestamp > WINDOW_MS) {
    entry.count = 0;
    entry.timestamp = now;
  }

  entry.count += 1;

  // set TTL for the window
  await redis.set(key, JSON.stringify(entry), { PX: WINDOW_MS });

  return entry.count <= MAX_REQUESTS;
}

export async function POST(req) {
  try {
    // Verify JWT
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.split(' ')[1];
    if (!token) {
      return new Response(JSON.stringify({ error: 'Missing token' }), { status: 401 });
    }

    try {
      jwt.verify(token, process.env.FRONTEND_JWT_SECRET); // throws if invalid
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
    }

    // Validate request format
    const body = await req.json();
    const { message, sessionId } = body;

    if (!message || !sessionId || message.trim() === '') {
      return new Response(JSON.stringify({ error: 'Message and sessionId are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate message length
    if (message.length > MAX_MESSAGE_LENGTH) {
      return new Response(
        JSON.stringify({ error: `Message too long. Maximum length is ${MAX_MESSAGE_LENGTH} characters.` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate IP address and enforce rate limiting (5 requests / 1 minute)
    const forwarded = req.headers.get('x-forwarded-for');
    let ip = forwarded ? forwarded.split(',')[0].trim() : req.headers.get('x-real-ip') || 'unknown';

    if (process.env.NODE_ENV === 'development' && ip === 'unknown') ip = sessionId; // fallback for local/dev to sessionId

    redis = await getRedisClient();
    if (!(await checkRateLimit(redis, ip))) {
      return new Response(
        JSON.stringify({
          error:
            '⚠️ You have exceeded the rate limit for messages. Please wait 1 minute before sending another message.',
        }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Retrieve relevant chunks for RAG
    const results = await searchEmbeddings(message, 10); // top 10 results
    const context = results
      .map((item) =>
        Object.entries(item)
          .filter(([key, value]) => key !== 'embedding' && value)
          .map(([key, value]) => (Array.isArray(value) ? value.join('. ') : value))
          .join('. ')
      )
      .join('\n\n');

    // Add last 3 Q&A pairs as short-term memory
    const memory = sessionMemory.get(sessionId) || [];
    const recentMemory = memory.slice(-MAX_MEMORY_PAIRS); // ✅ only last 3 pairs
    const memoryContext = recentMemory.map((pair) => `User: ${pair.question}\nAssistant: ${pair.answer}`).join('\n\n');

    // Send user question + short-term memory + relevant documents to LLM
    const stream = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a knowledgeable and professional AI assistant for David Riva's personal website. 
            Your role is to answer questions about David in detail using the provided context and memory. 
            Always prioritize accuracy and clarity, and when possible, elaborate with specifics about his 
            work experience, education, technical skills, and notable projects. 
            If the context does not contain enough information, politely acknowledge this rather than inventing details. 
            Keep the tone friendly, approachable, and professional—like a conversation with a well-informed colleague.
            When dates are mentioned in the context (e.g., work experience, education, projects, awards), always present them 
            in **descending chronological order (most recent first)** when listing or summarizing. Answer the user's query **concisely** with 500 characters or less.`,
        },
        {
          role: 'user',
          content: `Memory:\n${memoryContext}\n\nContext:\n${context}\n\nQuestion:\n${message}`,
        },
      ],
      stream: true,
      temperature: 0.2,
    });

    // Stream the LLM response to the client
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        let fullText = '';
        let hasSentFirstChunk = false; // ✅ Track first chunk

        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content || '';
            if (text) {
              fullText += text;

              // Send the first tiny chunk immediately to avoid timeout
              if (!hasSentFirstChunk) {
                controller.enqueue(encoder.encode(text.slice(0, 5))); // send first 5 chars fast
                hasSentFirstChunk = true;
              }

              // Then stream the rest normally
              controller.enqueue(encoder.encode(text));
            }
          }

          // Save memory after streaming completes
          sessionMemory.set(sessionId, [...recentMemory, { question: message, answer: fullText }]);
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
  } catch (error) {
    console.error('Error streaming response in /api/chat:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
