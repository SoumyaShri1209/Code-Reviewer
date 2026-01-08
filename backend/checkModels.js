const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testModels() {
  const modelsToTry = [
    "gemini-pro",
    "gemini-1.0-pro",
    "gemini-1.5-pro",
    "gemini-1.5-flash",
    "gemini-2.0-flash-exp"
  ];

  console.log("Testing available models...\n");

  for (const modelName of modelsToTry) {
    try {
      const model = ai.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Say 'hello'");
      const text = result.response.text();
      console.log(`✓ ${modelName} - WORKS`);
    } catch (error) {
      console.log(`✗ ${modelName} - ${error.status || 'ERROR'}: ${error.message.split('\n')[0]}`);
    }
  }
}

testModels();