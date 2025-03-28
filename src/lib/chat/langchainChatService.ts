import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { Property } from '../../types';
import { propertyService } from '../propertyService';
import { PROPERTY_ASSISTANT_PROMPT } from './prompts';
import { ChatResponse } from './types';
import { ChatServiceError, ChatErrorCodes } from './errors';
import { Tool } from "@langchain/core/tools";
import { RunnableSequence } from "@langchain/core/runnables";

// Property Search Tool
class PropertySearchTool extends Tool {
  name = "property_search";
  description = "Search for properties based on user criteria. Returns a list of matching properties.";

  constructor() {
    super();
  }

  async _call(query: string): Promise<string> {
    try {
      const properties = await propertyService.searchProperties(query);
      return this.formatPropertiesResponse(properties);
    } catch (error) {
      throw new Error(`Error searching properties: ${error}`);
    }
  }

  private formatPropertiesResponse(properties: Property[]): string {
    if (properties.length === 0) {
      return "No properties found matching the criteria.";
    }

    return `Found ${properties.length} properties matching the criteria:\n${
      properties.map(p => 
        `- ${p.title} (${p.bedrooms_min} to ${p.bedrooms_max} beds) available betwwen ₹${p.price_min.toLocaleString()} - ${p.price_max.toLocaleString()} in ${p.location} `
      ).join('\n')
    }`;
  }
}

// Character Stream Handler
class CharacterStreamHandler {
  private buffer: string = '';
  private responseText: string = '';
  private onToken: (token: string) => void;

  constructor(onToken: (token: string) => void) {
    this.onToken = onToken;
  }

  handleChunk(chunk: string) {
    // Add new chunk to buffer
    this.buffer += chunk;
    
    // Process each character in the buffer
    while (this.buffer.length > 0) {
      // Get the first character
      const char = this.buffer.charAt(0);
      
      // Remove it from the buffer
      this.buffer = this.buffer.slice(1);
      
      // Add to response text
      this.responseText += char;
      
      // Send single character to token handler
      this.onToken(char);
    }
  }

  getResponseText(): string {
    return this.responseText;
  }
}

// Chat Service
export class ChatService {
  private static instance: ChatService;
  private model: ChatGoogleGenerativeAI;
  private propertyTool: PropertySearchTool;
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
      this.model = new ChatGoogleGenerativeAI({
        apiKey,
        modelName: "gemini-1.5-pro",
        maxOutputTokens: 2048,
        temperature: 0.7,
        streaming: true
      });
      this.propertyTool = new PropertySearchTool();
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

  private async generateResponse(
    query: string,
    onToken: (token: string) => void
  ): Promise<{ responseText: string; outputLength: number; suggestedQuestions: string[] }> {
    try {
      // First, search for properties using the tool
      const propertiesContext = await this.propertyTool.call(query);

      // Create the chat prompt
      const prompt = ChatPromptTemplate.fromMessages([
        new SystemMessage(
          "You are a real estate assistant. Be concise and helpful. After each response, suggest 4 relevant follow-up questions based on the context."
        ),
        new HumanMessage(
          `${PROPERTY_ASSISTANT_PROMPT}\n\nContext: ${propertiesContext}\n\nUser query: ${query}\n\n` +
          "After your response, generate 4 relevant follow-up questions based on the context. " +
          "Format your response as:\n[Main response]\n\nSuggested questions:\n1. [Question 1]\n2. [Question 2]\n3. [Question 3]\n4. [Question 4]"
        ),
        new MessagesPlaceholder("history")
      ]);

      // Create a runnable sequence
      const chain = RunnableSequence.from([
        prompt,
        this.model
      ]);

      // Initialize character stream handler
      const streamHandler = new CharacterStreamHandler(onToken);

      // Stream the response
      const stream = await chain.stream({
        history: []
      });

      for await (const chunk of stream) {
        if (typeof chunk.content === 'string') {
          streamHandler.handleChunk(chunk.content);
        }
      }

      const fullResponse = streamHandler.getResponseText();
      const { mainResponse, suggestedQuestions } = this.parseResponse(fullResponse);
      const outputLength = this.calculateLength(mainResponse);

      return {
        responseText: mainResponse,
        outputLength,
        suggestedQuestions
      };
    } catch (error) {
      console.error('Response generation error:', error);
      throw new ChatServiceError(
        'Failed to generate response',
        ChatErrorCodes.RESPONSE_GENERATION_FAILED,
        error
      );
    }
  }

  private parseResponse(fullResponse: string): { mainResponse: string; suggestedQuestions: string[] } {
    const parts = fullResponse.split('Suggested questions:');
    const mainResponse = parts[0].trim();
    
    let suggestedQuestions: string[] = [];
    if (parts.length > 1) {
      suggestedQuestions = parts[1]
        .trim()
        .split('\n')
        .map(q => q.replace(/^\d+\.\s*/, '').trim())
        .filter(q => q.length > 0)
        .slice(0, 4);
    }

    return { mainResponse, suggestedQuestions };
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

      const { responseText, outputLength, suggestedQuestions } = await this.generateResponse(
        content,
        onToken
      );

      // Get the properties through the tool for the response
      const properties = await propertyService.searchProperties(content);

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