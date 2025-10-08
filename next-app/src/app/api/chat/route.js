import { searchEmbeddings } from '../../../lib/search';
import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Simple in-memory session store
const sessionMemory = new Map();
const MAX_MEMORY_PAIRS = 3; // last 3 Q&A pairs

const rateLimitMap = new Map(); // sessionId -> { count, timestamp }
const MAX_REQUESTS = 5; // max requests
const WINDOW_MS = 60 * 1000; // per 1 minute

function checkRateLimit(sessionId) {
  const now = Date.now();
  const entry = rateLimitMap.get(sessionId) || { count: 0, timestamp: now };

  // reset window if expired
  if (now - entry.timestamp > WINDOW_MS) {
    entry.count = 0;
    entry.timestamp = now;
  }

  entry.count += 1;
  rateLimitMap.set(sessionId, entry);

  // return whether request is allowed
  return entry.count <= MAX_REQUESTS;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { message, sessionId } = body;

    if (!message || !sessionId || message.trim() === '') {
      return new Response(JSON.stringify({ error: 'Message and sessionId are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!checkRateLimit(sessionId)) {
      return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 1️⃣ Retrieve relevant context via RAG
    const results = await searchEmbeddings(message, 10); // top 10 results
    const context = results
      .map((item) =>
        Object.entries(item)
          .filter(([key, value]) => key !== 'embedding' && value)
          .map(([key, value]) => (Array.isArray(value) ? value.join('. ') : value))
          .join('. ')
      )
      .join('\n\n');

    // 2️⃣ Build memory context: last 3 Q&A pairs
    const memory = sessionMemory.get(sessionId) || [];
    const recentMemory = memory.slice(-MAX_MEMORY_PAIRS); // ✅ only last 3 pairs
    const memoryContext = recentMemory.map((pair) => `User: ${pair.question}\nAssistant: ${pair.answer}`).join('\n\n');

    // 3️⃣ Send user question + memory + RAG context to LLM
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
            in **descending chronological order (most recent first)** when listing or summarizing.`,
        },
        {
          role: 'user',
          content: `Memory:\n${memoryContext}\n\nContext:\n${context}\n\nQuestion:\n${message}`,
        },
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
            const text = chunk.choices[0]?.delta?.content || '';
            if (text) {
              fullText += text;
              controller.enqueue(encoder.encode(text)); // stream each chunk to frontend
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
