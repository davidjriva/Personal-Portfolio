import path from "path";
import fs from "fs";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Cosine similarity function
function cosineSimilarity(vecA: number[], vecB: number[]) {
  const dot = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const normB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dot / (normA * normB);
}

// Helper to load JSON from public/data
function loadJson(filename: string) {
  const filePath = path.join(process.cwd(), "public", "data", filename);
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

// Load embeddings once
const awards = loadJson("awards_embeddings.json");
const experiences = loadJson("experiences_embeddings.json");
const projects = loadJson("projects_embeddings.json");
const skills = loadJson("skills_embeddings.json");

const allData = [...awards, ...experiences, ...projects, ...skills];

export async function searchEmbeddings(query: string, topN = 5) {
  // Generate query embedding
  const embeddingRes = await client.embeddings.create({
    model: "text-embedding-3-large",
    input: query,
  });
  const queryEmbedding = embeddingRes.data[0].embedding;

  // Compute similarity
  allData.forEach((item: any) => {
    item.similarity = cosineSimilarity(queryEmbedding, item.embedding);
  });

  // Return top N results sorted by similarity
  const topResults = allData
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topN);

  return topResults;
}
