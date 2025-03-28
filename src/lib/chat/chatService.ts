import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import { Property } from '../../types';
import { propertyService } from '../propertyService';
import { PROPERTY_ASSISTANT_PROMPT } from './prompts';
import { ChatResponse } from './types';
import { ChatServiceError, ChatErrorCodes } from './errors';

export class ChatService {
  private static instance: ChatService;
  private model: GenerativeModel;
  private initialized: boolean = false;

  private constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new ChatServiceError(
        'Missing Gemini API key',
        ChatErrorCodes.INITIALIZATION_FAILED
      );
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      this.model = genAI.getGenerativeModel({ model: "gemini-pro" });
      this.initialized = true;
    } catch (error) {
      throw new ChatServiceError(
        'Failed to initialize chat service',
        ChatErrorCodes.INITIALIZATION_FAILED,
        error
      );
    }
  }

  static async getInstance(): Promise<ChatService> {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }
    return ChatService.instance;
  }

  private calculateLength(text: string): number {
    return text.length;
  }

  private async searchProperties(query: string): Promise<Property[]> {
    try {
      const properties = await propertyService.searchProperties(query);
      return properties.map(p => ({
        ...p
      }));
    } catch (error) {
      throw new ChatServiceError(
        'Failed to search properties',
        ChatErrorCodes.PROPERTY_SEARCH_FAILED,
        error
      );
    }
  }

  private async generateResponse(
    query: string,
    properties: Property[],
    onToken: (token: string) => void
  ): Promise<{ responseText: string; outputLength: number; suggestedQuestions: string[] }> {
    try {
      const propertiesContext = this.buildPropertiesContext(properties);
      const chat = await this.model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: "You are a real estate assistant. Be concise and helpful. After each response, suggest 4 relevant follow-up questions based on the context." }],
          },
          {
            role: "model",
            parts: [{ text: "I understand. I'll help users find properties, provide clear information, and suggest simple, relevant and to the point follow-up questions and phrased as if the user is asking them to guide the conversation." }],
          },
        ],
      });
  
      const prompt = `${PROPERTY_ASSISTANT_PROMPT}\n\nContext: ${propertiesContext}\n\nUser query: ${query}\n\nAfter your response, generate 4 relevant follow-up questions based on the context. Format your response as:\n[Main response]\n\nSuggested questions:\n1. [Question 1]\n2. [Question 2]\n3. [Question 3]\n4. [Question 4]`;
  
      const result = await chat.sendMessageStream(prompt);
      const { fullResponse, suggestedQuestions } = await this.processStreamResponse(result, onToken);
  
      const outputLength = this.calculateLength(fullResponse);
      return { responseText: fullResponse, outputLength, suggestedQuestions };
    } catch (error) {
      console.error('Response generation error:', error);
      throw new ChatServiceError(
        'Failed to generate response',
        ChatErrorCodes.RESPONSE_GENERATION_FAILED,
        error
      );
    }
  }
  
  private buildPropertiesContext(properties: Property[]): string {
    return properties.length > 0
      ? `Found ${properties.length} properties matching the criteria:\n${
          properties.map(p => 
            `- ${p.title} (${p.bedrooms_min} to ${p.bedrooms_max} beds) starts from ₹${p.price_min.toLocaleString()} till ${p.price_max.toLocaleString()} in ${p.location}`
          ).join('\n')
        }`
      : "No properties found matching the criteria.";
  }
  
  private async processStreamResponse(result: any, onToken: (token: string) => void): Promise<{ fullResponse: string; suggestedQuestions: string[] }> {
    let fullResponse = '';
    let suggestedQuestions: string[] = [];
    
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      fullResponse += chunkText;
      onToken(chunkText);
    }
  
    const parts = fullResponse.split('Suggested questions:');
    const mainResponse = parts[0].trim();
    
    if (parts.length > 1) {
      suggestedQuestions = parts[1]
        .trim()
        .split('\n')
        .map(q => q.replace(/^\d+\.\s*/, '').trim())
        .filter(q => q.length > 0)
        .slice(0, 4);
    }
  
    return { fullResponse: mainResponse, suggestedQuestions };
  }

  async processMessage(
    content: string,
    onToken: (token: string) => void
  ): Promise<ChatResponse> {
    if (!this.initialized) {
      throw new ChatServiceError(
        'Chat service not initialized',
        ChatErrorCodes.INITIALIZATION_FAILED
      );
    }

    try {
      const inputLength = this.calculateLength(content);
      const properties = await this.searchProperties(content);

      const { responseText, outputLength, suggestedQuestions } = await this.generateResponse(
        content,
        properties,
        onToken
      );

      return {
        response: responseText,
        inputLength,
        outputLength,
        properties: properties.length > 0 ? properties : undefined,
        suggestedQuestions
      };
    } catch (error) {
      console.error('Process message error:', error);
      if (error instanceof ChatServiceError) {
        throw error;
      }
      throw new ChatServiceError(
        'Failed to process message',
        ChatErrorCodes.MODEL_ERROR,
        error
      );
    }
  }
}

