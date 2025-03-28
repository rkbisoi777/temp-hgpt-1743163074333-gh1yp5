import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey); 
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Function to count tokens in a prompt
export async function countTokensInPrompt(prompt: string): Promise<number> {
  const countResult = await model.countTokens(prompt);
  // console.log(`Total Tokens in Prompt: ${countResult.totalTokens}`); 
  return countResult.totalTokens;
}

export async function checkTokenLimitAllowed(prompt: string): Promise<boolean> {
  const promptTokenCount = await countTokensInPrompt(prompt);
  if (promptTokenCount < 4000) {
    return true
  }
  return false;
}