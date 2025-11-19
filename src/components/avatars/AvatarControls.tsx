'use client';

import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Typography, Slider, Grid } from '@mui/material';
import { AvatarPreset } from '@/src/types/avatars';

interface AvatarControlsProps {
  presets: AvatarPreset[];
  selectedPresetId: string;
  onPresetChange: (id: string) => void;
  styleParams: Record<string, any>;
  onStyleParamChange: (key: string, value: any) => void;
}

export const AvatarControls: React.FC<AvatarControlsProps> = ({
  presets,
  selectedPresetId,
  onPresetChange,
  styleParams,
  onStyleParamChange,
}) => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle2" gutterBottom>Avatar Settings</Typography>
      
      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel>Avatar Model</InputLabel>
        <Select
          value={selectedPresetId}
          label="Avatar Model"
          onChange={(e) => onPresetChange(e.target.value as string)}
        >
          {presets.map((preset) => (
            <MenuItem key={preset.id} value={preset.id}>
              {preset.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography variant="caption" gutterBottom>Style Vibe</Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
           <FormControl fullWidth size="small">
            <InputLabel>Style</InputLabel>
            <Select
              value={styleParams.style || 'casual'}
              label="Style"
              onChange={(e) => onStyleParamChange('style', e.target.value)}
            >
              <MenuItem value="casual">Casual</MenuItem>
              <MenuItem value="formal">Formal</MenuItem>
              <MenuItem value="sporty">Sporty</MenuItem>
              <MenuItem value="streetwear">Streetwear</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};
