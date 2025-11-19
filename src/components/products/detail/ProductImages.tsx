'use client';

import React, { useState } from 'react';
import { Box, Grid, Card, CardMedia } from '@mui/material';

interface ProductImagesProps {
  images: string[];
}

export const ProductImages: React.FC<ProductImagesProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0] || 'https://placehold.co/600x800');

  return (
    <Box>
      <Card sx={{ mb: 2 }}>
        <CardMedia
          component="img"
          image={selectedImage}
          alt="Product Image"
          sx={{ height: 500, objectFit: 'contain', bgcolor: 'grey.100' }}
        />
      </Card>
      <Grid container spacing={2}>
        {images.map((img, index) => (
          <Grid key={index} size={{ xs: 3 }}>
            <Card 
              sx={{ 
                cursor: 'pointer', 
                border: selectedImage === img ? '2px solid primary.main' : 'none',
                opacity: selectedImage === img ? 1 : 0.7
              }}
              onClick={() => setSelectedImage(img)}
            >
              <CardMedia
                component="img"
                image={img}
                alt={`Thumbnail ${index}`}
                sx={{ height: 80, objectFit: 'cover' }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
