'use client';

import Link from 'next/link';
import { Box, Typography } from '@mui/material';

const Logo = () => (
  <Box
    component={Link}
    href="/"
    sx={{
      textDecoration: 'none',
      color: 'inherit',
      display: 'inline-flex',
      alignItems: 'center',
    }}
  >
    <Typography variant="h6" fontWeight={700}>
      AI Clothier
    </Typography>
  </Box>
);

export default Logo;
