'use client';

import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import StylingForm from '@/src/components/styling/StylingForm';
import StylingResults from '@/src/components/styling/StylingResults';
import { StylingRequest, OutfitRecommendation } from '@/src/types/styling';
import { AvatarPreset } from '@/src/types/avatars';
import { stylingApi } from '@/src/lib/api/styling';
import { avatarsApi } from '@/src/lib/api/avatars';

export default function StylingPage() {
  // Form State
  const [formData, setFormData] = useState<StylingRequest>({
    occasion: '',
    style: '',
    freeText: '',
    constraints: {
      budgetMin: 50,
      budgetMax: 500,
      colors: [],
      sizes: {},
      season: '',
    },
    avatarId: '',
    useProfilePreferences: false,
    styleRiskLevel: 'normal',
  });

  // Data State
  const [avatars, setAvatars] = useState<AvatarPreset[]>([]);
  const [loadingAvatars, setLoadingAvatars] = useState(true);
  
  // Result State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<OutfitRecommendation[]>([]);

  // TODO: Integrate with real auth context
  const isLoggedIn = true; 

  // Fetch avatars on mount
  useEffect(() => {
    const loadAvatars = async () => {
      try {
        const data = await avatarsApi.fetchAvatarPresets();
        setAvatars(data);
      } catch (err) {
        console.error('Failed to load avatars', err);
        // Fallback mock data
        setAvatars([
          { id: 1, name: 'Default Female', tags: ['Female'], parameters: {} },
          { id: 2, name: 'Default Male', tags: ['Male'], parameters: {} },
        ]);
      } finally {
        setLoadingAvatars(false);
      }
    };
    loadAvatars();
  }, []);

  const handleGenerate = async () => {
    if (!formData.occasion || !formData.style) {
      setError('Please select an occasion and style.');
      return;
    }

    setLoading(true);
    setError(null);
    setRecommendations([]);

    try {
      const results = await stylingApi.generateOutfit(formData);
      setRecommendations(results);
    } catch (err) {
      console.error('Failed to generate outfits', err);
      setError('Failed to generate outfits. Please try again.');
      // Mock data for demo
      setRecommendations([
        {
          id: 'mock-1',
          title: 'Smart Casual Date Night',
          summary: 'A balanced look perfect for a dinner date.',
          totalPrice: 245,
          explanation: 'This outfit combines comfort with style, using neutral tones to create a sophisticated look.',
          items: [
            { id: 1, name: 'Silk Blouse', category: 'Top', price: 120, imageUrl: '', productUrl: '/product/1' },
            { id: 2, name: 'Tailored Trousers', category: 'Bottom', price: 85, imageUrl: '', productUrl: '/product/2' },
            { id: 3, name: 'Leather Loafers', category: 'Shoes', price: 40, imageUrl: '', productUrl: '/product/3' },
          ],
          avatarPreviewUrl: 'https://placehold.co/400x600?text=Avatar+Preview',
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAdjust = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        AI Stylist
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        Get personalized outfit recommendations based on your occasion and preferences.
      </Typography>

      <Grid container spacing={4}>
        {/* Left Column: Inputs */}
        <Grid item xs={12} md={5} lg={4}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <StylingForm
              formData={formData}
              setFormData={setFormData}
              avatars={avatars}
              loadingAvatars={loadingAvatars}
              onSubmit={handleGenerate}
              isSubmitting={loading}
              error={error}
            />
          </Paper>
        </Grid>

        {/* Right Column: Results */}
        <Grid item xs={12} md={7} lg={8}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
              <Typography>Generating your perfect look...</Typography>
            </Box>
          ) : (
            <>
              <StylingResults
                recommendations={recommendations}
                onRegenerate={handleGenerate}
                onAdjust={handleAdjust}
                isLoggedIn={isLoggedIn}
              />
              {recommendations.length === 0 && !error && (
                <Box sx={{ textAlign: 'center', py: 8, color: 'text.secondary', bgcolor: 'grey.50', borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom>No outfit generated yet.</Typography>
                  <Typography>Fill the form on the left and click 'Generate Outfit'.</Typography>
                </Box>
              )}
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
