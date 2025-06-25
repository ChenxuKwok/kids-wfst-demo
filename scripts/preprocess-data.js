import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.resolve(__dirname, "../src/assets");
const transcriptionDir = path.join(dataDir, "transcription");
const llmAdviceDir = path.join(dataDir, "llm_advice");
const outputFilePath = path.join(dataDir, "preprocessedData.json");

const preprocessedData = {};

// Function to read content from a file
const readFileContent = (filePath) => {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.warn(`Warning: Could not read file ${filePath}. Error: ${error.message}`);
    return ""; // Return empty string if file not found or error
  }
};

// Process transcription files
if (fs.existsSync(transcriptionDir)) {
  fs.readdirSync(transcriptionDir).forEach((file) => {
    if (file.endsWith("_phn.txt")) {
      const sampleId = file.replace("_phn.txt", ""); // Extract sample_id
      if (!preprocessedData[sampleId]) {
        preprocessedData[sampleId] = {};
      }
      preprocessedData[sampleId].phn_transcription = readFileContent(path.join(transcriptionDir, file));
    }
  });
}

// Process LLM advice files
if (fs.existsSync(llmAdviceDir)) {
  fs.readdirSync(llmAdviceDir).forEach((file) => {
    if (file.endsWith("_advice.txt")) {
      const sampleId = file.replace("_advice.txt", ""); // Extract sample_id
      if (!preprocessedData[sampleId]) {
        preprocessedData[sampleId] = {};
      }
      preprocessedData[sampleId].llm_advice = readFileContent(path.join(llmAdviceDir, file));
    }
  });
}

// Write the preprocessed data to a JSON file
fs.writeFileSync(outputFilePath, JSON.stringify(preprocessedData, null, 2), "utf8");

console.log(`Data preprocessed and saved to ${outputFilePath}`);