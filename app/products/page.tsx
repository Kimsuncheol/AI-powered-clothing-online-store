'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Container, Grid, Box, Typography, Paper, Drawer, IconButton, useTheme, useMediaQuery, Button, CircularProgress } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import { ProductList } from '@/src/components/products/ProductList';
import { ProductPagination } from '@/src/components/products/ProductPagination';
import { CategoryFilter } from '@/src/components/products/filters/CategoryFilter';
import { PriceRangeFilter } from '@/src/components/products/filters/PriceRangeFilter';
import { SortSelect } from '@/src/components/products/filters/SortSelect';
import { productsApi } from '@/src/lib/api/products';
import { Product, ProductFilters } from '@/src/types/product';
import { useSearchParams, useRouter } from 'next/navigation';

function CatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filters
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest');

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await productsApi.getCategories();
        setCategories(cats);
      } catch (error) {
        console.error('Failed to fetch categories', error);
        // Fallback categories
        setCategories(['Shirts', 'Pants', 'Dresses', 'Shoes', 'Accessories']);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const filters: ProductFilters = {
          category,
          price_min: priceRange[0],
          price_max: priceRange[1],
          sort,
          page,
        };
        
        // Update URL
        const params = new URLSearchParams();
        if (category) params.set('category', category);
        if (sort) params.set('sort', sort);
        params.set('page', page.toString());
        router.push(`/products?${params.toString()}`, { scroll: false });

        const response = await productsApi.getProducts(filters);
        setProducts(response.data);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error('Failed to fetch products', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, priceRange, sort, page, router]);

  const handleCategoryChange = (val: string) => {
    setCategory(val);
    setPage(1);
  };

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max]);
    setPage(1);
  };

  const handleSortChange = (val: string) => {
    setSort(val);
    setPage(1);
  };

  const FilterContent = () => (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Filters</Typography>
      <CategoryFilter value={category} onChange={handleCategoryChange} categories={categories} />
      <PriceRangeFilter min={priceRange[0]} max={priceRange[1]} onChange={handlePriceChange} />
      <SortSelect value={sort} onChange={handleSortChange} />
    </Box>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" component="h1">Catalog</Typography>
        {isMobile && (
          <Button 
            startIcon={<FilterListIcon />} 
            variant="outlined" 
            onClick={() => setIsFilterOpen(true)}
          >
            Filters
          </Button>
        )}
      </Box>

      <Grid container spacing={4}>
        {/* Desktop Sidebar */}
        {!isMobile && (
          <Grid size={{ xs: 12, md: 3 }}>
            <Paper elevation={0} variant="outlined">
              <FilterContent />
            </Paper>
          </Grid>
        )}

        {/* Product Grid */}
        <Grid size={{ xs: 12, md: 9 }}>
          <ProductList products={products} loading={loading} />
          <ProductPagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </Grid>
      </Grid>

      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="left"
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      >
        <Box sx={{ width: 280, pt: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" px={2}>
            <Typography variant="h6">Filters</Typography>
            <IconButton onClick={() => setIsFilterOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <FilterContent />
        </Box>
      </Drawer>
    </Container>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<Box display="flex" justifyContent="center" p={4}><CircularProgress /></Box>}>
      <CatalogContent />
    </Suspense>
  );
}
