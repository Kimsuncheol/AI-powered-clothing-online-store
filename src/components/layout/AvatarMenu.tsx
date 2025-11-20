'use client';

import React from 'react';
import {
  Paper,
  Popper,
  ClickAwayListener,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/hooks/useAuth';

interface AvatarMenuProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

const AvatarMenu = ({ open, anchorEl, onClose }: AvatarMenuProps) => {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const isAdmin = Boolean(user?.roles?.includes('admin') || user?.role === 'admin');
  const isSeller = Boolean(user?.roles?.includes('seller') || user?.role === 'seller');

  const handleNavigate = (path: string) => {
    router.push(path);
    onClose();
  };

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="bottom-end"
      disablePortal={false}
      style={{ zIndex: 1300 }}
      modifiers={[
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
      ]}
    >
      <ClickAwayListener onClickAway={onClose}>
        <Paper
          sx={{ minWidth: 240 }}
          onMouseDown={(e) => e.stopPropagation()}
          onMouseUp={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          elevation={4}
        >
          <List dense>
            <ListItem>
              <ListItemText
                primary={user?.name || user?.email || 'User'}
                secondary={user?.email}
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigate('/profile')}>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
            {isAdmin && (
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleNavigate('/admin')}>
                  <ListItemText primary="Admin Dashboard" />
                </ListItemButton>
              </ListItem>
            )}
            {isSeller && (
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleNavigate('/seller')}>
                  <ListItemText primary="Seller Dashboard" />
                </ListItemButton>
              </ListItem>
            )}
            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={handleSignOut}>
                <ListItemText primary="Sign Out" />
              </ListItemButton>
            </ListItem>
          </List>
        </Paper>
      </ClickAwayListener>
    </Popper>
  );
};

export default AvatarMenu;
