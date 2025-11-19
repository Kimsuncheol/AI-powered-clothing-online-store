'use client';

import React from 'react';
import { Card, CardContent, Grid, Skeleton, Typography } from '@mui/material';
import { SellerAnalyticsSummary } from '@/src/types/product';

interface SellerAnalyticsProps {
  stats: SellerAnalyticsSummary | null;
  loading: boolean;
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export const SellerAnalytics: React.FC<SellerAnalyticsProps> = ({ stats, loading }) => {
  const cards = [
    {
      title: 'Total Products',
      value: stats?.totalProducts ?? 0,
      helperText: 'Published + draft items',
    },
    {
      title: 'Total Sales',
      value: stats ? currencyFormatter.format(stats.totalSales) : currencyFormatter.format(0),
      helperText: 'Lifetime gross revenue',
    },
    {
      title: 'Top Selling Product',
      value: stats?.topProductName ?? '—',
      helperText: stats?.topProductSales
        ? `${stats.topProductSales} units sold`
        : 'Keep selling to unlock insights',
    },
  ];

  return (
    <Grid container spacing={2}>
      {cards.map((card) => (
        <Grid item xs={12} sm={4} key={card.title}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="overline" color="text.secondary">
                {card.title}
              </Typography>
              {loading ? (
                <Skeleton variant="text" height={40} />
              ) : (
                <Typography variant="h5" component="p">
                  {card.value}
                </Typography>
              )}
              <Typography variant="body2" color="text.secondary">
                {card.helperText}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
