'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useAuth } from '@/src/hooks/useAuth';
import AppearanceToggle from './AppearanceToggle';

const Header = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [searchValue, setSearchValue] = useState('');

  const initials = useMemo(() => {
    if (!user) return '';
    if (user.name) {
      return user.name
        .split(' ')
        .map((part) => part.charAt(0))
        .join('')
        .slice(0, 2)
        .toUpperCase();
    }
    return user.email.charAt(0).toUpperCase();
  }, [user]);

  const handleNavigateToSignIn = () => {
    router.push('/auth/signin');
  };

  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 16px',
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flex: 1,
        }}
      >
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Typography variant="h6" fontWeight={700} color="text.primary">
            AI Clothing
          </Typography>
        </Link>
        <TextField
          size="small"
          placeholder="Search for clothes..."
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          sx={{ flex: 1, maxWidth: 400 }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <AppearanceToggle />
        {isAuthenticated && user ? (
          <>
            <Avatar sx={{ width: 32, height: 32 }}>{initials}</Avatar>
            <IconButton color="inherit" aria-label="Shopping cart">
              <ShoppingCartOutlinedIcon />
            </IconButton>
          </>
        ) : (
          <Button variant="text" onClick={handleNavigateToSignIn}>
            Sign in
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Header;
