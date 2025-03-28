import { Property } from '../../types';

export interface ChatResponse {
  response: string;
  properties?: Property[];
  inputLength: number;
  outputLength: number;
  suggestedQuestions?: string[];
}

export interface ChatError extends Error {
  code?: string;
  details?: unknown;
}