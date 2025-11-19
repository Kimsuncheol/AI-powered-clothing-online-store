'use client';

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, Typography } from '@mui/material';
import { AdminProduct } from '@/src/types/admin';

interface AdminProductDetailDialogProps {
  open: boolean;
  product: AdminProduct | null;
  onClose: () => void;
}

export const AdminProductDetailDialog: React.FC<AdminProductDetailDialogProps> = ({
  open,
  product,
  onClose,
}) => {
  if (!product) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Product details</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={1}>
          <Typography variant="subtitle2">Name</Typography>
          <Typography>{product.name}</Typography>

          <Typography variant="subtitle2">Seller</Typography>
          <Typography>{product.sellerName}</Typography>
          <Typography variant="body2" color="text.secondary">
            {product.sellerEmail}
          </Typography>

          <Typography variant="subtitle2">Status</Typography>
          <Typography textTransform="capitalize">{product.status}</Typography>

          <Typography variant="subtitle2">Created</Typography>
          <Typography>{new Date(product.createdAt).toLocaleString()}</Typography>

          {product.description && (
            <>
              <Typography variant="subtitle2">Description</Typography>
              <Typography color="text.secondary">{product.description}</Typography>
            </>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
