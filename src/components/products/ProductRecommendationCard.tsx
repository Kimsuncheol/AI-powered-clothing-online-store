'use client';

import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import { ProductSummary } from '@/src/types/ai';

interface ProductRecommendationCardProps {
  product: ProductSummary;
}

export const ProductRecommendationCard: React.FC<ProductRecommendationCardProps> = ({ product }) => {
  return (
    <Card sx={{ display: 'flex', mb: 1 }}>
      <CardMedia
        component="img"
        sx={{ width: 80, objectFit: 'cover' }}
        image={product.image || 'https://placehold.co/100x100'}
        alt={product.title}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <CardContent sx={{ flex: '1 0 auto', p: 1, '&:last-child': { pb: 1 } }}>
          <Typography component="div" variant="subtitle2">
            {product.title}
          </Typography>
          <Typography variant="caption" color="text.secondary" component="div">
            ${product.price.toFixed(2)}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, gap: 1 }}>
          <Button 
            component={Link} 
            href={`/products/${product.id}`}
            size="small" 
            variant="outlined" 
            sx={{ fontSize: '0.7rem', py: 0.5 }}
          >
            View
          </Button>
          {/* Add to Cart logic would go here */}
        </Box>
      </Box>
    </Card>
  );
};
