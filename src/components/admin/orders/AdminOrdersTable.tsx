'use client';

import React from 'react';
import {
  Box,
  Button,
  Chip,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { AdminOrder, AdminOrderStatus } from '@/src/types/admin';

interface AdminOrdersTableProps {
  orders: AdminOrder[];
  loading: boolean;
  total: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onView: (order: AdminOrder) => void;
  onResolveDispute: (orderId: string) => void;
}

const statusColors: Record<AdminOrderStatus, 'success' | 'warning' | 'default' | 'error' | 'info'> = {
  paid: 'success',
  pending: 'warning',
  cancelled: 'default',
  refunded: 'info',
  disputed: 'error',
  resolved: 'success',
};

export const AdminOrdersTable: React.FC<AdminOrdersTableProps> = ({
  orders,
  loading,
  total,
  page,
  rowsPerPage,
  onPageChange,
  onView,
  onResolveDispute,
}) => {
  const handlePaginationChange = (_: unknown, newPage: number) => {
    onPageChange(newPage + 1);
  };

  return (
    <TableContainer>
      {loading && <LinearProgress />}
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Buyer</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading && orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6}>
                <Box py={4} textAlign="center">
                  <Typography variant="body2" color="text.secondary">
                    No orders found
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order.id} hover>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.buyerEmail}</TableCell>
                <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                <TableCell>
                  <Chip label={order.status} color={statusColors[order.status]} size="small" />
                </TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                <TableCell align="right">
                  <Button size="small" onClick={() => onView(order)}>
                    View
                  </Button>
                  {order.status === 'disputed' && (
                    <Button size="small" color="success" onClick={() => onResolveDispute(order.id)}>
                      Mark resolved
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={total}
        page={page - 1}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[rowsPerPage]}
        onPageChange={handlePaginationChange}
        onRowsPerPageChange={() => {
          /* locked */
        }}
      />
    </TableContainer>
  );
};
