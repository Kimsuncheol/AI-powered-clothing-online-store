'use client';

import React, { useState, useEffect } from 'react';
import { Box, Card, CardMedia, CircularProgress, Typography, Button } from '@mui/material';
import { AvatarControls } from './AvatarControls';
import { avatarsApi } from '@/src/lib/api/avatars';
import { AvatarPreset } from '@/src/types/avatars';

interface AvatarPreviewProps {
  productId: string;
}

export const AvatarPreview: React.FC<AvatarPreviewProps> = ({ productId }) => {
  const [presets, setPresets] = useState<AvatarPreset[]>([]);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('');
  const [styleParams, setStyleParams] = useState<Record<string, any>>({ style: 'casual' });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPresets = async () => {
      try {
        const data = await avatarsApi.fetchAvatarPresets();
        setPresets(data);
        if (data.length > 0) {
          setSelectedPresetId(String(data[0].id));
        }
      } catch (error) {
        console.error('Failed to load avatar presets', error);
      }
    };
    loadPresets();
  }, []);

  const handleGenerate = async () => {
    if (!selectedPresetId) return;
    
    setLoading(true);
    try {
      const response = await avatarsApi.renderAvatarPreview({
        productId,
        avatarPresetId: selectedPresetId,
        styleParams,
        imageCount: 1
      });
      
      if (response.imageUrls && response.imageUrls.length > 0) {
        setPreviewImage(response.imageUrls[0]);
      }
    } catch (error) {
      console.error('Failed to generate avatar preview', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card variant="outlined" sx={{ mt: 4 }}>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6">Virtual Try-On</Typography>
      </Box>
      
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ width: { xs: '100%', md: 300 }, borderRight: 1, borderColor: 'divider' }}>
          <AvatarControls
            presets={presets}
            selectedPresetId={selectedPresetId}
            onPresetChange={setSelectedPresetId}
            styleParams={styleParams}
            onStyleParamChange={(key, value) => setStyleParams(prev => ({ ...prev, [key]: value }))}
          />
          <Box sx={{ p: 2 }}>
            <Button 
              fullWidth 
              variant="contained" 
              onClick={handleGenerate}
              disabled={loading || !selectedPresetId}
            >
              {loading ? 'Generating...' : 'Try On'}
            </Button>
          </Box>
        </Box>
        
        <Box sx={{ flexGrow: 1, minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50', p: 2 }}>
          {loading ? (
            <CircularProgress />
          ) : previewImage ? (
            <CardMedia
              component="img"
              image={previewImage}
              alt="Avatar Preview"
              sx={{ maxHeight: 500, objectFit: 'contain' }}
            />
          ) : (
            <Typography color="text.secondary">
              Select options and click "Try On" to see the preview
            </Typography>
          )}
        </Box>
      </Box>
    </Card>
  );
};
