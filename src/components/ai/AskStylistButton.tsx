'use client';

import React from 'react';
import { Button } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useAiStylist } from './AiStylistChatProvider';

interface AskStylistButtonProps {
  productId?: string;
}

export const AskStylistButton: React.FC<AskStylistButtonProps> = ({ productId }) => {
  const { toggleChat, setContextProductId } = useAiStylist();

  const handleClick = () => {
    setContextProductId(productId);
    toggleChat();
  };

  return (
    <Button
      variant="outlined"
      color="secondary"
      startIcon={<AutoAwesomeIcon />}
      onClick={handleClick}
    >
      Ask AI Stylist
    </Button>
  );
};
