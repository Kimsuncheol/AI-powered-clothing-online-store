'use client';

import React, { useState } from 'react';
import { Box, Button, Stack, TextField } from '@mui/material';

interface AiSellerAssistantInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const AiSellerAssistantInput: React.FC<AiSellerAssistantInputProps> = ({ onSend, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim() || disabled) return;
    onSend(message.trim());
    setMessage('');
  };

  return (
    <Box>
      <Stack spacing={1}>
        <TextField
          placeholder="Ask about pricing, copywriting, or shoot ideas"
          multiline
          minRows={2}
          maxRows={4}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              handleSend();
            }
          }}
          disabled={disabled}
        />
        <Stack direction="row" justifyContent="flex-end">
          <Button variant="contained" onClick={handleSend} disabled={disabled}>
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
