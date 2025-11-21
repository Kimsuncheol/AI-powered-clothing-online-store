import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Button, Grid, Divider, Stack, Link } from '@mui/material';
import { OutfitRecommendation } from '@/src/types/styling';
import { stylingApi } from '@/src/lib/api/styling';

interface StylingResultsProps {
  recommendations: OutfitRecommendation[];
  onRegenerate: () => void;
  onAdjust: () => void;
  isLoggedIn?: boolean;
}

export default function StylingResults({ recommendations, onRegenerate, onAdjust, isLoggedIn }: StylingResultsProps) {
  const handleSave = async (outfit: OutfitRecommendation) => {
    if (!isLoggedIn) return;
    try {
      await stylingApi.saveStyle(outfit);
      alert('Style saved to history!');
    } catch (error) {
      console.error('Failed to save style', error);
      alert('Failed to save style. Please try again.');
    }
  };

  if (recommendations.length === 0) return null;

  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        AI Recommendations
      </Typography>
      
      <Stack spacing={4}>
        {recommendations.map((outfit) => (
          <Box key={outfit.id}>
            {/* Avatar Preview if available */}
            {outfit.avatarPreviewUrl && (
              <Box sx={{ mb: 2, borderRadius: 2, overflow: 'hidden', border: '1px solid #eee' }}>
                <img 
                  src={outfit.avatarPreviewUrl} 
                  alt="Avatar Preview" 
                  style={{ width: '100%', maxHeight: 400, objectFit: 'contain', display: 'block' }} 
                />
              </Box>
            )}

            <Card variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="h6" component="div">
                      {outfit.title}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      {outfit.summary}
                    </Typography>
                  </Box>
                  <Typography variant="h6" color="primary.main">
                    ${outfit.totalPrice}
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Grid container spacing={2}>
                  {outfit.items.map((item) => (
                    <Grid item xs={12} sm={6} md={3} key={item.id}>
                      <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardMedia
                          component="img"
                          height="120"
                          image={item.imageUrl || 'https://placehold.co/150x150?text=Product'}
                          alt={item.name}
                          sx={{ objectFit: 'contain', p: 1 }}
                        />
                        <CardContent sx={{ p: 1.5, flexGrow: 1 }}>
                          <Typography variant="caption" display="block" color="text.secondary" gutterBottom>
                            {item.category}
                          </Typography>
                          <Link href={item.productUrl} underline="hover" color="inherit">
                            <Typography variant="body2" fontWeight="medium" noWrap title={item.name}>
                              {item.name}
                            </Typography>
                          </Link>
                          <Typography variant="body2" fontWeight="bold" sx={{ mt: 0.5 }}>
                            ${item.price}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                <Box sx={{ mt: 3, bgcolor: 'grey.50', p: 2, borderRadius: 1 }}>
                  <Typography variant="subtitle2" gutterBottom fontWeight="bold">Why this works:</Typography>
                  <Typography variant="body2" color="text.secondary">{outfit.explanation}</Typography>
                </Box>

                <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button variant="contained" onClick={onRegenerate}>
                    Regenerate with same conditions
                  </Button>
                  <Button variant="outlined" onClick={onAdjust}>
                    Adjust filters
                  </Button>
                  {isLoggedIn && (
                    <Button variant="text" onClick={() => handleSave(outfit)}>
                      Save this style
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
