type SuggestionRule = {
  pattern: RegExp;
  suggestions: string[];
};

const suggestionRules: SuggestionRule[] = [
  {
    pattern: /2bhk|3bhk|flat|apartment/i,
    suggestions: [
      "What are the nearby schools?",
      "How is the connectivity?",
      "What are the amenities?",
      "Show similar properties"
    ]
  },
  {
    pattern: /rera|registration/i,
    suggestions: [
      "How to verify RERA registration?",
      "What documents to check?",
      "RERA benefits for buyers"
    ]
  },
  {
    pattern: /invest|investment/i,
    suggestions: [
      "Expected price appreciation",
      "Rental yield in this area",
      "Upcoming developments",
      "Best time to invest"
    ]
  },
  {
    pattern: /mumbai|delhi|bangalore|pune/i,
    suggestions: [
      "Best localities to live",
      "Property rates trend",
      "Upcoming metro projects",
      "New launches in this city"
    ]
  }
];

export function generateSuggestions(message: string): string[] {
  const matchingRules = suggestionRules.filter(rule => 
    rule.pattern.test(message)
  );

  if (!matchingRules.length) {
    return [
      "Show properties under 1 crore",
      "Best areas for families",
      "New projects launching soon",
      "Resale vs New booking"
    ];
  }

  return Array.from(new Set(
    matchingRules.flatMap(rule => rule.suggestions)
  )).slice(0, 4);
}


// import { GoogleGenerativeAI, GenerativeModel, GenerateContentResult } from "@google/generative-ai";

// const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
// const genAI = new GoogleGenerativeAI(apiKey);
// const model: GenerativeModel = genAI.getGenerativeModel({ model: "gemini-pro" });

// type SuggestionRule = {
//   pattern: RegExp;
//   suggestions: string[];
// };

// const suggestionRules: SuggestionRule[] = [
//   {
//     pattern: /2bhk|3bhk|flat|apartment/i,
//     suggestions: []
//   },
//   {
//     pattern: /rera|registration/i,
//     suggestions: []
//   },
//   {
//     pattern: /invest|investment/i,
//     suggestions: []
//   },
//   {
//     pattern: /mumbai|delhi|bangalore|pune/i,
//     suggestions: []
//   }
// ];

// // Function to handle retries with exponential backoff
// export async function generateSuggestionsWithRetry(message: string, retries: number = 3): Promise<string[]> {
//   let attempt = 0;
//   while (attempt < retries) {
//     try {
//       return await generateSuggestions(message);
//     } catch (error) {
//       if (error.message.includes("Resource has been exhausted")) {
//         attempt++;
//         const delay = Math.pow(2, attempt) * 1000; // Exponential backoff (1, 2, 4 seconds)
//         console.warn(`Quota exceeded. Retrying in ${delay / 1000} seconds...`);
//         await new Promise(resolve => setTimeout(resolve, delay));
//       } else {
//         throw error;
//       }
//     }
//   }

//   throw new Error("Max retries reached. Could not generate suggestions.");
// }

// export async function generateSuggestions(message: string): Promise<string[]> {
//   const matchingRules = suggestionRules.filter(rule => rule.pattern.test(message));

//   // If no matching rule, return default suggestions
//   if (!matchingRules.length) {
//     return [
//       "Show properties under 1 crore",
//       "Best areas for families",
//       "New projects launching soon",
//       "Resale vs New booking"
//     ];
//   }

//   // Generate suggestions using Gemini for each matching rule
//   for (let rule of matchingRules) {
//     const prompt = `Generate relevant questions for a property query: "${message}" based on the topic "${rule.pattern.source}"`;

//     try {
//       const response: GenerateContentResult = await model.generateContent([prompt]);
//       console.log("questions :", response)
//       // Assuming the response contains 'content' or 'generatedText'
//       const content = response.candidates?.[0]?.content?.parts?.[0]?.text;
//       if (content) {
//         rule.suggestions = content.split("\n").filter((item) => item.trim() !== "");
//       }
//     } catch (error) {
//       console.error("Error generating suggestions from Gemini:", error);
//       rule.suggestions = ["Could not generate suggestions"];
//     }
//   }

//   // Return a combination of suggestions, limiting to 4 unique ones
//   return Array.from(new Set(
//     matchingRules.flatMap(rule => rule.suggestions)
//   )).slice(0, 4);
// }


export async function convertToFirstPersonUsingGemini(question: string): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // Replace with your actual API key
  const apiUrl = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText?key=" + apiKey;

  const requestBody = {
    prompt: { text: `Convert the following question into a first-person statement:\n"${question}"` },
  };

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  const data = await response.json();
  return data.candidates?.[0]?.output || "Conversion failed.";
}