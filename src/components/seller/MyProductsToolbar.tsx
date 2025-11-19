'use client';

import React from 'react';
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { SellerProductStatus } from '@/src/types/product';

interface MyProductsToolbarProps {
  search: string;
  status: SellerProductStatus | 'all';
  category: string;
  categories: string[];
  onSearchChange: (value: string) => void;
  onStatusChange: (value: SellerProductStatus | 'all') => void;
  onCategoryChange: (value: string) => void;
  onCreateProduct: () => void;
}

const statusOptions: { value: MyProductsToolbarProps['status']; label: string }[] = [
  { value: 'all', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'draft', label: 'Draft' },
  { value: 'out_of_stock', label: 'Out of Stock' },
  { value: 'archived', label: 'Archived' },
];

export const MyProductsToolbar: React.FC<MyProductsToolbarProps> = ({
  search,
  status,
  category,
  categories,
  onSearchChange,
  onStatusChange,
  onCategoryChange,
  onCreateProduct,
}) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={2}>
        <TextField
          placeholder="Search products by name, category, or tags"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          InputProps={{
            startAdornment: (
              <Box
                component="span"
                sx={{ display: 'inline-flex', alignItems: 'center', color: 'text.secondary', mr: 1 }}
              >
                <SearchIcon fontSize="small" />
              </Box>
            ),
          }}
          fullWidth
        />

        <Stack direction={isSm ? 'column' : 'row'} spacing={2}>
          <TextField
            select
            label="Status"
            value={status}
            onChange={(event) => onStatusChange(event.target.value as MyProductsToolbarProps['status'])}
            fullWidth
          >
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Category"
            value={category || 'all'}
            onChange={(event) => onCategoryChange(event.target.value === 'all' ? '' : event.target.value)}
            fullWidth
          >
            <MenuItem value="all">All Categories</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onCreateProduct}
            sx={{ whiteSpace: 'nowrap' }}
          >
            Create Product
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};
