export type AvatarStyleParams = Record<string, string | number | boolean | string[]>;

export interface AvatarPreset {
  id: number | string;
  name: string;
  tags: string[];
  notes?: string;
  thumbnailUrl?: string;
  parameters: AvatarStyleParams;
}

export interface AvatarRenderRequest {
  productId?: number | string;
  avatarPresetId: number | string;
  styleParams?: AvatarStyleParams;
  imageCount?: number;
}

export interface AvatarRenderResponse {
  requestId: string;
  imageUrls: string[];
}
