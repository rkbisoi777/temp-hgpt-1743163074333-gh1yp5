// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { Property } from "../types";

// export interface PropertyOverview {
//   propertyOverview: string;
//   technicalDetails: {
//     constructionQuality: string;
//     plumbingAndElectrical: string;
//     structuralIntegrity: string;
//     materialsUsed: string;
//     energyEfficiency: string;
//   };
// }

// export interface LocationOverview {
//   locationOverview: string;
//   neighborhoodQuality: string;
//   amenities: string;
//   schools: string;
//   safety: string;
//   propertyValueTrends: string;
// }

// export interface DeveloperOverview {
//   developerOverview: string;
//   reputation: string;
//   projectQuality: string;
//   customerService: string;
//   financialStability: string;
// }

// export interface PriceTrendOverview {
//   priceTrendOverview: string;
//   historicalTrends: string;
//   futureProjections: string;
//   comparableProperties: string;
//   marketStability: string;
// }

// export interface PropertyScores {
//   livabilityScore: number;
//   connectivityScore: number;
//   safetyScore: number;
//   pollutionScore: number;
//   socialLifestyleScore: number;
//   priceGrowthScore: number;
//   rentalYieldScore: number;
//   investmentPotentialScore: number;
//   gentrificationScore: number;
//   demandSupplyScore: number;
//   overallScore: number;
// }

// export interface FetchDetailsResult {
//   propertyDetails: PropertyOverview;
//   locationDetails: LocationOverview;
//   developerDetails: DeveloperOverview;
//   priceTrendDetails: PriceTrendOverview;
//   propertyScores: PropertyScores;
// }

// export interface FetchDetailsError {
//   error: string;
//   rawResponse?: string;
// }

// export async function fetchPropertyDetails(
//   property: Property,
//   developer: string
// ): Promise<FetchDetailsResult | FetchDetailsError> {
//   const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
//   const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

//   const combinedPrompt = `
//     Analyze the following property and provide a comprehensive assessment in JSON format. 
//     Include all the sections outlined below with detailed information relevant to home buyers.

//     Property details: ${JSON.stringify(property)}
//     Developer: ${developer}
//     Location: ${property.location}

//     The JSON output should follow this exact structure:
//     {
//       "propertyDetails": {
//         "propertyOverview": "Brief overview of the property (max 200 words)",
//         "technicalDetails": {
//           "constructionQuality": "Assessment of construction quality",
//           "plumbingAndElectrical": "Details on plumbing and electrical systems",
//           "structuralIntegrity": "Information about structural integrity",
//           "materialsUsed": "Overview of materials used in construction",
//           "energyEfficiency": "Energy efficiency rating and features"
//         }
//       },
//       "locationDetails": {
//         "locationOverview": "Brief overview of the location (max 200 words)",
//         "neighborhoodQuality": "Assessment of the neighborhood quality",
//         "amenities": "Nearby amenities and facilities",
//         "schools": "Information about local schools and education options",
//         "safety": "Safety assessment of the area",
//         "propertyValueTrends": "Property value trends in this location"
//       },
//       "developerDetails": {
//         "developerOverview": "Overview of the developer (max 100 words)",
//         "reputation": "Developer's reputation in the market",
//         "projectQuality": "Quality of past and current projects",
//         "customerService": "Assessment of customer service",
//         "financialStability": "Financial stability of the developer"
//       },
//       "priceTrendDetails": {
//         "priceTrendOverview": "Overview of price trends (max 100 words)",
//         "historicalTrends": "Historical price trends in this area",
//         "futureProjections": "Projected future trends",
//         "comparableProperties": "Comparison with similar properties",
//         "marketStability": "Assessment of market stability"
//       },
//       "propertyScores": {
//         "livabilityScore": [score between 1-100],
//         "connectivityScore": [score between 1-100],
//         "safetyScore": [score between 1-100],
//         "pollutionScore": [score between 1-100],
//         "socialLifestyleScore": [score between 1-100],
//         "priceGrowthScore": [score between 1-100],
//         "rentalYieldScore": [score between 1-100],
//         "investmentPotentialScore": [score between 1-100],
//         "gentrificationScore": [score between 1-100],
//         "demandSupplyScore": [score between 1-100],
//         "overallScore": [weighted average of all scores]
//       }
//     }

//     Ensure all text fields are concise but informative, and all scores are realistic assessments based on the provided information.
//   `;

//   try {
//     const response = await model.generateContent(combinedPrompt);
//     const responseText = response.response.text();
    
//     // Parse the JSON response
//     const parsedResponse = JSON.parse(responseText);
    
//     return {
//       propertyDetails: parsedResponse.propertyDetails,
//       locationDetails: parsedResponse.locationDetails,
//       developerDetails: parsedResponse.developerDetails,
//       priceTrendDetails: parsedResponse.priceTrendDetails,
//       propertyScores: parsedResponse.propertyScores
//     };
//   } catch (error) {
//     console.error("Error fetching or parsing data:", error);
//     return {
//       error: "Failed to fetch or parse property data",
//       rawResponse: error instanceof Error ? error.message : String(error)
//     };
//   }
// }

import { GoogleGenerativeAI } from "@google/generative-ai";
import { Property } from "../types";
import { propertyService } from '../lib/propertyService';

export interface PropertyOverview {
  propertyOverview: string;
  technicalDetails: {
    constructionQuality: string;
    plumbingAndElectrical: string;
    structuralIntegrity: string;
    materialsUsed: string;
    energyEfficiency: string;
  };
}

export interface LocationOverview {
  locationOverview: string;
  neighborhoodQuality: string;
  amenities: string;
  schools: string;
  safety: string;
  propertyValueTrends: string;
}

