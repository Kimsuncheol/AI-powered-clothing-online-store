'use client';

import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import Link from 'next/link';

export const AdminNotAuthorized = () => {
  return (
    <Box
      sx={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 2,
      }}
    >
      <LockIcon sx={{ fontSize: 48, color: 'text.secondary' }} />
      <Typography variant="h5">Admin access required</Typography>
      <Typography variant="body1" color="text.secondary">
        You don&apos;t have permission to view this section. Please contact your administrator if you
        believe this is a mistake.
      </Typography>
      <Button component={Link} href="/" variant="contained">
        Return home
      </Button>
    </Box>
  );
};
