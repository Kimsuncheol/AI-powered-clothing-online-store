'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import { ProductSummary } from '@/src/types/ai';
import { ProductRecommendationCard } from '@/src/components/products/ProductRecommendationCard';

interface AiStylistRecommendationsProps {
  recommendations: ProductSummary[];
}

export const AiStylistRecommendations: React.FC<AiStylistRecommendationsProps> = ({ recommendations }) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
        Recommended for you:
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {recommendations.map((product) => (
          <ProductRecommendationCard key={product.id} product={product} />
        ))}
      </Box>
    </Box>
  );
};
