'use client';

import React, { useEffect, useState } from 'react';
import { Container, Grid, Box, CircularProgress, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import { productsApi } from '@/src/lib/api/products';
import { Product } from '@/src/types/product';
import { ProductImages } from '@/src/components/products/detail/ProductImages';
import { ProductInfo } from '@/src/components/products/detail/ProductInfo';
import { ProductVariants } from '@/src/components/products/detail/ProductVariants';
import { AvatarPreview } from '@/src/components/avatars/AvatarPreview';
import { AskStylistButton } from '@/src/components/ai/AskStylistButton';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productsApi.getProduct(id);
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Container>
        <Box py={8} textAlign="center">
          <Typography variant="h5">Product not found</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ProductImages images={product.images} />
          <AvatarPreview productId={product.id} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ProductInfo product={product} />
          <ProductVariants product={product} />
          
          <Box mt={4}>
            <AskStylistButton productId={product.id} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
