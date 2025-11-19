import { client } from './client';
import { Cart, AddToCartRequest, UpdateCartRequest } from '@/src/types/cart';

export const cartApi = {
  getCart: () => 
    client.get<Cart>('/cart'),

  addToCart: (data: AddToCartRequest) => 
    client.post<Cart>('/cart/items', data),

  updateCartItem: (data: UpdateCartRequest) => 
    client.put<Cart>(`/cart/items/${data.itemId}`, { quantity: data.quantity }),

  removeFromCart: (itemId: string) => 
    client.delete<Cart>(`/cart/items/${itemId}`),

  clearCart: () => 
    client.delete<void>('/cart'),
};
