'use client';

import { useMemo, useState, useCallback, useRef } from 'react';
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
import { useTheme } from '@mui/material/styles';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useAuth } from '@/src/hooks/useAuth';
import AppearanceToggle from './AppearanceToggle';
import SearchModal from '@/src/components/search/SearchModal';
import AvatarMenu from './AvatarMenu';

const Header = () => {
  const theme = useTheme();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const searchAnchorRef = useRef<HTMLDivElement | null>(null);
  const avatarAnchorRef = useRef<HTMLDivElement | null>(null);

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

  const handleOpenSearch = useCallback(() => {
    setSearchOpen(true);
  }, []);

  const handleCloseSearch = useCallback(() => {
    setSearchOpen(false);
  }, []);

  const handleAvatarClick = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return (
    <>
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
          <Box ref={searchAnchorRef} sx={{ flex: 1, maxWidth: 400 }}>
            <TextField
              size="small"
              placeholder="Search for clothes..."
              onClick={handleOpenSearch}
              onFocus={handleOpenSearch}
              inputProps={{ readOnly: true }}
              sx={{ width: '100%', cursor: 'pointer' }}
            />
          </Box>
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
              <Box ref={avatarAnchorRef}>
                <Avatar sx={{ width: 32, height: 32, cursor: 'pointer' }} onClick={handleAvatarClick}>
                  {initials || 'U'}
                </Avatar>
              </Box>
              <IconButton sx={{ color: theme.palette.text.primary }} aria-label="Shopping cart">
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
      <SearchModal open={searchOpen} anchorEl={searchAnchorRef.current} onClose={handleCloseSearch} />
      <AvatarMenu open={menuOpen} anchorEl={avatarAnchorRef.current} onClose={handleCloseMenu} />
    </>
  );
};

export default Header;
