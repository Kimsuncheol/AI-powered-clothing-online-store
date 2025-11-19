'use client';

import React from 'react';
import { Fab, Tooltip } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useAiStylist } from './AiStylistChatProvider';

export const AiStylistChatFloatingButton = () => {
  const { toggleChat, isOpen } = useAiStylist();

  if (isOpen) return null;

  return (
    <Tooltip title="Ask AI Stylist" placement="left">
      <Fab
        color="secondary"
        aria-label="ask ai stylist"
        onClick={toggleChat}
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          zIndex: 1000,
        }}
      >
        <AutoAwesomeIcon />
      </Fab>
    </Tooltip>
  );
};
