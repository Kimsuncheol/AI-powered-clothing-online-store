import { client } from './client';
import { AdminOrder, AdminOrderDetail, AdminPaginatedResponse, AdminOrderStatus } from '@/src/types/admin';

interface FetchAdminOrdersParams {
  status?: AdminOrderStatus | 'all';
  page?: number;
}

export const adminOrdersApi = {
  fetchOrders: (params: FetchAdminOrdersParams = {}) => {
    const query = new URLSearchParams();
    if (params.status && params.status !== 'all') query.append('status', params.status);
    if (params.page) query.append('page', params.page.toString());
    const endpoint = query.toString() ? `/admin/orders?${query.toString()}` : '/admin/orders';
    return client.get<AdminPaginatedResponse<AdminOrder>>(endpoint);
  },

  fetchOrderDetail: (orderId: string | number) =>
    client.get<AdminOrderDetail>(`/admin/orders/${orderId}`),

  resolveDispute: (orderId: string | number, resolution: string) =>
    client.post<AdminOrderDetail>(`/admin/orders/${orderId}/resolve`, { resolution }),
};
