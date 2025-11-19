'use client';

import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const collections = [
    { id: 1, title: 'Summer Vibes', image: 'https://placehold.co/600x400' },
    { id: 2, title: 'Office Chic', image: 'https://placehold.co/600x400' },
    { id: 3, title: 'Streetwear', image: 'https://placehold.co/600x400' },
];

export const TrendingCollections = () => {
    return (
        <Box sx={{ py: 8, bgcolor: 'background.default' }}>
            <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
                Trending Collections
            </Typography>
            <Grid container spacing={4}>
                {collections.map((collection) => (
                    <Grid key={collection.id} size={{ xs: 12, md: 4 }}>
                        <Paper
                            sx={{
                                position: 'relative',
                                backgroundColor: 'grey.800',
                                color: '#fff',
                                mb: 4,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                backgroundImage: `url(${collection.image})`,
                                height: 300,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                '&:hover': {
                                    opacity: 0.9,
                                },
                            }}
                        >
                            <Typography variant="h4" component="h3" sx={{ fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
                                {collection.title}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
