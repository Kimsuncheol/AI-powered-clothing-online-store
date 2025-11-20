'use client';

import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { NextAppDirEmotionCacheProvider } from './EmotionCache';
import { Roboto } from 'next/font/google';
import { useAppearance } from '@/src/context/AppearanceContext';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const { resolvedMode } = useAppearance();

  const theme = React.useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: roboto.style.fontFamily,
        },
        palette: {
          mode: resolvedMode,
          primary: {
            main: '#1976d2',
          },
          secondary: {
            main: '#9c27b0',
          },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: (themeParam) => ({
              'html, body, #__next': {
                height: '100%',
              },
              body: {
                margin: 0,
                backgroundColor: themeParam.palette.background.default,
                color: themeParam.palette.text.primary,
              },
            }),
          },
        },
      }),
    [resolvedMode],
  );

  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
