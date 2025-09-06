import fs from "fs";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// cosine similarity
function cosineSimilarity(vecA: number[], vecB: number[]) {
  const dot = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const normB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dot / (normA * normB);
}

// Load embeddings once (all JSON files)
const awards = JSON.parse(fs.readFileSync("src/data/awards_embeddings.json", "utf8"));
const experiences = JSON.parse(fs.readFileSync("src/data/experiences_embeddings.json", "utf8"));
const projects = JSON.parse(fs.readFileSync("src/data/projects_embeddings.json", "utf8"));
const skills = JSON.parse(fs.readFileSync("src/data/skills_embeddings.json", "utf8"));

const allData = [...awards, ...experiences, ...projects, ...skills];

export async function searchEmbeddings(query: string, topN = 5) {
  // generate query embedding
  const embeddingRes = await client.embeddings.create({
    model: "text-embedding-3-large",
    input: query,
  });
  const queryEmbedding = embeddingRes.data[0].embedding;

  // compute similarity
  allData.forEach((item: any) => {
    item.similarity = cosineSimilarity(queryEmbedding, item.embedding);
  });

  // debug: log top 10 similarity scores before slicing
  const top10Debug = allData
    .sort((a: any, b: any) => b.similarity - a.similarity)
    .slice(0, 10)
    .map((item: any) => ({ title: item.title, similarity: item.similarity.toFixed(3) }));

  // return top N results
  const topResults = allData.slice(0, topN);

  return topResults;
}
