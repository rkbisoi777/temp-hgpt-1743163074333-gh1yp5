import { propertyService } from "../propertyService";

export const propertySearchTool = {
  name: "property_search",
  description: "Search for properties in the database based on criteria",
  parameters: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "The search query for properties",
      },
    },
    required: ["query"],
  },
  call: async ({ query }: { query: string }) => {
    try {
      const properties = await propertyService.searchProperties(query);
      return JSON.stringify(properties);
    } catch (error) {
      console.error('Error searching properties:', error);
      return JSON.stringify([]);
    }
  },
};