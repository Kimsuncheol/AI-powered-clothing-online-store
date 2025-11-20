'use client';

import { IconButton, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ComputerIcon from '@mui/icons-material/Computer';
import { useAppearance } from '@/src/context/AppearanceContext';

const AppearanceToggle = () => {
  const { mode, cycleMode } = useAppearance();
  const theme = useTheme();
  const iconColor = theme.palette.text.primary;

  const renderIcon = () => {
    if (mode === 'light') return <LightModeIcon htmlColor={iconColor} fontSize="small" />;
    if (mode === 'dark') return <DarkModeIcon htmlColor={iconColor} fontSize="small" />;
    return <ComputerIcon htmlColor={iconColor} fontSize="small" />;
  };

  return (
    <Tooltip title={`Appearance: ${mode}`}>
      <IconButton onClick={cycleMode} aria-label="Toggle appearance">
        {renderIcon()}
      </IconButton>
    </Tooltip>
  );
};

export default AppearanceToggle;
