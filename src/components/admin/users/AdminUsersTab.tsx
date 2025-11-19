'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Paper, Snackbar, Stack } from '@mui/material';
import { AdminUser, AdminUserStatus } from '@/src/types/admin';
import { adminUsersApi } from '@/src/lib/api/adminUsers';
import { AdminUserSearch } from './AdminUserSearch';
import { AdminUsersTable } from './AdminUsersTable';
import { AdminUserDetailDialog } from './AdminUserDetailDialog';
import { MOCK_ADMIN_USERS } from '@/src/lib/mockData/admin';

const ROWS_PER_PAGE = 10;

export const AdminUsersTab = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [detailUser, setDetailUser] = useState<AdminUser | null>(null);
  const [isDetailOpen, setDetailOpen] = useState(false);

  const filters = useMemo(() => ({ search, page }), [search, page]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await adminUsersApi.fetchUsers(filters);
        setUsers(response.data);
        setTotal(response.total);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch admin users, using mock data', err);
        const fallback = MOCK_ADMIN_USERS.filter((user) =>
          filters.search ? user.email.toLowerCase().includes(filters.search.toLowerCase()) : true
        );
        setUsers(fallback);
        setTotal(fallback.length);
        setError('Showing mock user data while the admin API is unavailable.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [filters]);

  const handleViewUser = (user: AdminUser) => {
    setDetailUser(user);
    setDetailOpen(true);
  };

  const handleUpdateStatus = async (userId: string, status: AdminUserStatus) => {
    try {
      const updated = await adminUsersApi.updateUserStatus(userId, status);
      setUsers((prev) => prev.map((user) => (user.id === userId ? updated : user)));
      if (detailUser?.id === userId) {
        setDetailUser(updated);
      }
    } catch (err) {
      console.error('Failed to update admin user status', err);
      setError('Unable to update user status right now.');
    }
  };

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={2}>
        <AdminUserSearch value={search} onChange={(value) => {
          setSearch(value);
          setPage(1);
        }} />
        <AdminUsersTable
          users={users}
          loading={loading}
          total={total}
          page={page}
          rowsPerPage={ROWS_PER_PAGE}
          onPageChange={setPage}
          onViewUser={handleViewUser}
          onUpdateStatus={handleUpdateStatus}
        />
      </Stack>

      <AdminUserDetailDialog
        open={isDetailOpen}
        user={detailUser}
        onClose={() => setDetailOpen(false)}
        onUpdateStatus={handleUpdateStatus}
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
