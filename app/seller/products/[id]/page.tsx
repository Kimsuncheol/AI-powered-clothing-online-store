'use client';

import React, { useEffect, useState } from 'react';
import { Alert, Box, CircularProgress, Container, Snackbar, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { ProductForm, ProductFormValues } from '@/src/components/seller/ProductForm';
import { sellerProductsApi } from '@/src/lib/api/sellerProducts';
import { SellerProduct, SellerProductPayload, SellerProductStatus } from '@/src/types/product';
import {
  MOCK_SELLER_CATEGORIES,
  MOCK_SELLER_PRODUCTS,
} from '@/src/lib/mockData/sellerProducts';

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export default function EditSellerProductPage({ params }: EditProductPageProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<string[]>(MOCK_SELLER_CATEGORIES);
  const [product, setProduct] = useState<SellerProduct | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoadingProduct(true);
      try {
        const response = await sellerProductsApi.getProduct(params.id);
        setProduct(response);
        setNotification(null);
      } catch (error) {
        console.error('Failed to fetch product. Falling back to mock data.', error);
        const fallback = MOCK_SELLER_PRODUCTS.find((item) => item.id === params.id);
        if (fallback) {
          setProduct(fallback);
          setNotification('Editing mock product data while the backend is unavailable.');
        } else {
          setNotification('Product not found.');
        }
      } finally {
        setIsLoadingProduct(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await sellerProductsApi.getCategories();
        if (response?.length) {
          setCategories(response);
        }
      } catch (error) {
        console.warn('Unable to load categories; using mock fallback.', error);
      }
    };

    fetchProduct();
    fetchCategories();
  }, [params.id]);

  const handleSubmit = async (values: ProductFormValues, options: { publish: boolean }) => {
    setIsSubmitting(true);
    try {
      const payload: SellerProductPayload = {
        ...values,
        status: options.publish ? ('active' as SellerProductStatus) : ('draft' as SellerProductStatus),
      };
      await sellerProductsApi.updateProduct(params.id, payload);
      router.push('/seller');
    } catch (error) {
      console.error('Failed to update product', error);
      setNotification('Unable to save product changes right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={3}>
        <Typography variant="h4" component="h1">
          Edit Product
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Update listing details, refresh inventory, or regenerate AI assets.
        </Typography>
      </Box>

      {isLoadingProduct ? (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress />
        </Box>
      ) : (
        <ProductForm
          key={product ? product.id : `draft-${params.id}`}
          product={product}
          availableCategories={categories}
          onSubmit={handleSubmit}
          onCancel={() => router.push('/seller')}
          isSubmitting={isSubmitting}
        />
      )}

      <Snackbar
        open={Boolean(notification)}
        autoHideDuration={6000}
        onClose={() => setNotification(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        {notification ? (
          <Alert severity="info" onClose={() => setNotification(null)} sx={{ width: '100%' }}>
            {notification}
          </Alert>
        ) : null}
      </Snackbar>
    </Container>
  );
}
