'use client';

import React, { useEffect, useState } from 'react';
import { Alert, Box, Container, Snackbar, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { ProductForm, ProductFormValues } from '@/src/components/seller/ProductForm';
import { sellerProductsApi } from '@/src/lib/api/sellerProducts';
import { SellerProductPayload, SellerProductStatus } from '@/src/types/product';
import { MOCK_SELLER_CATEGORIES } from '@/src/lib/mockData/sellerProducts';

export default function NewSellerProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<string[]>(MOCK_SELLER_CATEGORIES);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await sellerProductsApi.getCategories();
        if (response?.length) {
          setCategories(response);
        }
      } catch (error) {
        console.warn('Unable to load seller categories. Using defaults.', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (values: ProductFormValues, options: { publish: boolean }) => {
    setIsSubmitting(true);
    try {
      const payload: SellerProductPayload = {
        ...values,
        status: options.publish ? ('active' as SellerProductStatus) : ('draft' as SellerProductStatus),
      };
      await sellerProductsApi.createProduct(payload);
      router.push('/seller');
    } catch (error) {
      console.error('Failed to create product', error);
      setErrorMessage('Unable to create the product right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={3}>
        <Typography variant="h4" component="h1">
          Create Product
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Draft a new listing, generate AI content, and configure avatar previews.
        </Typography>
      </Box>

      <ProductForm
        key="create-product-form"
        availableCategories={categories}
        onSubmit={handleSubmit}
        onCancel={() => router.push('/seller')}
        isSubmitting={isSubmitting}
      />

      <Snackbar
        open={Boolean(errorMessage)}
        autoHideDuration={6000}
        onClose={() => setErrorMessage(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        {errorMessage ? (
          <Alert severity="error" onClose={() => setErrorMessage(null)} sx={{ width: '100%' }}>
            {errorMessage}
          </Alert>
        ) : null}
      </Snackbar>
    </Container>
  );
}
