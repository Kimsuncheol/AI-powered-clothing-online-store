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
import { AdminUser, AdminUserStatus } from '@/src/types/admin';

interface AdminUsersTableProps {
  users: AdminUser[];
  loading: boolean;
  total: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onViewUser: (user: AdminUser) => void;
  onUpdateStatus: (userId: string, status: AdminUserStatus) => void;
}

const statusColors: Record<AdminUserStatus, 'success' | 'default' | 'error'> = {
  active: 'success',
  deactivated: 'default',
  banned: 'error',
};

export const AdminUsersTable: React.FC<AdminUsersTableProps> = ({
  users,
  loading,
  total,
  page,
  rowsPerPage,
  onPageChange,
  onViewUser,
  onUpdateStatus,
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
            <TableCell>User ID</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading && users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6}>
                <Box py={4} textAlign="center">
                  <Typography variant="body2" color="text.secondary">
                    No users found
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Chip label={user.status} color={statusColors[user.status]} size="small" />
                </TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                <TableCell align="right">
                  <Button size="small" onClick={() => onViewUser(user)}>
                    View
                  </Button>
                  {user.status !== 'deactivated' && (
                    <Button size="small" onClick={() => onUpdateStatus(user.id, 'deactivated')}>
                      Deactivate
                    </Button>
                  )}
                  {user.status !== 'banned' && (
                    <Button size="small" color="error" onClick={() => onUpdateStatus(user.id, 'banned')}>
                      Ban
                    </Button>
                  )}
                  {user.status !== 'active' && (
                    <Button size="small" color="success" onClick={() => onUpdateStatus(user.id, 'active')}>
                      Reactivate
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
