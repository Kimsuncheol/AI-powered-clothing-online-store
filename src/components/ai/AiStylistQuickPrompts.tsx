'use client';

import React from 'react';
import { Box, Chip } from '@mui/material';

interface AiStylistQuickPromptsProps {
  onSelect: (prompt: string) => void;
}

const PROMPTS = [
  "Recommend outfit for a date",
  "Help me style this shirt",
  "Suggest an outfit for work",
  "Summer vacation trends"
];

export const AiStylistQuickPrompts: React.FC<AiStylistQuickPromptsProps> = ({ onSelect }) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
      {PROMPTS.map((prompt) => (
        <Chip
          key={prompt}
          label={prompt}
          onClick={() => onSelect(prompt)}
          clickable
          variant="outlined"
          size="small"
        />
      ))}
    </Box>
  );
};
