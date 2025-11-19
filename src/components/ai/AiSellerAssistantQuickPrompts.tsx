'use client';

import React from 'react';
import { Button, Stack } from '@mui/material';

interface AiSellerAssistantQuickPromptsProps {
  onPromptSelect: (prompt: string) => void;
  disabled?: boolean;
}

const QUICK_PROMPTS = [
  'Suggest a price for my hoodie.',
  'Write a catchy product description.',
  'What kind of photos should I take for this product?',
];

export const AiSellerAssistantQuickPrompts: React.FC<AiSellerAssistantQuickPromptsProps> = ({
  onPromptSelect,
  disabled,
}) => {
  return (
    <Stack direction="row" spacing={1} flexWrap="wrap">
      {QUICK_PROMPTS.map((prompt) => (
        <Button
          key={prompt}
          size="small"
          variant="outlined"
          onClick={() => onPromptSelect(prompt)}
          disabled={disabled}
        >
          {prompt}
        </Button>
      ))}
    </Stack>
  );
};
