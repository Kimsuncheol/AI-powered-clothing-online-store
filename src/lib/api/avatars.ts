import { client } from './client';

export interface AvatarRenderRequest {
    productId: string;
    avatarId?: string; // Optional if using a default or specific avatar
    // Add other parameters as needed
}

export interface AvatarRenderResponse {
    imageUrl: string;
}

export const avatarsApi = {
    renderAvatar: (data: AvatarRenderRequest) =>
        client.post<AvatarRenderResponse>('/ai/avatars/render', data),
};
