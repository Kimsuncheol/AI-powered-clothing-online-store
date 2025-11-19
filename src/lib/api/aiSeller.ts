import { client } from './client';
import {
  AiSellerChatRequest,
  AiSellerChatResponse,
  GenerateDescriptionRequest,
  GenerateDescriptionResponse,
  GenerateTagsRequest,
  GenerateTagsResponse,
} from '@/src/types/aiSeller';

export const aiSellerApi = {
  chat: (payload: AiSellerChatRequest) => client.post<AiSellerChatResponse>('/ai/seller/chat', payload),

  generateDescription: (payload: GenerateDescriptionRequest) =>
    client.post<GenerateDescriptionResponse>('/ai/seller/generate-description', payload),

  generateTags: (payload: GenerateTagsRequest) =>
    client.post<GenerateTagsResponse>('/ai/seller/generate-tags', payload),
};
