import { searchEmbeddings } from '../../../lib/search.js';
import { retrieveRelevantDocuments } from '../../../lib/searchTool.ts';
import OpenAI from 'openai';
import { Redis } from '@upstash/redis';
import { jwtVerify } from 'jose';

export const runtime = 'edge';

// Initialize Upstash Redis (REST API, no persistent socket)
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_KV_REST_API_URL,
  token: process.env.UPSTASH_REDIS_KV_REST_API_TOKEN,
});

// --- Rate limiting ---
const MAX_REQUESTS = 5;
const WINDOW_MS = 60 * 1000;

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

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const sessionMemory = new Map();
const MAX_MEMORY_PAIRS = 3;

const MAX_MESSAGE_LENGTH = 1500;

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
    const message = body.message;
    const sessionId = body.sessionId;

    if (!message || !sessionId || message.trim() === '') {
      return new Response(JSON.stringify({ error: 'Message and sessionId are required' }), { status: 400 });
    }

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

    // Retrieve embeddings
    const results = await searchEmbeddings(message);
    const context = results
      .map((item) => {
        return Object.entries(item)
          .filter(([k, v]) => k !== 'embedding' && v)
          .map(([k, v]) => {
            const value = Array.isArray(v) ? v.join('. ') : v;
            return `**${k}:** ${value}`;
          })
          .join('\n');
      })
      .join('\n\n');

    // Retrieve memory
    const memory = sessionMemory.get(sessionId) || [];
    const recentMemory = memory.slice(-MAX_MEMORY_PAIRS);
    const memoryContext = recentMemory.map((pair) => `User: ${pair.question}\nAssistant: ${pair.answer}`).join('\n\n');

    const systemPrompt = `
    You are a professional AI assistant for David Riva's personal website.
    - Answer accurately using the provided context and memory.
    - Keep answers concise (≤1000 words), professional, and friendly.
    - Use basic Markdown only (headings, lists, bold).
    - When mentioning dates, list them in **descending chronological order**.
    - Only answer about David's experiences, skills, projects, awards, and related professional information.
    - If the user asks about something not in the context/memory, respond honestly that you don't have information.
    `;

    const searchTool = [
      {
        type: 'function',
        name: 'retrieveRelevantDocuments',
        description:
          "Retrieve specific documents about David Riva's work experience, awards, technical skills, or technical coding projects.",
        parameters: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Optional: a specific search query or keyword to filter documents',
            },
            topK: {
              type: 'number',
              description: 'Optional: the number of top results to return (default 5)',
            },
            minScore: {
              type: 'number',
              description: 'Optional: minimum similarity score to include in results (0-1, default 0)',
            },
            useEmbeddingCache: {
              type: 'boolean',
              description: 'Optional: whether to use cached embeddings to speed up searches (default true)',
            },
          },
          required: ['query'],
          additionalProperties: false,
        },
        strict: true,
      },
    ];

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
  } catch (err) {
    console.error('Error in /api/chat:', err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
