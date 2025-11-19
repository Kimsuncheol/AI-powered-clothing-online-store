import { client } from './client';
import { AiStylistChatRequest, AiStylistChatResponse, AiStylistMessage } from '@/src/types/ai';

export const aiStylistApi = {
  sendMessage: (data: AiStylistChatRequest) => 
    client.post<AiStylistChatResponse>('/ai/stylist/chat', data),

  getHistory: (conversationId: string) => 
    client.get<AiStylistMessage[]>(`/ai/stylist/history?conversationId=${conversationId}`),
};
