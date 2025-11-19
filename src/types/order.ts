import { CartItem } from './cart';

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'failed';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  shippingAddress?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderRequest {
  items: CartItem[];
  shippingAddress?: string;
}
