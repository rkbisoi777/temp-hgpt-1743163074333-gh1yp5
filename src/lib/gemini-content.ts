import { GoogleGenerativeAI } from "@google/generative-ai";
import { Property } from "../types";

interface PropertyOverview {
  propertyOverview: string;
  technicalDetails: {
    constructionQuality: string;
    plumbingAndElectrical: string;
    structuralIntegrity: string;
    materialsUsed: string;
    energyEfficiency: string;
  };
}

interface LocationOverview {
  locationOverview: string;
  neighborhoodQuality: string;
  amenities: string;
  schools: string;
  safety: string;
  propertyValueTrends: string;
}

interface DeveloperOverview {
  developerOverview: string;
  reputation: string;
  projectQuality: string;
  customerService: string;
  financialStability: string;
}

interface FetchDetailsResult {
  propertyDetails: PropertyOverview;
  locationDetails: LocationOverview;
  developerDetails: DeveloperOverview;
}

interface FetchDetailsError {
  error: string;
  propertyRawText?: string;
  locationRawText?: string;
  developerRawText?: string;
}

export async function fetchPropertyLocationDeveloperDetails(
  property: Property,
  developer: string
): Promise<FetchDetailsResult | FetchDetailsError> {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const propertyPrompt = `
    Provide a short overview of the property in JSON format, covering all technical aspects relevant to home buyers. The overview should be under 200 words.

    Property details: ${JSON.stringify(property)}

    The JSON output should have the following structure:
    {
      "propertyOverview": "...",
      "technicalDetails": {
        "constructionQuality": "...",
        "plumbingAndElectrical": "...",
        "structuralIntegrity": "...",
        "materialsUsed": "...",
        "energyEfficiency": "..."
      }
    }
  `;

  const locationPrompt = `
    Provide a short overview of the location '${property.location}' for home buyers in JSON format, covering all aspects like neighborhood quality, amenities, schools, safety, and property value trends. The overview should be under 200 words.

    The JSON output should have the following structure:
    {
      "locationOverview": "...",
      "neighborhoodQuality": "...",
      "amenities": "...",
      "schools": "...",
      "safety": "...",
      "propertyValueTrends": "..."
    }
  `;

  const developerPrompt = `
    Provide a short overview of the real estate developer '${developer}' for home buyers in JSON format, covering all aspects. The overview should be under 100 words.

    The JSON output should have the following structure:
    {
      "developerOverview": "...",
      "reputation": "...",
      "projectQuality": "...",
      "customerService": "...",
      "financialStability": "..."
    }
  `;
    let propertyText: string = "";
    let locationText: string = "";
    let developerText: string = "";

  try {
    const [propertyResponse, locationResponse, developerResponse] = await Promise.all([
      model.generateContent(propertyPrompt),
      model.generateContent(locationPrompt),
      model.generateContent(developerPrompt),
    ]);

     propertyText = propertyResponse.response.text();
     locationText = locationResponse.response.text();
     developerText = developerResponse.response.text();

    const propertyJson: PropertyOverview = JSON.parse(propertyText);
    const locationJson: LocationOverview = JSON.parse(locationText);
    const developerJson: DeveloperOverview = JSON.parse(developerText);

    return {
      propertyDetails: propertyJson,
      locationDetails: locationJson,
      developerDetails: developerJson,
    };
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
    return {
      error: "Failed to fetch or parse data",
      propertyRawText: propertyText,
      locationRawText: locationText,
      developerRawText: developerText,
    };
  }
}