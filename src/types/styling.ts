export interface StylingConstraints {
  budgetMin: number;
  budgetMax: number;
  colors: string[];
  sizes: {
    top?: string;
    bottom?: string;
    shoes?: string;
  };
  season?: string;
}

export interface StylingRequest {
  occasion: string;
  style: string;
  freeText?: string;
  constraints: StylingConstraints;
  avatarId?: string | number;
  useProfilePreferences?: boolean;
  styleRiskLevel?: 'safe' | 'normal' | 'bold';
}

export interface StylingItem {
  id: string | number;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  productUrl: string;
}

export interface OutfitRecommendation {
  id: string;
  title: string;
  summary: string;
  items: StylingItem[];
  totalPrice: number;
  explanation: string;
  avatarPreviewUrl?: string;
}

export interface StylingHistoryItem {
  id: string;
  createdAt: string;
  request: StylingRequest;
  outfit: OutfitRecommendation;
}
