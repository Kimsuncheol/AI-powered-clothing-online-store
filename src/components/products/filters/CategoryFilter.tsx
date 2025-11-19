'use client';

import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface CategoryFilterProps {
  value: string;
  onChange: (value: string) => void;
  categories: string[];
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ value, onChange, categories }) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as string);
  };

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel id="category-select-label">Category</InputLabel>
      <Select
        labelId="category-select-label"
        id="category-select"
        value={value}
        label="Category"
        onChange={handleChange}
      >
        <MenuItem value=""><em>All</em></MenuItem>
        {categories.map((category) => (
          <MenuItem key={category} value={category}>{category}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
