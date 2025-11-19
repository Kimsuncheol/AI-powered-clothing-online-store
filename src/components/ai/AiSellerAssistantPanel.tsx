'use client';

import React, { useEffect, useState } from 'react';
import {
  Alert,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { SellerProduct } from '@/src/types/product';
import { AiSellerAssistantMessage } from '@/src/types/aiSeller';
import { aiSellerApi } from '@/src/lib/api/aiSeller';
import { AiSellerAssistantMessages } from './AiSellerAssistantMessages';
import { AiSellerAssistantInput } from './AiSellerAssistantInput';
import { AiSellerAssistantQuickPrompts } from './AiSellerAssistantQuickPrompts';

interface AiSellerAssistantPanelProps {
  products: SellerProduct[];
}

const generateMessageId = () => crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);

export const AiSellerAssistantPanel: React.FC<AiSellerAssistantPanelProps> = ({ products }) => {
  const [messages, setMessages] = useState<AiSellerAssistantMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | undefined>(undefined);
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedConversationId = localStorage.getItem('aiSellerConversationId');
    const storedProductId = localStorage.getItem('aiSellerSelectedProductId');
    if (storedConversationId) {
      setConversationId(storedConversationId);
    }
    if (storedProductId) {
      setSelectedProductId(storedProductId);
    }
  }, []);

  useEffect(() => {
    if (conversationId) {
      localStorage.setItem('aiSellerConversationId', conversationId);
    }
  }, [conversationId]);

  useEffect(() => {
    localStorage.setItem('aiSellerSelectedProductId', selectedProductId);
  }, [selectedProductId]);

  const handleSendMessage = async (content: string) => {
    const newMessage: AiSellerAssistantMessage = {
      id: generateMessageId(),
      role: 'user',
      content,
      createdAt: new Date().toISOString(),
      productId: selectedProductId || undefined,
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsSending(true);
    setError(null);

    try {
      const response = await aiSellerApi.chat({
        userMessage: content,
        conversationId,
        productId: selectedProductId || undefined,
      });

      const assistantMessage: AiSellerAssistantMessage = {
        id: generateMessageId(),
        role: 'assistant',
        content: response.replyText,
        createdAt: new Date().toISOString(),
        productId: selectedProductId || undefined,
        suggestions: {
          title: response.suggestedTitle,
          description: response.suggestedDescription,
          tags: response.suggestedTags,
        },
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setConversationId(response.conversationId);
    } catch (err) {
      console.error('AI seller assistant request failed', err);
      setError('The assistant is unavailable right now. Please try again in a moment.');
    } finally {
      setIsSending(false);
    }
  };

  const handlePromptSelect = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
        <Stack spacing={1}>
          <Typography variant="h6">AI Seller Assistant</Typography>
          <Typography variant="body2" color="text.secondary">
            Chat with a co-pilot for pricing, product copy, and content ideas. Select an item to give
            the assistant context.
          </Typography>
        </Stack>

        <FormControl size="small" fullWidth>
          <InputLabel>Product context</InputLabel>
          <Select
            label="Product context"
            value={selectedProductId}
            onChange={(event) => setSelectedProductId(event.target.value)}
          >
            <MenuItem value="">No product context</MenuItem>
            {products.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <AiSellerAssistantQuickPrompts onPromptSelect={handlePromptSelect} disabled={isSending} />

        <Divider />

        <AiSellerAssistantMessages messages={messages} isLoading={isSending} />

        <AiSellerAssistantInput onSend={handleSendMessage} disabled={isSending} />

        {error && (
          <Alert severity="warning" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
