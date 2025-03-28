import { useState, useEffect, useRef } from 'react';
import { Message } from '../types';
import { ChatInput } from './ChatInput';
import { MessageList } from './MessageList';
//import { ChatService } from '../lib/chat/chatService';
import { ChatService } from '../lib/chat/langchainChatService';
import { generateMessageId } from '../utils/messageUtils';
import { toast } from 'react-hot-toast';
import { ChatServiceError } from '../lib/chat/errors';
import { useToken } from './TokenContext';
import { TokenService } from '../lib/tokenService';
import { supabase } from '../lib/supabaseClient';

const DAILY_LIMIT = 5000;

interface ChatInterfaceProps {
  initialQuery?: string;
  shouldSendInitialQuery?: boolean;
}

export function ChatInterface({ initialQuery }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const initialQueryProcessed = useRef(false);
  const [chatService, setChatService] = useState<ChatService | null>(null);
  const [currentStreamingMessage, setCurrentStreamingMessage] = useState<string>('');
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);

  const { tokens, setTokens } = useToken();

  const getCookie = (name: string): string | null => {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (key === name) return decodeURIComponent(value);
    }
    return null;
  };
  
  const setCookie = (name: string, value: string, days: number): void => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/`;
  };

  useEffect(() => {
    const storedTokens = getCookie('HouseGPTTokens');
    const lastReset = getCookie('lastReset');
    const today = new Date().toISOString().split('T')[0];

    if (!lastReset || lastReset !== today) {
      setCookie('HouseGPTTokens', String(DAILY_LIMIT), 1);
      setCookie('lastReset', today, 1);
      setTokens(DAILY_LIMIT);
    } else if (storedTokens) {
      setTokens(Number(storedTokens));
    }
  }, [setTokens]);

  useEffect(() => {
    const initChatService = async () => {
      try {
        const service = await ChatService.getInstance();
        setChatService(service);
      } catch (error) {
        toast.error('Failed to initialize chat service');
        console.error('Chat service initialization failed:', error);
      }
    };
    initChatService();
  }, []);

  const subtractTokens = async(tokenUsed: number) => {
    const { data: { session } } = await supabase.auth.getSession();
          if (session?.user.id) {
            await TokenService.updateUserTokens(session.user.id, tokenUsed)
          }else{
           
                  const newTokenCount = tokens - tokenUsed;
                  if(newTokenCount < 0){
                    setTokens(0);
                    setCookie('HouseGPTTokens', String(0), 1);
                  }else{
                    setTokens(newTokenCount);
                    setCookie('HouseGPTTokens', String(newTokenCount), 1);
                  }
                  
                
          }
  };

  useEffect(() => {
    if (initialQuery && !initialQueryProcessed.current && chatService) {
      if(initialQuery !== "##**HouseGPT**#"){
        initialQueryProcessed.current = true;
        handleSendMessage(initialQuery);
      } else {
        setMessages([
          {
            id: generateMessageId(),
            content: `Hi, I'm HouseGPT! I can help you find the perfect property and answer all your real estate questions with personalized recommendations. I can help you with:
🏡 Find your dream property
📊 Provide accurate property details
💰 Share pricing and market trends
And much more...
What would you like to know?`,
            role: 'assistant',
          },
        ]);
      }
    }
  }, [initialQuery, chatService]);

  const checkAndUpdateTokens = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    let availableTokens = tokens;
  
    if (session?.user) {
      const userTokens = await TokenService.fetchUserTokens(session.user.id);
      availableTokens = userTokens.available_tokens;
    }
  
    if (availableTokens <= 0) {
      toast.error('You have run out of tokens. Please wait for your daily limit to reset or upgrade your plan.');
      return false;
    }
  
    return true;
  };
  
  const handleSendMessage = async (content: string) => {
    if (!chatService) {
      toast.error('Chat service not available');
      return;
    }
  
    const canProceed = await checkAndUpdateTokens();
    if (!canProceed) return;
  
    setIsLoading(true);
    const userMessage: Message = {
      id: generateMessageId(),
      content,
      role: 'user',
    };
  
    setMessages(prev => [...prev, userMessage]);
    setCurrentStreamingMessage('');
  
    try {
      const messageId = generateMessageId();
      setMessages(prev => [...prev, { id: messageId, content: '', role: 'assistant' }]);
  
      const { properties, inputLength, outputLength, suggestedQuestions } = await chatService.processMessage(
        content,
        (token) => {
          setCurrentStreamingMessage(prev => prev + token);
          setMessages(prev => prev.map(msg => 
            msg.id === messageId 
              ? { ...msg, content: prev.find(m => m.id === messageId)?.content + token || token }
              : msg
          ));
        }
      );
  
      setSuggestedQuestions(suggestedQuestions || []);
  
      const tokensUsed = inputLength + outputLength;
      subtractTokens(tokensUsed);
  
      setMessages(prev => prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, properties }
          : msg
      ));
    } catch (error) {
      const errorMessage = error instanceof ChatServiceError
        ? `Error: ${error.message}`
        : 'An unexpected error occurred';
      toast.error(errorMessage);
      console.error('Error processing message:', error);
    } finally {
      setIsLoading(false);
      setCurrentStreamingMessage('');
    }
  };
  
  return (
    <div className="flex flex-col h-full relative bg-gray-50">
      <MessageList messages={messages} isLoading={isLoading} onSendMessage={handleSendMessage} suggestedQuestions={suggestedQuestions} />
      
      <div className="sticky bottom-1 bg-white mx-1 border rounded-lg shadow-md">
        <div className="max-w-4xl mx-auto w-full">
          <ChatInput onSend={handleSendMessage} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
}