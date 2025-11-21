'use client';

import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useTheme } from '@mui/material/styles';
import Header from './Header';

const HIDE_HEADER_ROUTES = ['/auth/signin', '/auth/signup'];

interface HeaderVisibilityProps {
  children: ReactNode;
}

export const HeaderVisibility = ({ children }: HeaderVisibilityProps) => {
  const pathname = usePathname();
  const hideHeader = HIDE_HEADER_ROUTES.some((route) => pathname.startsWith(route));
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {!hideHeader && <Header />}
      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>
    </Box>
  );
};

export default HeaderVisibility;
