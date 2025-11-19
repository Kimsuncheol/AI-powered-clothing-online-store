'use client';

import React, { useEffect, useRef } from 'react';
import { Box, Chip, CircularProgress, Paper, Stack, Typography } from '@mui/material';
import { AiSellerAssistantMessage } from '@/src/types/aiSeller';

interface AiSellerAssistantMessagesProps {
  messages: AiSellerAssistantMessage[];
  isLoading: boolean;
}

export const AiSellerAssistantMessages: React.FC<AiSellerAssistantMessagesProps> = ({
  messages,
  isLoading,
}) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <Box
      sx={{
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        p: 2,
        height: 320,
        overflowY: 'auto',
        bgcolor: 'background.paper',
      }}
    >
      {messages.length === 0 ? (
        <Stack spacing={1} alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
          <Typography variant="body2" color="text.secondary" align="center">
            Ask about pricing, marketing angles, or shot directions. The assistant can also suggest
            titles, descriptions, and tags.
          </Typography>
        </Stack>
      ) : (
        <Stack spacing={2}>
          {messages.map((message) => (
            <Stack
              key={message.id}
              alignItems={message.role === 'user' ? 'flex-end' : 'flex-start'}
              spacing={1}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 1.5,
                  maxWidth: '85%',
                  bgcolor:
                    message.role === 'user'
                      ? (theme) => theme.palette.primary.main
                      : (theme) => theme.palette.grey[100],
                  color: message.role === 'user' ? 'primary.contrastText' : 'text.primary',
                }}
              >
                <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                  {message.content}
                </Typography>
              </Paper>

              {message.role === 'assistant' && message.suggestions && (
                <Stack spacing={1} sx={{ maxWidth: '85%' }}>
                  {message.suggestions.title && (
                    <Typography variant="subtitle2">Suggested title: {message.suggestions.title}</Typography>
                  )}
                  {message.suggestions.description && (
                    <Typography variant="body2" color="text.secondary">
                      {message.suggestions.description}
                    </Typography>
                  )}
                  {message.suggestions.tags && message.suggestions.tags.length > 0 && (
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {message.suggestions.tags.map((tag) => (
                        <Chip key={tag} size="small" label={tag} />
                      ))}
                    </Stack>
                  )}
                </Stack>
              )}
            </Stack>
          ))}
        </Stack>
      )}

      {isLoading && (
        <Stack spacing={1} direction="row" alignItems="center" justifyContent="center" mt={2}>
          <CircularProgress size={16} />
          <Typography variant="caption" color="text.secondary">
            Assistant is formulating a response…
          </Typography>
        </Stack>
      )}

      <div ref={bottomRef} />
    </Box>
  );
};
