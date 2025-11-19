'use client';

import React, { useState } from 'react';
import { Box, TextField, IconButton, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useAiStylist } from './AiStylistChatProvider';
import { AiStylistQuickPrompts } from './AiStylistQuickPrompts';

export const AiStylistChatInput = () => {
  const { sendMessage, isLoading, messages } = useAiStylist();
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const message = input;
    setInput('');
    await sendMessage(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box>
      {messages.length === 0 && <AiStylistQuickPrompts onSelect={(prompt) => setInput(prompt)} />}
      <TextField
        fullWidth
        placeholder="Ask for style advice..."
        variant="outlined"
        size="small"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isLoading}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSend} disabled={!input.trim() || isLoading} edge="end">
                <SendIcon color={input.trim() ? 'primary' : 'disabled'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};
