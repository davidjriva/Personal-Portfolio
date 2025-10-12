import OpenAI from "openai";
import awards from "@/../public/data/awards_embeddings.json"
import experiences from "@/../public/data/experiences_embeddings.json"
import projects from  "@/../public/data/projects_embeddings.json"
import skills from  "@/../public/data/skills_embeddings.json"

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Cosine similarity
function cosineSimilarity(vecA, vecB) {
  const dot = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const normB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dot / (normA * normB);
}

let allDataCache = null;

async function loadAllData() {
  if (allDataCache) return allDataCache;

  allDataCache = [...awards, ...experiences, ...projects, ...skills];
  return allDataCache;
}

export async function searchEmbeddings(query, topN = 10) {
  const allData = await loadAllData();

  const embeddingRes = await client.embeddings.create({
    model: "text-embedding-3-large",
    input: query,
  });
  const queryEmbedding = embeddingRes.data[0].embedding;

  allData.forEach((item) => {
    item.similarity = cosineSimilarity(queryEmbedding, item.embedding);
  });

  return allData
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topN);
}
