'use client';

import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { usePathname } from 'next/navigation';
import Header from './Header';

const HIDE_HEADER_ROUTES = ['/auth/signin', '/auth/signup'];

interface HeaderVisibilityProps {
  children: ReactNode;
}

export const HeaderVisibility = ({ children }: HeaderVisibilityProps) => {
  const pathname = usePathname();
  const hideHeader = HIDE_HEADER_ROUTES.some((route) => pathname.startsWith(route));

  return (
    <Box>
      {!hideHeader && <Header />}
      {children}
    </Box>
  );
};

export default HeaderVisibility;
