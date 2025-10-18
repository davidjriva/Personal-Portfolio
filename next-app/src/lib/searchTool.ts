import { searchEmbeddings } from './search.js';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// The number of documents to return to the Agent
const NUM_DOCUMENTS = 10

export async function retrieveRelevantDocuments(
  query: string
) {
  const results = await searchEmbeddings(query, NUM_DOCUMENTS);

  const filtered = results
    .slice(0, NUM_DOCUMENTS);

  return filtered;
}
