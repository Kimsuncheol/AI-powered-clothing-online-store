'use client';

import React from 'react';
import { Pagination, Box } from '@mui/material';

interface ProductPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const ProductPagination: React.FC<ProductPaginationProps> = ({ page, totalPages, onPageChange }) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  return (
    <Box display="flex" justifyContent="center" sx={{ mt: 4, mb: 4 }}>
      <Pagination 
        count={totalPages} 
        page={page} 
        onChange={handleChange} 
        color="primary" 
        size="large"
      />
    </Box>
  );
};
