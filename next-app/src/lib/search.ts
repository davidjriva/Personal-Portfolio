/*
    This module provides functionality to perform semantic search over your JSON data embeddings. Specifically, it:

    1. Loads all precomputed embeddings from your _embeddings.json files (awards, experiences, projects, skills) into memory.

    2. Generates an embedding for a user-provided query using OpenAI’s text-embedding-3-small model.

    3. Computes similarity between the query embedding and each item’s embedding in the JSON files using cosine similarity.

    4. Sorts the data by similarity score in descending order.

    5. Returns the top N results, allowing your application to find the most relevant items across all JSON datasets.
*/

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
    model: "text-embedding-3-small",
    input: query,
  });
  const queryEmbedding = embeddingRes.data[0].embedding;

  // compute similarity
  allData.forEach((item: any) => {
    item.similarity = cosineSimilarity(queryEmbedding, item.embedding);
  });

  // return top N results
  return allData
    .sort((a: any, b: any) => b.similarity - a.similarity)
    .slice(0, topN);
}
