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
import { AdminProduct, AdminProductStatus } from '@/src/types/admin';

interface AdminProductsTableProps {
  products: AdminProduct[];
  loading: boolean;
  total: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onAction: (productId: string, action: 'approve' | 'hide' | 'flag') => void;
  onView: (product: AdminProduct) => void;
}

const statusColors: Record<AdminProductStatus, 'warning' | 'success' | 'default' | 'error'> = {
  pending: 'warning',
  approved: 'success',
  hidden: 'default',
  flagged: 'error',
};

export const AdminProductsTable: React.FC<AdminProductsTableProps> = ({
  products,
  loading,
  total,
  page,
  rowsPerPage,
  onPageChange,
  onAction,
  onView,
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
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Seller</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading && products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6}>
                <Box py={4} textAlign="center">
                  <Typography variant="body2" color="text.secondary">
                    No products found
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.id} hover>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  <Typography variant="body2">{product.sellerName}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {product.sellerEmail}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip label={product.status} color={statusColors[product.status]} size="small" />
                </TableCell>
                <TableCell>{new Date(product.createdAt).toLocaleDateString()}</TableCell>
                <TableCell align="right">
                  <Button size="small" onClick={() => onView(product)}>
                    View
                  </Button>
                  {product.status !== 'approved' && (
                    <Button size="small" color="success" onClick={() => onAction(product.id, 'approve')}>
                      Approve
                    </Button>
                  )}
                  {product.status !== 'hidden' && (
                    <Button size="small" onClick={() => onAction(product.id, 'hide')}>
                      Hide
                    </Button>
                  )}
                  {product.status !== 'flagged' && (
                    <Button size="small" color="error" onClick={() => onAction(product.id, 'flag')}>
                      Flag
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
