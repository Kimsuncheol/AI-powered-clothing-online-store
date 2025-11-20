'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import type { PaletteMode } from '@mui/material';

export type AppearanceMode = 'light' | 'dark' | 'system';

interface AppearanceContextValue {
  mode: AppearanceMode;
  modeIndex: number;
  resolvedMode: PaletteMode;
  setMode: (mode: AppearanceMode) => void;
  cycleMode: () => void;
}

const AppearanceContext = createContext<AppearanceContextValue | undefined>(undefined);

const STORAGE_KEY = 'appearance-mode';
const MODE_ORDER: AppearanceMode[] = ['light', 'dark', 'system'];

const getStoredMode = (): AppearanceMode => {
  if (typeof window === 'undefined') {
    return 'system';
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
};

export const AppearanceProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<AppearanceMode>('system');
  const [prefersDark, setPrefersDark] = useState(false);

  useEffect(() => {
    setMode(getStoredMode());
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => setPrefersDark(event.matches);

    setPrefersDark(media.matches);
    media.addEventListener('change', handleChange);

    return () => {
      media.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, mode);
    }
  }, [mode]);

  const cycleMode = useCallback(() => {
    setMode((prev) => {
      const currentIndex = MODE_ORDER.indexOf(prev);
      return MODE_ORDER[(currentIndex + 1) % MODE_ORDER.length];
    });
  }, []);

  const resolvedMode: PaletteMode = mode === 'system' ? (prefersDark ? 'dark' : 'light') : mode;
  const modeIndex = MODE_ORDER.indexOf(mode);

  const value = useMemo(
    () => ({
      mode,
      modeIndex,
      resolvedMode,
      setMode,
      cycleMode,
    }),
    [mode, modeIndex, resolvedMode, cycleMode],
  );

  return <AppearanceContext.Provider value={value}>{children}</AppearanceContext.Provider>;
};

export const useAppearance = () => {
  const context = useContext(AppearanceContext);
  if (!context) {
    throw new Error('useAppearance must be used within an AppearanceProvider');
  }

  return context;
};
