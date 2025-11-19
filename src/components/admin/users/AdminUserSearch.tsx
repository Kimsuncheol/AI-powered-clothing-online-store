'use client';

import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface AdminUserSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const AdminUserSearch: React.FC<AdminUserSearchProps> = ({ value, onChange }) => {
  return (
    <TextField
      placeholder="Search users by email or name"
      fullWidth
      value={value}
      onChange={(event) => onChange(event.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};
