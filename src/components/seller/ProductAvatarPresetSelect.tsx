'use client';

import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { AvatarPreset } from '@/src/types/avatars';

interface ProductAvatarPresetSelectProps {
  presets: AvatarPreset[];
  selectedPresetId: string;
  onChange: (id: string) => void;
}

export const ProductAvatarPresetSelect: React.FC<ProductAvatarPresetSelectProps> = ({
  presets,
  selectedPresetId,
  onChange,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel>Avatar Preset</InputLabel>
      <Select
        value={selectedPresetId}
        label="Avatar Preset"
        onChange={(e) => onChange(e.target.value as string)}
      >
        {presets.map((preset) => (
          <MenuItem key={preset.id} value={preset.id}>
            {preset.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
