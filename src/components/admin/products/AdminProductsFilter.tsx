'use client';

import React from 'react';
import { MenuItem, Stack, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { AdminProductStatus } from '@/src/types/admin';

interface AdminProductsFilterProps {
  search: string;
  status: AdminProductStatus | 'all';
  onSearchChange: (value: string) => void;
  onStatusChange: (value: AdminProductStatus | 'all') => void;
}

export const AdminProductsFilter: React.FC<AdminProductsFilterProps> = ({
  search,
  status,
  onSearchChange,
  onStatusChange,
}) => {
  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
      <TextField
        placeholder="Search products or sellers"
        fullWidth
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1 }} />,
        }}
      />
      <TextField
        select
        label="Status"
        value={status}
        onChange={(event) => onStatusChange(event.target.value as AdminProductStatus | 'all')}
        sx={{ minWidth: 200 }}
      >
        <MenuItem value="all">All statuses</MenuItem>
        <MenuItem value="pending">Pending</MenuItem>
        <MenuItem value="approved">Approved</MenuItem>
        <MenuItem value="hidden">Hidden</MenuItem>
        <MenuItem value="flagged">Flagged</MenuItem>
      </TextField>
    </Stack>
  );
};
