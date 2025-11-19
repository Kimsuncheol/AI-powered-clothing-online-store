'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Paper, Snackbar, Stack } from '@mui/material';
import { AdminProduct } from '@/src/types/admin';
import { adminProductsApi } from '@/src/lib/api/adminProducts';
import { AdminProductsFilter } from './AdminProductsFilter';
import { AdminProductsTable } from './AdminProductsTable';
import { AdminProductDetailDialog } from './AdminProductDetailDialog';
import { MOCK_ADMIN_PRODUCTS } from '@/src/lib/mockData/admin';

const ROWS_PER_PAGE = 10;

export const AdminProductsTab = () => {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [status, setStatus] = useState<'all' | AdminProduct['status']>('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [detailProduct, setDetailProduct] = useState<AdminProduct | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const filters = useMemo(() => ({ status, search, page }), [status, search, page]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await adminProductsApi.fetchProducts(filters);
        setProducts(response.data);
        setTotal(response.total);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch admin products, using mock data', err);
        const fallback = MOCK_ADMIN_PRODUCTS.filter((product) => {
          const matchStatus = filters.status === 'all' ? true : product.status === filters.status;
          const matchSearch = filters.search
            ? [product.name, product.sellerEmail, product.sellerName]
                .join(' ')
                .toLowerCase()
                .includes(filters.search.toLowerCase())
            : true;
          return matchStatus && matchSearch;
        });
        setProducts(fallback);
        setTotal(fallback.length);
        setError('Showing mock product data while the admin API is unavailable.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  const handleAction = async (productId: string, action: 'approve' | 'hide' | 'flag') => {
    try {
      const updated = await adminProductsApi.updateProductStatus(productId, action);
      setProducts((prev) => prev.map((product) => (product.id === productId ? updated : product)));
    } catch (err) {
      console.error('Failed to update product status', err);
      setError('Unable to update product status right now.');
    }
  };

  const handleView = (product: AdminProduct) => {
    setDetailProduct(product);
    setDetailOpen(true);
  };

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={2}>
        <AdminProductsFilter
          search={search}
          status={status}
          onSearchChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          onStatusChange={(value) => {
            setStatus(value);
            setPage(1);
          }}
        />
        <AdminProductsTable
          products={products}
          loading={loading}
          total={total}
          page={page}
          rowsPerPage={ROWS_PER_PAGE}
          onPageChange={setPage}
          onAction={handleAction}
          onView={handleView}
        />
      </Stack>

      <AdminProductDetailDialog open={detailOpen} product={detailProduct} onClose={() => setDetailOpen(false)} />

      <Snackbar
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        {error ? (
          <Alert severity="warning" onClose={() => setError(null)} sx={{ width: '100%' }}>
            {error}
          </Alert>
        ) : null}
      </Snackbar>
    </Paper>
  );
};
