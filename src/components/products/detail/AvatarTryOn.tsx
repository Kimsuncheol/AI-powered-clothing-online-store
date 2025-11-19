'use client';

import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardMedia, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import { avatarsApi } from '@/src/lib/api/avatars';

interface AvatarTryOnProps {
  productId: string;
}

export const AvatarTryOn: React.FC<AvatarTryOnProps> = ({ productId }) => {
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [avatarId, setAvatarId] = useState('default');

  const handleTryOn = async () => {
    setLoading(true);
    try {
      const response = await avatarsApi.renderAvatar({ productId, avatarId });
      setGeneratedImage(response.imageUrl);
    } catch (error) {
      console.error('Failed to generate avatar try-on', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card variant="outlined" sx={{ p: 2, mt: 4 }}>
      <Typography variant="h6" gutterBottom display="flex" alignItems="center">
        <AccessibilityNewIcon sx={{ mr: 1 }} />
        Virtual Try-On
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <FormControl fullWidth size="small">
          <InputLabel>Select Avatar</InputLabel>
          <Select
            value={avatarId}
            label="Select Avatar"
            onChange={(e) => setAvatarId(e.target.value)}
          >
            <MenuItem value="default">Default Model</MenuItem>
            <MenuItem value="plus-size">Plus Size Model</MenuItem>
            <MenuItem value="petite">Petite Model</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Button 
        variant="contained" 
        color="secondary" 
        fullWidth 
        onClick={handleTryOn}
        disabled={loading}
        sx={{ mb: 2 }}
      >
        {loading ? 'Generating...' : 'Try On Avatar'}
      </Button>

      {loading && (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      )}

      {generatedImage && !loading && (
        <CardMedia
          component="img"
          image={generatedImage}
          alt="Virtual Try-On"
          sx={{ borderRadius: 1, height: 400, objectFit: 'contain', bgcolor: 'grey.100' }}
        />
      )}
    </Card>
  );
};
