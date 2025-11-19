'use client';

import React, { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { AvatarPreset, AvatarStyleParams } from '@/src/types/avatars';
import { avatarsApi } from '@/src/lib/api/avatars';
import { ProductAvatarPresetSelect } from './ProductAvatarPresetSelect';
import { ProductAvatarStyleControls } from './ProductAvatarStyleControls';

interface ProductAvatarSettingsProps {
  productId?: string;
  onImagesGenerated?: (images: string[]) => void;
}

export const ProductAvatarSettings: React.FC<ProductAvatarSettingsProps> = ({
  productId,
  onImagesGenerated,
}) => {
  const [presets, setPresets] = useState<AvatarPreset[]>([]);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('');
  const [styleParams, setStyleParams] = useState<AvatarStyleParams>({});
  const [isLoadingPresets, setIsLoadingPresets] = useState(false);
  const [isRendering, setIsRendering] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPresets = async () => {
      setIsLoadingPresets(true);
      try {
        const response = await avatarsApi.fetchAvatarPresets();
        setPresets(response);
        if (response.length) {
          setSelectedPresetId(String(response[0].id));
        }
      } catch (err) {
        console.error('Failed to load avatar presets', err);
        setError('Unable to load avatar presets right now.');
      } finally {
        setIsLoadingPresets(false);
      }
    };

    fetchPresets();
  }, []);

  const handleGeneratePreviews = async () => {
    if (!selectedPresetId) {
      setError('Select an avatar preset to generate previews.');
      return;
    }

    setIsRendering(true);
    setError(null);

    try {
      const response = await avatarsApi.renderAvatarPreview({
        productId,
        avatarPresetId: selectedPresetId,
        styleParams,
        imageCount: 4,
      });

      setPreviews(response.imageUrls);
      setSelectedImages(new Set());
    } catch (err) {
      console.error('Failed to render avatar preview', err);
      setError('Unable to generate preview images right now.');
    } finally {
      setIsRendering(false);
    }
  };

  const toggleSelectedImage = (url: string) => {
    setSelectedImages((prev) => {
      const next = new Set(prev);
      if (next.has(url)) {
        next.delete(url);
      } else {
        next.add(url);
      }
      return next;
    });
  };

  const handleApplyImages = () => {
    if (selectedImages.size === 0) {
      setError('Select at least one preview image to add to the gallery.');
      return;
    }
    onImagesGenerated?.(Array.from(selectedImages));
    setSelectedImages(new Set());
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <Box>
            <Typography variant="h6">AI Avatar Settings</Typography>
            <Typography variant="body2" color="text.secondary">
              Pick an avatar preset and styling to preview AI-generated product shots.
            </Typography>
          </Box>

          {isLoadingPresets ? (
            <Box display="flex" justifyContent="center" py={4}>
              <CircularProgress size={24} />
            </Box>
          ) : (
            <>
              <ProductAvatarPresetSelect
                presets={presets}
                selectedPresetId={selectedPresetId}
                onChange={setSelectedPresetId}
              />

              <ProductAvatarStyleControls styleParams={styleParams} onChange={(key, value) =>
                setStyleParams((prev) => ({ ...prev, [key]: value }))
              } />

              <Button
                variant="outlined"
                onClick={handleGeneratePreviews}
                disabled={isRendering}
              >
                {isRendering ? 'Generating...' : 'Generate Preview Images'}
              </Button>
            </>
          )}

          {previews.length > 0 && (
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Preview Images
              </Typography>
              <Grid container spacing={1}>
                {previews.map((url) => (
                  <Grid item xs={6} key={url}>
                    <Box
                      sx={{
                        position: 'relative',
                        borderRadius: 1,
                        overflow: 'hidden',
                        border: (theme) =>
                          selectedImages.has(url)
                            ? `2px solid ${theme.palette.primary.main}`
                            : `1px solid ${theme.palette.divider}`,
                        cursor: 'pointer',
                      }}
                      onClick={() => toggleSelectedImage(url)}
                    >
                      <Checkbox
                        checked={selectedImages.has(url)}
                        sx={{
                          position: 'absolute',
                          top: 4,
                          right: 4,
                          bgcolor: 'background.paper',
                          borderRadius: '50%',
                        }}
                      />
                      <Box
                        component="img"
                        src={url}
                        alt="Avatar preview"
                        sx={{ width: '100%', display: 'block' }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 1 }}
                onClick={handleApplyImages}
                disabled={selectedImages.size === 0}
              >
                Add selected to gallery
              </Button>
            </Box>
          )}

          {error && (
            <Alert severity="warning" onClose={() => setError(null)}>
              {error}
            </Alert>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};
