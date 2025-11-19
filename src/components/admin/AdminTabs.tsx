'use client';

import React from 'react';
import { Tabs, Tab } from '@mui/material';

interface AdminTabsProps {
  value: string;
  onChange: (value: string) => void;
}

const tabs = [
  { value: 'users', label: 'Users' },
  { value: 'products', label: 'Products' },
  { value: 'orders', label: 'Orders' },
];

export const AdminTabs: React.FC<AdminTabsProps> = ({ value, onChange }) => {
  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    onChange(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto">
      {tabs.map((tab) => (
        <Tab key={tab.value} label={tab.label} value={tab.value} />
      ))}
    </Tabs>
  );
};
