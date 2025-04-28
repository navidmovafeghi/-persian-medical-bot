import { useState, useEffect, useCallback } from 'react';
import { Message } from '@/services/api/types';
import { chatService } from '@/services';

interface UseChatReturn {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  showWelcomeUi: boolean;
  conversationId: string | null;
  sendMessage: (message: string) => Promise<void>;
  resetConversation: () => void;
}

interface ChatResponse {
  message: Message;
  conversationId: string;
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showWelcomeUi, setShowWelcomeUi] = useState(true);
  const [conversationId, setConversationId] = useState<string | null>(null);

  // Initialize conversation
  useEffect(() => {
    if (showWelcomeUi && messages.length === 0) {
      // Add initial welcome message
      const initialMessage: Message = {
        id: 'welcome',
        text: 'سلام! من دستیار هوشمند شما هستم. چطور می‌توانم کمکتان کنم؟',
        isUser: false,
        timestamp: new Date().toISOString()
      };
      setMessages([initialMessage]);
    }
  }, [showWelcomeUi, messages.length]);

  // Send message to API
  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    try {
      // Hide welcome UI when user sends a message
      if (showWelcomeUi) {
        setShowWelcomeUi(false);
        setMessages([]);
      }

      setIsLoading(true);
      setError(null);

      // Add user message immediately for better UX
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        text,
        isUser: true,
        timestamp: new Date().toISOString()
      };
      
      setMessages((prev) => [...prev, userMessage]);

      // Send message to API
      const response = await chatService.sendMessage({
        message: text,
        conversationId: conversationId || undefined
      });

      // Cast the response data to our expected type
      const chatResponse = response.data as unknown as ChatResponse;

      // Update conversation ID if this is a new conversation
      if (chatResponse.conversationId && !conversationId) {
        setConversationId(chatResponse.conversationId);
      }

      // Add bot response
      setMessages((prev) => [...prev, chatResponse.message]);

    } catch (err) {
      setError('خطا در ارسال پیام. لطفا دوباره تلاش کنید.');
      console.error('Error sending message:', err);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, showWelcomeUi, conversationId]);

  // Reset conversation
  const resetConversation = useCallback(() => {
    setShowWelcomeUi(true);
    setMessages([]);
    setConversationId(null);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    showWelcomeUi,
    conversationId,
    sendMessage,
    resetConversation
  };
} 