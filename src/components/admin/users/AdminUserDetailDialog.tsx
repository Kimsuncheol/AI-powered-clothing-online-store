'use client';

import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import { AdminUser, AdminUserStatus } from '@/src/types/admin';

interface AdminUserDetailDialogProps {
  open: boolean;
  user: AdminUser | null;
  onClose: () => void;
  onUpdateStatus: (userId: string, status: AdminUserStatus) => void;
}

export const AdminUserDetailDialog: React.FC<AdminUserDetailDialogProps> = ({
  open,
  user,
  onClose,
  onUpdateStatus,
}) => {
  if (!user) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>User Details</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={1}>
          <Typography variant="subtitle2">Name</Typography>
          <Typography>{user.name}</Typography>

          <Typography variant="subtitle2">Email</Typography>
          <Typography>{user.email}</Typography>

          <Typography variant="subtitle2">Role</Typography>
          <Typography>{user.role}</Typography>

          <Typography variant="subtitle2">Status</Typography>
          <Typography textTransform="capitalize">{user.status}</Typography>

          <Typography variant="subtitle2">Created</Typography>
          <Typography>{new Date(user.createdAt).toLocaleString()}</Typography>

          {user.lastLoginAt && (
            <>
              <Typography variant="subtitle2">Last login</Typography>
              <Typography>{new Date(user.lastLoginAt).toLocaleString()}</Typography>
            </>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        {user.status !== 'deactivated' && (
          <Button onClick={() => onUpdateStatus(user.id, 'deactivated')}>Deactivate</Button>
        )}
        {user.status !== 'banned' && (
          <Button color="error" onClick={() => onUpdateStatus(user.id, 'banned')}>
            Ban
          </Button>
        )}
        {user.status !== 'active' && (
          <Button color="success" onClick={() => onUpdateStatus(user.id, 'active')}>
            Reactivate
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
