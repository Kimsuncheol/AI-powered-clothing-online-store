'use client';

import React from 'react';
import { Box, Typography, Chip, Rating, Divider } from '@mui/material';
import { Product } from '@/src/types/product';

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {product.title}
      </Typography>
      
      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="h5" color="primary" sx={{ mr: 2 }}>
          ${product.price.toFixed(2)}
        </Typography>
        {product.stock > 0 ? (
          <Chip label="In Stock" color="success" size="small" />
        ) : (
          <Chip label="Out of Stock" color="error" size="small" />
        )}
      </Box>

      <Box display="flex" alignItems="center" mb={2}>
        <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
          Sold by: {product.seller.name}
        </Typography>
        {product.seller.rating && (
          <Rating value={product.seller.rating} readOnly size="small" precision={0.5} />
        )}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="body1" paragraph>
        {product.description}
      </Typography>
    </Box>
  );
};
