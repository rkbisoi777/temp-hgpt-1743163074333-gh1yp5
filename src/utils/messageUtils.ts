// Generate a unique message ID combining timestamp and random string
export const generateMessageId = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `msg-${timestamp}-${random}`;
};