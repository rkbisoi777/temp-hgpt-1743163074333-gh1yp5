// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { AgentExecutor, createOpenAIFunctionsAgent } from "langchain/agents";
// import { ChatPromptTemplate } from "langchain/prompts";
// import { propertySearchTool } from "../tools/propertySearchTool";

// const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// if (!GEMINI_API_KEY) {
//   throw new Error("Missing Gemini API key");
// }

// const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// const SYSTEM_TEMPLATE = `You are a helpful Indian real estate property expert assistant. Use the property_search tool to find properties based on user queries only if it has genuine query related to property search.
// Always respond in a friendly, professional manner.
// Always respond with a simple text not with porperty details in it.
// Avoid unnecessary text or conversation.

// Current tools available:
// {tools}`;

// export const createPropertyAgent = async () => {
//   const prompt = ChatPromptTemplate.fromMessages([
//     ["system", SYSTEM_TEMPLATE],
//     ["human", "{input}"],
//   ]);

//   const agent = await createOpenAIFunctionsAgent({
//     llm: model,
//     tools: [propertySearchTool],
//     prompt,
//   });

//   return new AgentExecutor({
//     agent,
//     tools: [propertySearchTool],
//     verbose: true,
//   });
// };