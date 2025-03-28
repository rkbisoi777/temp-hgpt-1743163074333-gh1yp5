export class ChatServiceError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ChatServiceError';
  }
}

export const ChatErrorCodes = {
  INITIALIZATION_FAILED: 'CHAT_INIT_FAILED',
  MODEL_ERROR: 'MODEL_ERROR',
  PROPERTY_SEARCH_FAILED: 'PROPERTY_SEARCH_FAILED',
  RESPONSE_GENERATION_FAILED: 'RESPONSE_GENERATION_FAILED',
} as const;