import React from 'react';
import { Box, Typography, Paper, Skeleton } from '@mui/material';

interface AvatarPreviewPanelProps {
  previewUrl?: string;
  loading?: boolean;
}

export default function AvatarPreviewPanel({ previewUrl, loading }: AvatarPreviewPanelProps) {
  if (loading) {
    return (
      <Paper variant="outlined" sx={{ p: 2, height: '100%', minHeight: 400, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" gutterBottom>Avatar Preview</Typography>
        <Skeleton variant="rectangular" width="100%" height="100%" sx={{ flexGrow: 1 }} />
      </Paper>
    );
  }

  return (
    <Paper variant="outlined" sx={{ p: 2, height: '100%', minHeight: 400, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" gutterBottom>Avatar Preview</Typography>
      
      <Box 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          bgcolor: 'grey.100',
          borderRadius: 1,
          overflow: 'hidden'
        }}
      >
        {previewUrl ? (
          <img 
            src={previewUrl} 
            alt="Avatar Preview" 
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
          />
        ) : (
          <Typography color="text.secondary" align="center">
            Select an avatar and generate an outfit to see the preview.
          </Typography>
        )}
      </Box>
    </Paper>
  );
}
