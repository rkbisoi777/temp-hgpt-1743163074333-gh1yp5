import { useState, useEffect } from 'react';
import { ChatInput } from '../ChatInput';
import { Message } from '../../types';
import { ChatService } from '../../lib/chat/langchainChatService';
import { generateMessageId } from '../../utils/messageUtils';
import { toast } from 'react-hot-toast';
import { Property } from '../../types';
import { PropertyChatMessages } from './PropertyChatMessages';

interface PropertyChatDialogProps {
  property: Property;
}

export function PropertyChatDialog({ property }: PropertyChatDialogProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatService, setChatService] = useState<ChatService | null>(null);

  // Initialize Chat Service and Set Welcome Message
  useEffect(() => {
    const initChat = async () => {
      try {
        const service = await ChatService.getInstance();
        setChatService(service);
        setMessages([
          {
            id: generateMessageId(),
            content: `
        Hi! I'm your AI assistant for

        ${property.title}

        I can help you with:
        - 📊 Property details and features  
        - 💰 Pricing and market analysis  
        - 🏙️ Neighborhood information  
        - 🗓️ Booking a site visit  

        What would you like to know?
        `,
            role: 'assistant',
          },
        ]);
      } catch (error) {
        console.error('Chat Service Initialization Error:', error);
        toast.error('Failed to initialize chat. Please try again later.');
      }
    };
    initChat();
  }, [property.title]);

  const handleSendMessage = async (content: string) => {
    if (!chatService) {
      toast.error('Chat service is not available');
      return;
    }

    if (isLoading) return; // Prevent duplicate requests

    setIsLoading(true);
    const userMessage: Message = {
      id: generateMessageId(),
      content,
      role: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const contextualizedQuery = `
      Regarding the property titled "${property.title}", located at ${property.location}, price starts from ₹${property.price_min} to ₹${property.price_min}, featuring ${property.bedrooms_min} bedrooms, and ${property.sqft_min} sqft and other details of thr property ${JSON.stringify(property)}:

      User Query: "${content}"
    `.trim();

      let responseText = '';

      // Handle streaming response tokens
      const onToken = (token: string) => {
        responseText += token;
        setMessages((prev) => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage?.role === 'assistant') {
            return [...prev.slice(0, -1), { ...lastMessage, content: responseText }];
          } else {
            return [...prev, { id: generateMessageId(), content: responseText, role: 'assistant' }];
          }
        });
      };

      await chatService.processMessage(contextualizedQuery, onToken);

    } catch (error) {
      console.error('Chat Message Error:', error);
      toast.error('Failed to get a response. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex flex-col h-full rounded-lg">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 mb-10 pb-10">
        <PropertyChatMessages messages={messages} isLoading={isLoading} />
      </div>

      {/* Chat Input */}
      <div className="sticky bottom-0 rounded-lg border bg-gray-50">
        <ChatInput
          onSend={handleSendMessage}
          disabled={isLoading}
          placeholder={isLoading ? 'Waiting for a response...' : 'Ask about this property...'}
        />
      </div>
    </div>
  );
}
