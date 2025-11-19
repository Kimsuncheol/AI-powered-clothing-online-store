'use client';

import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const SortSelect: React.FC<SortSelectProps> = ({ value, onChange }) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as string);
  };

  return (
    <FormControl fullWidth margin="normal" size="small">
      <InputLabel id="sort-select-label">Sort By</InputLabel>
      <Select
        labelId="sort-select-label"
        id="sort-select"
        value={value}
        label="Sort By"
        onChange={handleChange}
      >
        <MenuItem value="newest">Newest</MenuItem>
        <MenuItem value="price_asc">Price: Low to High</MenuItem>
        <MenuItem value="price_desc">Price: High to Low</MenuItem>
        <MenuItem value="popularity">Popularity</MenuItem>
      </Select>
    </FormControl>
  );
};
