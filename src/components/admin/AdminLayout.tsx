'use client';

import React from 'react';
import { Box, Container, Paper, Stack, Typography } from '@mui/material';

interface AdminLayoutProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ header, children }) => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Admin Panel
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Moderate users, review listings, and oversee order operations.
          </Typography>
        </Box>
        <Paper variant="outlined">{header}</Paper>
        {children}
      </Stack>
    </Container>
  );
};
