import React from 'react';
import { Box, TextField, Typography, Slider, Chip, FormControl, InputLabel, Select, MenuItem, Grid, Stack } from '@mui/material';
import { StylingConstraints } from '@/src/types/styling';

interface StylingInputSectionProps {
  occasion: string;
  setOccasion: (value: string) => void;
  style: string;
  setStyle: (value: string) => void;
  additionalInfo: string;
  setAdditionalInfo: (value: string) => void;
  constraints: StylingConstraints;
  setConstraints: (value: StylingConstraints) => void;
}

const OCCASIONS = ['Date', 'Job Interview', 'Party', 'Travel', 'Everyday', 'Wedding Guest', 'Gym'];
const STYLES = ['Casual', 'Street', 'Minimal', 'Formal', 'Sporty', 'Trendy', 'Vintage', 'Luxury'];
const COLORS = ['Black', 'White', 'Beige', 'Navy', 'Grey', 'Red', 'Blue', 'Green', 'Pastel'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function StylingInputSection({
  occasion,
  setOccasion,
  style,
  setStyle,
  additionalInfo,
  setAdditionalInfo,
  constraints,
  setConstraints,
}: StylingInputSectionProps) {
  
  const handleBudgetChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setConstraints({ ...constraints, budgetMin: newValue[0], budgetMax: newValue[1] });
    }
  };

  const handleColorToggle = (color: string) => {
    const currentColors = constraints.colors;
    const newColors = currentColors.includes(color)
      ? currentColors.filter((c) => c !== color)
      : [...currentColors, color];
    setConstraints({ ...constraints, colors: newColors });
  };

  const handleSizeChange = (type: 'top' | 'bottom' | 'shoes', value: string) => {
    setConstraints({
      ...constraints,
      sizes: { ...constraints.sizes, [type]: value },
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Occasion & Style */}
      <Box>
        <Typography variant="h6" gutterBottom>
          1. Occasion & Style
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Occasion</InputLabel>
              <Select
                value={occasion}
                label="Occasion"
                onChange={(e) => setOccasion(e.target.value)}
              >
                {OCCASIONS.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Style</InputLabel>
              <Select
                value={style}
                label="Style"
                onChange={(e) => setStyle(e.target.value)}
              >
                {STYLES.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Tell AI more about your situation (optional)"
              placeholder="e.g., I'm going to an outdoor wedding in October..."
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Constraints */}
      <Box>
        <Typography variant="h6" gutterBottom>
          2. Preferences & Constraints
        </Typography>
        
        {/* Budget */}
        <Box sx={{ mb: 3 }}>
          <Typography gutterBottom>Budget Range ($)</Typography>
          <Slider
            value={[constraints.budgetMin, constraints.budgetMax]}
            onChange={handleBudgetChange}
            valueLabelDisplay="auto"
            min={0}
            max={2000}
            step={50}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'text.secondary' }}>
            <Typography variant="body2">${constraints.budgetMin}</Typography>
            <Typography variant="body2">${constraints.budgetMax}+</Typography>
          </Box>
        </Box>

        {/* Colors */}
        <Box sx={{ mb: 3 }}>
          <Typography gutterBottom>Preferred Colors</Typography>
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {COLORS.map((color) => (
              <Chip
                key={color}
                label={color}
                onClick={() => handleColorToggle(color)}
                color={constraints.colors.includes(color) ? 'primary' : 'default'}
                variant={constraints.colors.includes(color) ? 'filled' : 'outlined'}
                clickable
              />
            ))}
          </Stack>
        </Box>

        {/* Sizes */}
        <Box>
          <Typography gutterBottom>Sizes</Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Top</InputLabel>
                <Select
                  value={constraints.sizes.top || ''}
                  label="Top"
                  onChange={(e) => handleSizeChange('top', e.target.value)}
                >
                  <MenuItem value="">Any</MenuItem>
                  {SIZES.map((s) => (
                    <MenuItem key={s} value={s}>{s}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Bottom</InputLabel>
                <Select
                  value={constraints.sizes.bottom || ''}
                  label="Bottom"
                  onChange={(e) => handleSizeChange('bottom', e.target.value)}
                >
                  <MenuItem value="">Any</MenuItem>
                  {SIZES.map((s) => (
                    <MenuItem key={s} value={s}>{s}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                size="small"
                label="Shoes"
                placeholder="e.g. 9"
                value={constraints.sizes.shoes || ''}
                onChange={(e) => handleSizeChange('shoes', e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
