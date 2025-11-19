'use client';

import React from 'react';
import { Grid, Box, Typography, CircularProgress } from '@mui/material';
import { Product } from '@/src/types/product';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  products: Product[];
  loading: boolean;
}

export const ProductList: React.FC<ProductListProps> = ({ products, loading }) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (products.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Typography variant="h6" color="text.secondary">
          No products found.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};
