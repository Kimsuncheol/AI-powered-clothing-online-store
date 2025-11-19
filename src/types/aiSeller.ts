export interface AiSellerChatRequest {
  userMessage: string;
  conversationId?: string;
  productId?: number | string;
}

export interface AiSellerChatResponse {
  replyText: string;
  conversationId: string;
  suggestedTitle?: string;
  suggestedDescription?: string;
  suggestedTags?: string[];
}

export type AiSellerMessageRole = 'user' | 'assistant';

export interface AiSellerAssistantMessage {
  id: string;
  role: AiSellerMessageRole;
  content: string;
  createdAt: string;
  productId?: string | number;
  suggestions?: {
    title?: string;
    description?: string;
    tags?: string[];
  };
}

export interface GenerateDescriptionRequest {
  name: string;
  categories: string[];
  tags?: string[];
  brief?: string;
}

export interface GenerateDescriptionResponse {
  description: string;
}

export interface GenerateTagsRequest {
  name: string;
  description?: string;
  categories?: string[];
}

export interface GenerateTagsResponse {
  tags: string[];
  categories?: string[];
}
