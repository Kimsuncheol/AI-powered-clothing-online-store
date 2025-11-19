import { Product } from './product';

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
}

export interface UpdateCartRequest {
  itemId: string;
  quantity: number;
}
