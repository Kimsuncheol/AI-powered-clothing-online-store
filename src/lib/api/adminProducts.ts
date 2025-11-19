import { client } from './client';
import { AdminPaginatedResponse, AdminProduct, AdminProductStatus } from '@/src/types/admin';

interface FetchAdminProductsParams {
  status?: AdminProductStatus | 'all';
  search?: string;
  page?: number;
}

type AdminProductAction = 'approve' | 'hide' | 'flag';

export const adminProductsApi = {
  fetchProducts: (params: FetchAdminProductsParams = {}) => {
    const query = new URLSearchParams();
    if (params.status && params.status !== 'all') query.append('status', params.status);
    if (params.search) query.append('search', params.search);
    if (params.page) query.append('page', params.page.toString());
    const endpoint = query.toString() ? `/admin/products?${query.toString()}` : '/admin/products';
    return client.get<AdminPaginatedResponse<AdminProduct>>(endpoint);
  },

  fetchProductDetail: (productId: string | number) =>
    client.get<AdminProduct>(`/admin/products/${productId}`),

  updateProductStatus: (productId: string | number, action: AdminProductAction) =>
    client.post<AdminProduct>(`/admin/products/${productId}/${action}`, {}),
};
