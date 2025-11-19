'use client';

import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import { Product } from '@/src/types/product';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        sx={{
          pt: '0',
        }}
        image={product.images[0] || 'https://placehold.co/300x400'}
        alt={product.title}
        style={{ height: 300, objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h2">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.seller.name}
        </Typography>
        <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>
      <Box sx={{ p: 2 }}>
        <Button 
          component={Link} 
          href={`/products/${product.id}`}
          size="small" 
          variant="contained" 
          fullWidth
        >
          View Details
        </Button>
      </Box>
    </Card>
  );
};
