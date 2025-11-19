'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useRouter } from 'next/navigation';
import { SellerDashboardLayout } from '@/src/components/seller/SellerDashboardLayout';
import { MyProductsToolbar } from '@/src/components/seller/MyProductsToolbar';
import { MyProductsTable } from '@/src/components/seller/MyProductsTable';
import { SellerAnalytics } from '@/src/components/seller/SellerAnalytics';
import { AiSellerAssistantPanel } from '@/src/components/ai/AiSellerAssistantPanel';
import { sellerProductsApi } from '@/src/lib/api/sellerProducts';
import {
  SellerAnalyticsSummary,
  SellerProduct,
  SellerProductFilters,
  SellerProductStatus,
} from '@/src/types/product';
import {
  MOCK_SELLER_ANALYTICS,
  MOCK_SELLER_CATEGORIES,
  MOCK_SELLER_PRODUCTS,
} from '@/src/lib/mockData/sellerProducts';

const applyClientFilters = (
  products: SellerProduct[],
  filters: Required<Pick<SellerProductFilters, 'limit' | 'page'>> & SellerProductFilters
) => {
  let filtered = [...products];

  if (filters.search) {
    const query = filters.search.toLowerCase();
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.categories.some((cat) => cat.toLowerCase().includes(query)) ||
        product.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  if (filters.status) {
    filtered = filtered.filter((product) => product.status === filters.status);
  }

  if (filters.category) {
    filtered = filtered.filter((product) =>
      product.categories.some((cat) => cat.toLowerCase() === filters.category?.toLowerCase())
    );
  }

  const total = filtered.length;
  const { page, limit } = filters;
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return { data: paginated, total };
};

const ROWS_PER_PAGE = 10;

export default function SellerDashboardPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<SellerProductStatus | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [products, setProducts] = useState<SellerProduct[]>([]);
  const [categories, setCategories] = useState<string[]>(MOCK_SELLER_CATEGORIES);
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [analytics, setAnalytics] = useState<SellerAnalyticsSummary | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await sellerProductsApi.getCategories();
        if (response?.length) {
          setCategories(response);
        }
      } catch (error) {
        console.warn('Falling back to default seller categories', error);
        setCategories(MOCK_SELLER_CATEGORIES);
      }
    };

    fetchCategories();
  }, []);

  const effectiveFilters: SellerProductFilters = useMemo(
    () => ({
      search: search || undefined,
      status: statusFilter === 'all' ? undefined : statusFilter,
      category: categoryFilter || undefined,
      page,
      limit: ROWS_PER_PAGE,
    }),
    [search, statusFilter, categoryFilter, page]
  );

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await sellerProductsApi.getProducts(effectiveFilters);
        setProducts(response.data);
        setTotalProducts(response.total);
        setErrorMessage(null);
      } catch (error) {
        console.error('Failed to load seller products. Falling back to mock data.', error);
        const fallback = applyClientFilters(MOCK_SELLER_PRODUCTS, {
          ...effectiveFilters,
          status: effectiveFilters.status,
        });
        setProducts(fallback.data);
        setTotalProducts(fallback.total);
        setErrorMessage('Showing mock data while the seller API is unavailable.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [effectiveFilters]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setAnalyticsLoading(true);
      try {
        const stats = await sellerProductsApi.getAnalytics();
        setAnalytics(stats);
      } catch (error) {
        console.warn('Failed to fetch analytics, using fallback', error);
        setAnalytics(MOCK_SELLER_ANALYTICS);
      } finally {
        setAnalyticsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const handleCreateProduct = () => {
    router.push('/seller/products/new');
  };

  const handleEditProduct = (productId: string) => {
    router.push(`/seller/products/${productId}`);
  };

  const handleStatusChange = (value: SellerProductStatus | 'all') => {
    setStatusFilter(value);
    setPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const closeError = () => setErrorMessage(null);

  return (
    <>
      <SellerDashboardLayout
        toolbar={
          <MyProductsToolbar
            search={search}
            status={statusFilter}
            category={categoryFilter}
            categories={categories}
            onSearchChange={handleSearchChange}
            onStatusChange={handleStatusChange}
            onCategoryChange={handleCategoryChange}
            onCreateProduct={handleCreateProduct}
          />
        }
        table={
          <MyProductsTable
            products={products}
            loading={loading}
            page={page}
            rowsPerPage={ROWS_PER_PAGE}
            total={totalProducts}
            onPageChange={setPage}
            onEditProduct={handleEditProduct}
          />
        }
        analytics={<SellerAnalytics stats={analytics} loading={analyticsLoading} />}
        aiAssistant={<AiSellerAssistantPanel products={products} />}
      />

      <Snackbar
        open={Boolean(errorMessage)}
        onClose={closeError}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        {errorMessage ? (
          <Alert severity="warning" onClose={closeError} sx={{ width: '100%' }}>
            {errorMessage}
          </Alert>
        ) : null}
      </Snackbar>
    </>
  );
}
