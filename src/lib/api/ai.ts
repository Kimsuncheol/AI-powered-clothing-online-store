import { client } from './client';

export interface StylistChatRequest {
    productId?: string;
    message: string;
}

export interface StylistChatResponse {
    reply: string;
}

export const aiApi = {
    askStylist: (data: StylistChatRequest) =>
        client.post<StylistChatResponse>('/ai/stylist/chat', data),
};
