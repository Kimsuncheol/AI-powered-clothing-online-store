'use client';

import { IconButton, Tooltip } from '@mui/material';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import { useAppearance } from '@/src/context/AppearanceContext';

const LABELS = ['Light', 'Dark', 'System'];

const icons = [
  <WbSunnyOutlinedIcon key="light" fontSize="small" />,
  <DarkModeOutlinedIcon key="dark" fontSize="small" />,
  <ComputerOutlinedIcon key="system" fontSize="small" />,
];

const AppearanceToggle = () => {
  const { modeIndex, cycleMode } = useAppearance();
  const label = LABELS[modeIndex] ?? LABELS[0];

  return (
    <Tooltip title={`Appearance: ${label}`}>
      <IconButton color="inherit" onClick={cycleMode} aria-label="Toggle appearance">
        {icons[modeIndex] ?? icons[0]}
      </IconButton>
    </Tooltip>
  );
};

export default AppearanceToggle;
