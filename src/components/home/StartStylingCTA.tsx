'use client';

import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export const StartStylingCTA = () => {
    const handleStartStyling = () => {
        // Open global AI Stylist Chat component
        console.log('Open AI Stylist Chat');
        // This would likely toggle a global state or context
    };

    return (
        <Box
            sx={{
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                py: 8,
                textAlign: 'center',
            }}
        >
            <Container maxWidth="md">
                <Typography variant="h3" component="h2" gutterBottom>
                    Unsure what to wear?
                </Typography>
                <Typography variant="h6" paragraph sx={{ mb: 4 }}>
                    Let our AI Stylist help you find the perfect outfit for any occasion.
                </Typography>
                <Button 
                    variant="contained" 
                    size="large" 
                    href="/styling"
                    startIcon={<AutoAwesomeIcon />}
                    sx={{ 
                        bgcolor: 'white', 
                        color: 'primary.main',
                        '&:hover': {
                            bgcolor: 'grey.100'
                        }
                    }}
                >
                    Start Styling Session
                </Button>
            </Container>
        </Box>
    );
};
