/*
    This script generates vector embeddings for all JSON files under '/data':
        * awards.json
        * experiences.json
        * projects.json
        * skills.json
    These embeddings are used downstream for RAG.

    It skips irrelevant fields such as the path to the company image, website link, etc.
*/

const fs = require("fs");
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "../.env.local") });

const OpenAI = require("openai");

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/*
  Flatten an a JSON item into a string while removing irrelevant (non meaningful) fields.
*/
function flattenFields(item: any): string {
  const excludedFields = ["logoImage", "companyWebsiteLink", "coverImage"]; // fields to ignore
  const parts: string[] = [];

  for (const key in item) {
    if (excludedFields.includes(key)) continue;

    const value = item[key];

    if (!value) continue;

    if (Array.isArray(value)) {
      // Join array values (e.g., bulletPoints, skills)
      parts.push(value.join(". "));
    } else if (typeof value === "object") {
      // Recursively flatten nested objects if needed
      parts.push(flattenFields(value));
    } else if (typeof value === "string" || typeof value === "number") {
      parts.push(String(value));
    }
  }

  return parts.join(". ").trim();
}

async function embedFile(filePath: string) {
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  for (const item of data) {
    const text = flattenFields(item);
    if (!text) continue; // skip if empty

    const embeddingRes = await client.embeddings.create({
      model: "text-embedding-3-large",
      input: text,
    });

    item.embedding = embeddingRes.data[0].embedding;
  }

  const outputPath = filePath.replace(".json", "_embeddings.json");
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  console.log(`Embeddings saved for ${filePath} -> ${outputPath}`);
}

async function main() {
  const files = [
    path.join(__dirname, "../src/data/awards.json"),
    path.join(__dirname, "../src/data/experiences.json"),
    path.join(__dirname, "../src/data/projects.json"),
    path.join(__dirname, "../src/data/skills.json"),
  ];

  for (const file of files) {
    await embedFile(file);
  }
}

main();
