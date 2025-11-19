'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Alert, MenuItem, Paper, Snackbar, Stack, TextField } from '@mui/material';
import { AdminOrder, AdminOrderDetail, AdminOrderStatus } from '@/src/types/admin';
import { adminOrdersApi } from '@/src/lib/api/adminOrders';
import { AdminOrdersTable } from './AdminOrdersTable';
import { AdminOrderDetailDialog } from './AdminOrderDetailDialog';
import { MOCK_ADMIN_ORDERS, MOCK_ADMIN_ORDER_DETAILS } from '@/src/lib/mockData/admin';

const ROWS_PER_PAGE = 10;

export const AdminOrdersTab = () => {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [status, setStatus] = useState<AdminOrderStatus | 'all'>('all');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [detailOrder, setDetailOrder] = useState<AdminOrderDetail | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const filters = useMemo(() => ({ status, page }), [status, page]);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await adminOrdersApi.fetchOrders(filters);
        setOrders(response.data);
        setTotal(response.total);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch admin orders, using mock data', err);
        const fallback = MOCK_ADMIN_ORDERS.filter((order) =>
          filters.status === 'all' ? true : order.status === filters.status
        );
        setOrders(fallback);
        setTotal(fallback.length);
        setError('Showing mock order data while the admin API is unavailable.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [filters]);

  const handleViewOrder = async (order: AdminOrder) => {
    try {
      const detail = await adminOrdersApi.fetchOrderDetail(order.id);
      setDetailOrder(detail);
    } catch (err) {
      console.error('Failed to fetch order detail, using mock data', err);
      setDetailOrder(MOCK_ADMIN_ORDER_DETAILS[order.id]);
    } finally {
      setDetailOpen(true);
    }
  };

  const handleResolveDispute = async (orderId: string) => {
    try {
      const resolved = await adminOrdersApi.resolveDispute(orderId, 'resolved');
      setOrders((prev) => prev.map((order) => (order.id === orderId ? resolved : order)));
      if (detailOrder?.id === orderId) {
        setDetailOrder(resolved);
      }
    } catch (err) {
      console.error('Failed to resolve dispute', err);
      setError('Unable to resolve dispute right now.');
    }
  };

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={2}>
        <TextField
          select
          label="Status"
          value={status}
          onChange={(event) => {
            setStatus(event.target.value as AdminOrderStatus | 'all');
            setPage(1);
          }}
          sx={{ maxWidth: 240 }}
        >
          <MenuItem value="all">All statuses</MenuItem>
          <MenuItem value="paid">Paid</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
          <MenuItem value="refunded">Refunded</MenuItem>
          <MenuItem value="disputed">Disputed</MenuItem>
          <MenuItem value="resolved">Resolved</MenuItem>
        </TextField>

        <AdminOrdersTable
          orders={orders}
          loading={loading}
          total={total}
          page={page}
          rowsPerPage={ROWS_PER_PAGE}
          onPageChange={setPage}
          onView={handleViewOrder}
          onResolveDispute={handleResolveDispute}
        />
      </Stack>

      <AdminOrderDetailDialog
        open={detailOpen}
        order={detailOrder}
        onClose={() => setDetailOpen(false)}
        onResolveDispute={handleResolveDispute}
      />

      <Snackbar
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        {error ? (
          <Alert severity="warning" onClose={() => setError(null)} sx={{ width: '100%' }}>
            {error}
          </Alert>
        ) : null}
      </Snackbar>
    </Paper>
  );
};
