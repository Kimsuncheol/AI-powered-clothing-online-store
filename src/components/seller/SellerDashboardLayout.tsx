'use client';

import React from 'react';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';

interface SellerDashboardLayoutProps {
  toolbar: React.ReactNode;
  table: React.ReactNode;
  analytics?: React.ReactNode;
  aiAssistant?: React.ReactNode;
}

export const SellerDashboardLayout: React.FC<SellerDashboardLayoutProps> = ({
  toolbar,
  table,
  analytics,
  aiAssistant,
}) => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Seller Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track performance, manage products, and collaborate with the AI seller assistant.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Stack spacing={2}>
              {toolbar}
              {table}
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              {analytics}
              {aiAssistant}
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};
