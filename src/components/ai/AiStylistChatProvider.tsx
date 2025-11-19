'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AiStylistMessage, AiStylistChatRequest } from '@/src/types/ai';
import { aiStylistApi } from '@/src/lib/api/aiStylist';

interface AiStylistChatContextType {
  isOpen: boolean;
  toggleChat: () => void;
  messages: AiStylistMessage[];
  isLoading: boolean;
  sendMessage: (content: string) => Promise<void>;
  contextProductId: string | undefined;
  setContextProductId: (id: string | undefined) => void;
}

const AiStylistChatContext = createContext<AiStylistChatContextType | undefined>(undefined);

export const AiStylistChatProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AiStylistMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>(undefined);
  const [contextProductId, setContextProductId] = useState<string | undefined>(undefined);

  // Load conversation ID from local storage on mount
  useEffect(() => {
    const storedId = localStorage.getItem('aiStylistConversationId');
    if (storedId) {
      setConversationId(storedId);
      // Optionally fetch history here
      // fetchHistory(storedId);
    }
  }, []);

  const toggleChat = () => setIsOpen((prev) => !prev);

  const sendMessage = async (content: string) => {
    const userMessage: AiStylistMessage = {
      role: 'user',
      content,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const request: AiStylistChatRequest = {
        userMessage: content,
        conversationId,
        productId: contextProductId,
      };

      const response = await aiStylistApi.sendMessage(request);

      const assistantMessage: AiStylistMessage = {
        role: 'assistant',
        content: response.replyText,
        createdAt: new Date().toISOString(),
        recommendations: response.recommendations,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      
      if (response.conversationId && response.conversationId !== conversationId) {
        setConversationId(response.conversationId);
        localStorage.setItem('aiStylistConversationId', response.conversationId);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      // Handle error (e.g., show toast)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AiStylistChatContext.Provider
      value={{
        isOpen,
        toggleChat,
        messages,
        isLoading,
        sendMessage,
        contextProductId,
        setContextProductId,
      }}
    >
      {children}
    </AiStylistChatContext.Provider>
  );
};

export const useAiStylist = () => {
  const context = useContext(AiStylistChatContext);
  if (context === undefined) {
    throw new Error('useAiStylist must be used within an AiStylistChatProvider');
  }
  return context;
};
