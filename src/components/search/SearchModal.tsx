'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import type { MouseEvent } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Typography,
  Divider,
  TextField,
  Paper,
  Popper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';
import { searchApi, type SearchHistoryItem, type SearchSuggestion } from '@/src/lib/api/search';

interface SearchModalProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

const HISTORY_LIMIT = 20;
const SUGGESTIONS_LIMIT = 10;
const DEBOUNCE_MS = 300;

const SearchModal = ({ open, anchorEl, onClose }: SearchModalProps) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);

  const fetchHistory = useCallback(async () => {
    try {
      const data = await searchApi.getHistory();
      setHistory(data.slice(0, HISTORY_LIMIT));
    } catch (error) {
      console.error('Failed to fetch search history', error);
    }
  }, []);

  useEffect(() => {
    if (open) {
      fetchHistory();
    } else {
      setQuery('');
      setSuggestions([]);
    }
  }, [open, fetchHistory]);

  useEffect(() => {
    if (!open) return;

    const trimmed = query.trim();
    if (!trimmed) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      try {
        const data = await searchApi.getSuggestions(trimmed, controller.signal);
        setSuggestions(data.slice(0, SUGGESTIONS_LIMIT));
      } catch (error) {
        if ((error as Error).name === 'AbortError') return;
        console.error('Failed to fetch search suggestions', error);
      }
    }, DEBOUNCE_MS);

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, [query, open]);

  const handleNavigate = useCallback(
    (destination: string) => {
      router.push(destination);
      onClose();
    },
    [onClose, router],
  );

  const handleDelete = useCallback(async (event: MouseEvent, id: string) => {
    event.stopPropagation();
    setHistory((prev) => prev.filter((item) => item.id !== id));
    try {
      await searchApi.deleteHistory(id);
    } catch (error) {
      console.error('Failed to delete search history', error);
    }
  }, []);

  const hasSuggestions = useMemo(() => suggestions.length > 0 && query.trim().length > 0, [suggestions, query]);

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="bottom-start"
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
      <Paper
        sx={{
          width: { xs: '90vw', sm: 420, md: '30vw' },
          minWidth: 320,
          maxWidth: 600,
          aspectRatio: '3 / 1',
          p: 1.5,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          bgcolor: 'background.paper',
          boxShadow: 6,
          borderRadius: 2,
        }}
        elevation={6}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography id="search-modal-title" variant="h6" fontWeight={700}>
            Search
          </Typography>
          <IconButton aria-label="Close search" size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <TextField
          size="small"
          placeholder="Search for clothes..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          autoFocus
        />

        {hasSuggestions && (
          <>
            <Typography variant="subtitle2" color="text.secondary">
              Suggestions
            </Typography>
            <List dense sx={{ maxHeight: 160, overflowY: 'auto' }}>
              {suggestions.map((suggestion, index) => (
                <ListItem
                  key={`${suggestion.keyword}-${index}`}
                  disablePadding
                >
                  <ListItemButton onClick={() => handleNavigate(suggestion.destination)}>
                    <ListItemText primary={suggestion.keyword} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
          </>
        )}

        <Typography variant="subtitle2" color="text.secondary">
          Recent searches
        </Typography>
        <List dense sx={{ flex: 1, overflowY: 'auto' }}>
          {history.length === 0 ? (
            <ListItem>
              <ListItemText primary="No recent searches" />
            </ListItem>
          ) : (
            history.map((item) => (
              <ListItem
                key={item.id}
                secondaryAction={
                  <IconButton edge="end" aria-label="Delete" onClick={(event) => handleDelete(event, item.id)}>
                    <CloseIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton onClick={() => handleNavigate(item.destination)}>
                  <ListItemText primary={item.keyword} />
                </ListItemButton>
              </ListItem>
            ))
          )}
        </List>
      </Paper>
    </Popper>
  );
};

export default SearchModal;
