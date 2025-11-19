import { client } from './client';
import { Order, CreateOrderRequest } from '@/src/types/order';

export const ordersApi = {
  createOrder: (data: CreateOrderRequest) => 
    client.post<Order>('/orders', data),

  capturePayment: (orderId: string, paymentId: string) => 
    client.post<Order>(`/orders/${orderId}/capture`, { paymentId }),

  getOrder: (orderId: string) => 
    client.get<Order>(`/orders/${orderId}`),
};
