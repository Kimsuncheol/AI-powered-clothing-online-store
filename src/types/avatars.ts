export interface AvatarPreset {
  id: number | string;
  name: string;
  tags: string[];
  notes?: string;
  thumbnailUrl?: string;
  parameters: Record<string, any>;
}

export interface AvatarRenderRequest {
  productId?: number | string;
  avatarPresetId: number | string;
  styleParams?: Record<string, any>;
  imageCount?: number;
}

export interface AvatarRenderResponse {
  requestId: string;
  imageUrls: string[];
}
