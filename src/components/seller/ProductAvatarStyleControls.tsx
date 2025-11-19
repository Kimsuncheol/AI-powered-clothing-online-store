'use client';

import React from 'react';
import { Box, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { AvatarStyleParams } from '@/src/types/avatars';

interface ProductAvatarStyleControlsProps {
  styleParams: AvatarStyleParams;
  onChange: (key: string, value: AvatarStyleParams[string]) => void;
}

export const ProductAvatarStyleControls: React.FC<ProductAvatarStyleControlsProps> = ({
  styleParams,
  onChange,
}) => {
  const styles = ['street casual', 'formal', 'sporty'];

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" gutterBottom>Style Vibe</Typography>
      <ToggleButtonGroup
        value={styleParams.style || 'street casual'}
        exclusive
        onChange={(e, val) => val && onChange('style', val)}
        aria-label="style vibe"
        fullWidth
      >
        {styles.map((style) => (
          <ToggleButton key={style} value={style} aria-label={style}>
            {style}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};
