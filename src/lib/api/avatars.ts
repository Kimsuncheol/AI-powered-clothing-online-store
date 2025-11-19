import { client } from './client';
import { AvatarPreset, AvatarRenderRequest, AvatarRenderResponse } from '@/src/types/avatars';

export const avatarsApi = {
  fetchAvatarPresets: () =>
    client.get<AvatarPreset[]>('/avatars/presets'),

  renderAvatarPreview: (payload: AvatarRenderRequest) =>
    client.post<AvatarRenderResponse>('/ai/avatars/render', payload),

  // Keep the old one for backward compatibility if needed, or remove it if we replace all usages
  renderAvatar: (payload: { productId: string; avatarId: string }) =>
    client.post<{ imageUrl: string }>('/ai/avatars/render', {
      productId: payload.productId,
      avatarPresetId: payload.avatarId,
      imageCount: 1
    }),
};
