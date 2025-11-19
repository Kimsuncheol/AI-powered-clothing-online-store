'use client';

import React from 'react';
import { Drawer, Box, IconButton, Typography, Divider, useTheme, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAiStylist } from './AiStylistChatProvider';
import { AiStylistChatMessages } from './AiStylistChatMessages';
import { AiStylistChatInput } from './AiStylistChatInput';

export const AiStylistChatModal = () => {
  const { isOpen, toggleChat } = useAiStylist();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Drawer
      anchor={isMobile ? 'bottom' : 'right'}
      open={isOpen}
      onClose={toggleChat}
      PaperProps={{
        sx: {
          width: isMobile ? '100%' : 400,
          height: isMobile ? '80vh' : '100%',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6">AI Stylist</Typography>
        <IconButton onClick={toggleChat}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      
      <Box sx={{ flexGrow: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <AiStylistChatMessages />
      </Box>
      
      <Box sx={{ p: 2 }}>
        <AiStylistChatInput />
      </Box>
    </Drawer>
  );
};
