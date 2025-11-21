import { client } from './client';
import { StylingRequest, OutfitRecommendation, StylingHistoryItem } from '@/src/types/styling';

export const stylingApi = {
  generateOutfit: (data: StylingRequest) =>
    client.post<OutfitRecommendation[]>('/styling/recommendations', data),

  getHistory: () =>
    client.get<StylingHistoryItem[]>('/styling/history'),

  saveStyle: (outfit: OutfitRecommendation) =>
    client.post('/styling/history', { outfit }),
};
