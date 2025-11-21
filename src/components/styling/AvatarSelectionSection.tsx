import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, CardActionArea, Skeleton } from '@mui/material';
import { AvatarPreset } from '@/src/types/avatars';
import { avatarsApi } from '@/src/lib/api/avatars';

interface AvatarSelectionSectionProps {
  selectedAvatarId?: string | number;
  onSelect: (id: string | number) => void;
}

export default function AvatarSelectionSection({ selectedAvatarId, onSelect }: AvatarSelectionSectionProps) {
  const [avatars, setAvatars] = useState<AvatarPreset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAvatars = async () => {
      try {
        const data = await avatarsApi.fetchAvatarPresets();
        setAvatars(data);
      } catch (error) {
        console.error('Failed to load avatars', error);
        // Fallback mock data if API fails (for dev/demo)
        setAvatars([
          { id: 1, name: 'Default Female', tags: ['Female', 'Average'], parameters: {} },
          { id: 2, name: 'Default Male', tags: ['Male', 'Average'], parameters: {} },
        ]);
      } finally {
        setLoading(false);
      }
    };
    loadAvatars();
  }, []);

  if (loading) {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>3. Choose an Avatar (Optional)</Typography>
        <Grid container spacing={2}>
          {[1, 2, 3].map((i) => (
            <Grid item xs={6} sm={4} key={i}>
              <Skeleton variant="rectangular" height={150} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>3. Choose an Avatar (Optional)</Typography>
      <Grid container spacing={2}>
        {avatars.map((avatar) => (
          <Grid item xs={6} sm={4} md={3} key={avatar.id}>
            <Card 
              sx={{ 
                border: selectedAvatarId === avatar.id ? '2px solid' : '1px solid',
                borderColor: selectedAvatarId === avatar.id ? 'primary.main' : 'divider',
                boxShadow: selectedAvatarId === avatar.id ? 4 : 1
              }}
            >
              <CardActionArea onClick={() => onSelect(avatar.id)}>
                <CardMedia
                  component="img"
                  height="140"
                  image={avatar.thumbnailUrl || 'https://placehold.co/150x150?text=Avatar'}
                  alt={avatar.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ p: 1 }}>
                  <Typography variant="subtitle2" noWrap>{avatar.name}</Typography>
                  <Typography variant="caption" color="text.secondary" display="block" noWrap>
                    {avatar.tags.join(', ')}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