export interface DeveloperOverview {
  developerOverview: string;
  reputation: string;
  projectQuality: string;
  customerService: string;
  financialStability: string;
}

export interface PriceTrendOverview {
  priceTrendOverview: string;
  historicalTrends: string;
  futureProjections: string;
  comparableProperties: string;
  marketStability: string;
}

export interface PropertyScores {
  scoreOverview: string;
  livabilityScore: number;
  connectivityScore: number;
  safetyScore: number;
  pollutionScore: number;
  socialLifestyleScore: number;
  priceGrowthScore: number;
  rentalYieldScore: number;
  investmentPotentialScore: number;
  gentrificationScore: number;
  demandSupplyScore: number;
  overallScore: number;
}

export interface FetchDetailsResult {
  propertyDetails: PropertyOverview;
  locationDetails: LocationOverview;
  developerDetails: DeveloperOverview;
  priceTrendDetails: PriceTrendOverview;
  propertyScores: PropertyScores;
}

export interface FetchDetailsError {
  error: string;
  rawResponse?: string;
}

/**
 * Extract JSON from a string that might contain markdown or text formatting
 * @param text Response text that might contain markdown-formatted JSON
 * @returns Cleaned JSON string or null if extraction fails
 */
function extractJsonFromText(text: string): string | null {
  // Pattern to match JSON content between markdown code blocks
  const jsonBlockRegex = /```(?:json)?\s*([\s\S]*?)```/;
  const match = text.match(jsonBlockRegex);
  
  if (match && match[1]) {
    // Return the content inside the code block
    return match[1].trim();
  }
  
  // If the text already looks like JSON, return it directly
  if (text.trim().startsWith('{') && text.trim().endsWith('}')) {
    return text.trim();
  }
  
  return null;
}

export async function fetchPropertyDetails(
  property: Property
): Promise<FetchDetailsResult | FetchDetailsError> {
  
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  console.log()

  const combinedPrompt = `
    Analyze the following property and provide a comprehensive assessment in JSON format only, without markdown formatting or explanatory text.
    Include all the sections outlined below with detailed information relevant to home buyers.

    Property details: ${JSON.stringify(property)}
    Developer: ${property.developer_name}
    Location: ${property.location}

    The JSON output should follow this exact structure:
    {
      "propertyDetails": {
        "propertyOverview": "Brief overview of the property (exact 150 words)",
        "technicalDetails": {
          "constructionQuality": "Assessment of construction quality",
          "plumbingAndElectrical": "Details on plumbing and electrical systems",
          "structuralIntegrity": "Information about structural integrity",
          "materialsUsed": "Overview of materials used in construction",
          "energyEfficiency": "Energy efficiency rating and features"
        }
      },
      "locationDetails": {
        "locationOverview": "Brief overview of the location (exact 150 words)",
        "neighborhoodQuality": "Assessment of the neighborhood quality",
        "amenities": "Nearby amenities and facilities",
        "schools": "Information about local schools and education options",
        "safety": "Safety assessment of the area",
        "propertyValueTrends": "Property value trends in this location"
      },
      "developerDetails": {
        "developerOverview": "Overview of the developer (exact 150 words)",
        "reputation": "Developer's reputation in the market",
        "projectQuality": "Quality of past and current projects",
        "customerService": "Assessment of customer service",
        "financialStability": "Financial stability of the developer"
      },
      "priceTrendDetails": {
        "priceTrendOverview": "Overview of price trends (exact 150 words)",
        "historicalTrends": "Historical price trends in this area",
        "futureProjections": "Projected future trends",
        "comparableProperties": "Comparison with similar properties",
        "marketStability": "Assessment of market stability"
      },
      "propertyScores": {
        "scoreOverview": "Brief overview of the property score (exact 150 words)",
        "livabilityScore": [score between 1-100],
        "connectivityScore": [score between 1-100],
        "safetyScore": [score between 1-100],
        "pollutionScore": [score between 1-100],
        "socialLifestyleScore": [score between 1-100],
        "priceGrowthScore": [score between 1-100],
        "rentalYieldScore": [score between 1-100],
        "investmentPotentialScore": [score between 1-100],
        "gentrificationScore": [score between 1-100],
        "demandSupplyScore": [score between 1-100],
        "overallScore": [weighted average of all scores]
      }
    }

    Ensure all text fields are concise but informative, and all scores are realistic assessments based on the provided information.
    IMPORTANT: Return ONLY the JSON object with no additional text, markdown formatting, or code blocks.
  `;

  try {
    const response = await model.generateContent(combinedPrompt);
    const responseText = response.response.text();
    
    // Extract the JSON from the response in case it's wrapped in markdown
    const jsonStr = extractJsonFromText(responseText) || responseText;
    
    // Parse the JSON response
    const parsedResponse = JSON.parse(jsonStr);
    
    const res = {
      propertyDetails: parsedResponse.propertyDetails,
      locationDetails: parsedResponse.locationDetails,
      developerDetails: parsedResponse.developerDetails,
      priceTrendDetails: parsedResponse.priceTrendDetails,
      propertyScores: parsedResponse.propertyScores
    };

    // propertyService.updateProperty(property.id, {ai_overview: JSON.stringify(res)})
    try {
      await propertyService.updateProperty(property.id, {
        ai_overview: JSON.stringify(res)
      });
    } catch (error) {
      console.error('Update failed:', error);
    }

    return res
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
    return {
      error: "Failed to fetch or parse property data",
      rawResponse: error instanceof Error ? error.message : String(error)
    };
  }
}