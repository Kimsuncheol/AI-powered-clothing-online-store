'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Slider } from '@mui/material';

interface PriceRangeFilterProps {
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
}

export const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({ min, max, onChange }) => {
  const [value, setValue] = useState<number[]>([min || 0, max || 1000]);

  useEffect(() => {
    setValue([min || 0, max || 1000]);
  }, [min, max]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleChangeCommitted = (event: Event | React.SyntheticEvent, newValue: number | number[]) => {
    const [newMin, newMax] = newValue as number[];
    onChange(newMin, newMax);
  };

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Typography id="price-range-slider" gutterBottom>
        Price Range
      </Typography>
      <Slider
        getAriaLabel={() => 'Price range'}
        value={value}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        valueLabelDisplay="auto"
        min={0}
        max={1000}
      />
    </Box>
  );
};
