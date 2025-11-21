import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Button, Grid, Chip, Divider, Stack } from '@mui/material';
import { OutfitRecommendation } from '@/src/types/styling';
import { stylingApi } from '@/src/lib/api/styling';

interface OutfitRecommendationPanelProps {
  recommendations: OutfitRecommendation[];
  onRegenerate: () => void;
  onAdjust: () => void;
}

export default function OutfitRecommendationPanel({ recommendations, onRegenerate, onAdjust }: OutfitRecommendationPanelProps) {
  const handleSave = async (outfit: OutfitRecommendation) => {
    try {
      await stylingApi.saveStyle(outfit);
      alert('Style saved to history!'); // Simple feedback for now
    } catch (error) {
      console.error('Failed to save style', error);
      alert('Failed to save style. Please try again.');
    }
  };

  if (recommendations.length === 0) return null;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        AI Recommendations
      </Typography>
      
      <Stack spacing={3}>
        {recommendations.map((outfit) => (
          <Card key={outfit.id} variant="outlined">
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                {outfit.title}
              </Typography>
              <Typography color="text.secondary" paragraph>
                {outfit.summary}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={2}>
                {outfit.items.map((item) => (
                  <Grid item xs={6} sm={3} key={item.id}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                      <CardMedia
                        component="img"
                        height="100"
                        image={item.imageUrl || 'https://placehold.co/100x100?text=Item'}
                        alt={item.name}
                        sx={{ objectFit: 'contain', p: 1 }}
                      />
                      <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
                        <Typography variant="caption" display="block" color="text.secondary">
                          {item.category}
                        </Typography>
                        <Typography variant="body2" noWrap title={item.name}>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          ${item.price}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Total: ${outfit.totalPrice}
                </Typography>
                <Button variant="outlined" size="small" onClick={() => handleSave(outfit)}>
                  Save this Style
                </Button>
              </Box>

              <Box sx={{ mt: 2, bgcolor: 'action.hover', p: 2, borderRadius: 1 }}>
                <Typography variant="subtitle2" gutterBottom>Why this works:</Typography>
                <Typography variant="body2">{outfit.explanation}</Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
        <Button variant="contained" onClick={onRegenerate} fullWidth>
          Regenerate
        </Button>
        <Button variant="outlined" onClick={onAdjust} fullWidth>
          Adjust Filters
        </Button>
      </Box>
    </Box>
  );
}
