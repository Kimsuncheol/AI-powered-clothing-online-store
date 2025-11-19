'use client';

import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useAuthContext } from '@/src/context/AuthContext';
import { AdminNotAuthorized } from '@/src/components/admin/AdminNotAuthorized';

export const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user || user.role !== 'admin') {
    return <AdminNotAuthorized />;
  }

  return <>{children}</>;
};
