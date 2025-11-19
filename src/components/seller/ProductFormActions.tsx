'use client';

import React from 'react';
import { Button, Paper, Stack } from '@mui/material';

interface ProductFormActionsProps {
  onCancel?: () => void;
  onSaveDraft: () => void;
  onPublish: () => void;
  isSubmitting?: boolean;
}

export const ProductFormActions: React.FC<ProductFormActionsProps> = ({
  onCancel,
  onSaveDraft,
  onPublish,
  isSubmitting = false,
}) => {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack direction="row" spacing={2} justifyContent="flex-end" flexWrap="wrap">
        {onCancel && (
          <Button variant="outlined" color="inherit" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button variant="outlined" color="primary" onClick={onSaveDraft} disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : 'Save draft'}
        </Button>
        <Button variant="contained" color="primary" onClick={onPublish} disabled={isSubmitting}>
          {isSubmitting ? 'Publishing…' : 'Publish product'}
        </Button>
      </Stack>
    </Paper>
  );
};
