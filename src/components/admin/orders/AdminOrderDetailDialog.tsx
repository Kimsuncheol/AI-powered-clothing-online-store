'use client';

import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { AdminOrderDetail } from '@/src/types/admin';

interface AdminOrderDetailDialogProps {
  open: boolean;
  order: AdminOrderDetail | null;
  onClose: () => void;
  onResolveDispute?: (orderId: string) => void;
}

export const AdminOrderDetailDialog: React.FC<AdminOrderDetailDialogProps> = ({
  open,
  order,
  onClose,
  onResolveDispute,
}) => {
  if (!order) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Order {order.id}</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={1}>
          <Typography variant="subtitle2">Buyer</Typography>
          <Typography>{order.buyerEmail}</Typography>

          <Typography variant="subtitle2">Status</Typography>
          <Typography textTransform="capitalize">{order.status}</Typography>

          <Typography variant="subtitle2">Total</Typography>
          <Typography>${order.totalAmount.toFixed(2)}</Typography>

          <Typography variant="subtitle2">Payment method</Typography>
          <Typography>{order.paymentMethod}</Typography>

          {order.shippingAddress && (
            <>
              <Typography variant="subtitle2">Shipping address</Typography>
              <Typography>{order.shippingAddress}</Typography>
            </>
          )}

          <Divider sx={{ my: 1 }} />

          <Typography variant="subtitle2">Items</Typography>
          <Stack spacing={1}>
            {order.items.map((item) => (
              <Stack key={`${order.id}-${item.productId}`} direction="row" justifyContent="space-between">
                <Typography>{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  x{item.quantity} — ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </Stack>
            ))}
          </Stack>

          {order.disputes && order.disputes.length > 0 && (
            <>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle2">Disputes</Typography>
              {order.disputes.map((dispute) => (
                <Stack key={dispute.id} spacing={0.5}>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(dispute.openedAt).toLocaleString()}
                  </Typography>
                  <Typography>{dispute.reason}</Typography>
                </Stack>
              ))}
            </>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        {order.status === 'disputed' && onResolveDispute && (
          <Button color="success" onClick={() => onResolveDispute(order.id)}>
            Mark resolved
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
