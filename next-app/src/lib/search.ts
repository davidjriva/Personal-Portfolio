import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Cosine similarity
function cosineSimilarity(vecA, vecB) {
  const dot = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const normB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dot / (normA * normB);
}

// Fetch JSON from public folder
async function loadJson(filename, reqUrl) {
  const baseUrl = new URL(reqUrl).origin;
  const res = await fetch(`${baseUrl}/data/${filename}`);
  if (!res.ok) throw new Error(`Failed to fetch ${filename} from ${baseUrl}`);
  return await res.json();
}

let allDataCache = null;

async function loadAllData(reqUrl) {
  if (allDataCache) return allDataCache;

  const [awards, experiences, projects, skills] = await Promise.all([
    loadJson("awards_embeddings.json", reqUrl),
    loadJson("experiences_embeddings.json", reqUrl),
    loadJson("projects_embeddings.json", reqUrl),
    loadJson("skills_embeddings.json", reqUrl),
  ]);

  allDataCache = [...awards, ...experiences, ...projects, ...skills];
  return allDataCache;
}

export async function searchEmbeddings(query, reqUrl, topN = 5) {
  const allData = await loadAllData(reqUrl);

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
