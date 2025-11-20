'use client';

import { useState, MouseEvent } from 'react';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/navigation';
import { User } from '@/src/types/auth';

interface UserAvatarMenuProps {
  user: User;
  onSignOut: () => Promise<void>;
}

const UserAvatarMenu = ({ user, onSignOut }: UserAvatarMenuProps) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleAccountNavigation = () => {
    router.push('/account');
    handleClose();
  };

  const handleSignOut = async () => {
    await onSignOut();
    handleClose();
  };

  const avatarFallback = user.email ? user.email.charAt(0).toUpperCase() : '?';

  return (
    <>
      <IconButton onClick={handleOpen} size="small" aria-label="account menu">
        <Avatar src={user.avatarUrl ?? undefined}>{avatarFallback}</Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleAccountNavigation}>Account</MenuItem>
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </Menu>
    </>
  );
};

export default UserAvatarMenu;
