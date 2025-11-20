import { client } from './client';

export interface SearchHistoryItem {
  id: string;
  keyword: string;
  destination: string;
}

export interface SearchSuggestion {
  keyword: string;
  destination: string;
}

export const searchApi = {
  getHistory: () => client.get<SearchHistoryItem[]>('/search/history'),
  deleteHistory: (id: string) => client.delete<void>(`/search/history/${id}`),
  getSuggestions: (query: string, signal?: AbortSignal) =>
    client.get<SearchSuggestion[]>(`/search/suggest?q=${encodeURIComponent(query)}`, { signal }),
};
