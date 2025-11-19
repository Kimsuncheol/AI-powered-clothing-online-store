'use client';

import React from 'react';
import {
  Box,
  Button,
  Chip,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { SellerProduct } from '@/src/types/product';

interface MyProductsTableProps {
  products: SellerProduct[];
  loading: boolean;
  page: number;
  rowsPerPage: number;
  total: number;
  onPageChange: (page: number) => void;
  onEditProduct: (productId: string) => void;
}

const statusColorMap: Record<SellerProduct['status'], 'default' | 'success' | 'warning' | 'error'> = {
  active: 'success',
  draft: 'default',
  out_of_stock: 'warning',
  archived: 'error',
};

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const MyProductsTable: React.FC<MyProductsTableProps> = ({
  products,
  loading,
  page,
  rowsPerPage,
  total,
  onPageChange,
  onEditProduct,
}) => {
  const showEmptyState = !loading && products.length === 0;

  const handlePaginationChange = (_: unknown, newPage: number) => {
    onPageChange(newPage + 1);
  };

  return (
    <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
      {loading && <LinearProgress />}
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell width="30%">Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Categories</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Sales</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showEmptyState ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <Box py={5} textAlign="center">
                    <Typography variant="subtitle1" gutterBottom>
                      No products found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Try adjusting your filters or add a new product to get started.
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id} hover>
                  <TableCell>
                    <Typography variant="subtitle2">{product.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Updated {new Date(product.updatedAt || product.createdAt).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell>{currencyFormatter.format(product.price)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {product.categories.join(', ')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip size="small" label={product.status.replace(/_/g, ' ')} color={statusColorMap[product.status]} />
                  </TableCell>
                  <TableCell>{product.totalSales ?? '—'}</TableCell>
                  <TableCell align="right">
                    <Button size="small" onClick={() => onEditProduct(product.id)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={total}
        page={page - 1}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[rowsPerPage]}
        onPageChange={handlePaginationChange}
        onRowsPerPageChange={() => {
          /* not supported */
        }}
      />
    </Paper>
  );
};
