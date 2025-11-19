export interface ProductSummary {
  id: string;
  title: string;
  price: number;
  image: string;
}

export interface AiStylistMessage {
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
  recommendations?: ProductSummary[];
}

export interface AiStylistChatRequest {
  userMessage: string;
  conversationId?: string;
  productId?: string;
}

export interface AiStylistChatResponse {
  replyText: string;
  conversationId: string;
  recommendations?: ProductSummary[];
}
