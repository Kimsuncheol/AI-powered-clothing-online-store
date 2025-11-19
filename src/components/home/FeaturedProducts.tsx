'use client';

import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import Link from 'next/link';

// Mock data for now, or fetch from API
const featuredProducts = [
    { id: '1', title: 'Classic White Tee', price: 29.99, image: 'https://placehold.co/300x400' },
    { id: '2', title: 'Denim Jacket', price: 89.99, image: 'https://placehold.co/300x400' },
    { id: '3', title: 'Summer Dress', price: 59.99, image: 'https://placehold.co/300x400' },
    { id: '4', title: 'Leather Boots', price: 129.99, image: 'https://placehold.co/300x400' },
];

export const FeaturedProducts = () => {
    return (
        <Box sx={{ py: 8 }}>
            <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
                Featured Products
            </Typography>
            <Grid container spacing={4}>
                {featuredProducts.map((product) => (
                    <Grid key={product.id} size={{ xs: 12, sm: 6, md: 3 }}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardMedia
                                component="img"
                                sx={{
                                    // 16:9
                                    pt: '56.25%',
                                }}
                                image={product.image}
                                alt={product.title}
                                style={{ paddingTop: 0, height: 300, objectFit: 'cover' }}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h6" component="h2">
                                    {product.title}
                                </Typography>
                                <Typography>
                                    ${product.price}
                                </Typography>
                            </CardContent>
                            <Box sx={{ p: 2 }}>
                                <Button
                                  component={Link}
                                  href={`/products/${product.id}`}
                                  size="small"
                                  variant="contained"
                                  fullWidth
                                >
                                  View Details
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
