'use client';

import React, { useState } from 'react';
import { Box, Typography, Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Product } from '@/src/types/product';

interface ProductVariantsProps {
  product: Product;
}

export const ProductVariants: React.FC<ProductVariantsProps> = ({ product }) => {
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);

  const handleSizeChange = (event: React.MouseEvent<HTMLElement>, newSize: string | null) => {
    if (newSize !== null) setSize(newSize);
  };

  const handleColorChange = (event: React.MouseEvent<HTMLElement>, newColor: string | null) => {
    if (newColor !== null) setColor(newColor);
  };

  return (
    <Box sx={{ my: 3 }}>
      <Box mb={3}>
        <Typography variant="subtitle1" gutterBottom>Size</Typography>
        <ToggleButtonGroup
          value={size}
          exclusive
          onChange={handleSizeChange}
          aria-label="sizes"
        >
          {product.sizes.map((s) => (
            <ToggleButton key={s} value={s} aria-label={s}>
              {s}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Box mb={3}>
        <Typography variant="subtitle1" gutterBottom>Color</Typography>
        <ToggleButtonGroup
          value={color}
          exclusive
          onChange={handleColorChange}
          aria-label="colors"
        >
          {product.colors.map((c) => (
            <ToggleButton key={c} value={c} aria-label={c}>
              {c}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      <Button 
        variant="contained" 
        size="large" 
        fullWidth 
        disabled={!size || !color || product.stock === 0}
      >
        Add to Cart
      </Button>
    </Box>
  );
};
