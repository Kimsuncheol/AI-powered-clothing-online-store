'use client';

import { useState } from 'react';
import { TextField } from '@mui/material';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  return (
    <TextField
      size="small"
      placeholder="Search for clothes..."
      value={query}
      onChange={(event) => setQuery(event.target.value)}
      sx={{ minWidth: 240, flex: 1 }}
      fullWidth
    />
  );
};

export default SearchBar;
