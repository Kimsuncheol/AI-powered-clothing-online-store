'use client';

import React, { useEffect, useRef } from 'react';
import { Box, Typography, Paper, Avatar } from '@mui/material';
import { useAiStylist } from './AiStylistChatProvider';
import PersonIcon from '@mui/icons-material/Person';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { AiStylistRecommendations } from './AiStylistRecommendations';

export const AiStylistChatMessages = () => {
  const { messages, isLoading } = useAiStylist();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
      {messages.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4, color: 'text.secondary' }}>
          <Typography variant="body1">
            Hello! I'm your personal AI Stylist. Ask me anything about fashion, outfits, or specific products.
          </Typography>
        </Box>
      )}
      
      {messages.map((msg, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            mb: 2,
          }}
        >
          {msg.role === 'assistant' && (
            <Avatar sx={{ bgcolor: 'secondary.main', mr: 1, width: 32, height: 32 }}>
              <AutoAwesomeIcon fontSize="small" />
            </Avatar>
          )}
          
          <Box sx={{ maxWidth: '80%' }}>
            <Paper
              sx={{
                p: 1.5,
                bgcolor: msg.role === 'user' ? 'primary.main' : 'grey.100',
                color: msg.role === 'user' ? 'primary.contrastText' : 'text.primary',
                borderRadius: 2,
              }}
            >
              <Typography variant="body2">{msg.content}</Typography>
            </Paper>
            
            {msg.recommendations && msg.recommendations.length > 0 && (
              <AiStylistRecommendations recommendations={msg.recommendations} />
            )}
          </Box>

          {msg.role === 'user' && (
            <Avatar sx={{ bgcolor: 'primary.main', ml: 1, width: 32, height: 32 }}>
              <PersonIcon fontSize="small" />
            </Avatar>
          )}
        </Box>
      ))}
      
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
          <Avatar sx={{ bgcolor: 'secondary.main', mr: 1, width: 32, height: 32 }}>
            <AutoAwesomeIcon fontSize="small" />
          </Avatar>
          <Paper sx={{ p: 1.5, bgcolor: 'grey.100', borderRadius: 2 }}>
            <Typography variant="body2">Thinking...</Typography>
          </Paper>
        </Box>
      )}
      
      <div ref={messagesEndRef} />
    </Box>
  );
};
