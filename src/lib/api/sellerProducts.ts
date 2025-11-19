import { client } from './client';
import {
  PaginatedResponse,
  SellerAnalyticsSummary,
  SellerProduct,
  SellerProductFilters,
  SellerProductPayload,
} from '@/src/types/product';

const buildQueryString = (filters: SellerProductFilters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      params.append(key, String(value));
    }
  });
  return params.toString();
};

export const sellerProductsApi = {
  getProducts: (filters: SellerProductFilters = {}) => {
    const queryString = buildQueryString(filters);
    const endpoint = queryString ? `/seller/products?${queryString}` : '/seller/products';
    return client.get<PaginatedResponse<SellerProduct>>(endpoint);
  },

  getProduct: (id: string) => client.get<SellerProduct>(`/seller/products/${id}`),

  createProduct: (payload: SellerProductPayload) =>
    client.post<SellerProduct>('/seller/products', payload),

  updateProduct: (id: string, payload: SellerProductPayload) =>
    client.put<SellerProduct>(`/seller/products/${id}`, payload),

  getAnalytics: () => client.get<SellerAnalyticsSummary>('/seller/products/analytics'),

  getCategories: () => client.get<string[]>('/seller/products/categories'),
};
