import { searchEmbeddings } from '../../../lib/search';
import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message || message.trim() === '') {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 1️⃣ Retrieve relevant context via RAG
    const results = await searchEmbeddings(message, 5); // top 5 results

    // Flatten results into context string
    const context = results
      .map((item) =>
        Object.values(item)
          .filter((v) => v && v !== item.embedding)
          .map((v) => (Array.isArray(v) ? v.join('. ') : v))
          .join('. ')
      )
      .join('\n\n');

    // 2️⃣ Send user question + context to LLM
    const chatResponse = await client.chat.completions.create({
      model: 'gpt-4o-mini', // you can pick any Chat model
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that answers questions about David based on the context provided.',
        },
        {
          role: 'user',
          content: `Context: ${context}\n\nQuestion: ${message}`,
        },
      ],
      temperature: 0.2,
    });

    const responseText = chatResponse.choices[0].message.content;

    return new Response(JSON.stringify({ response: responseText }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error in /api/chat:', err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
