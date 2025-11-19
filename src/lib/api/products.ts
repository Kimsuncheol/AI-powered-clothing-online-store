import { client } from './client';
import { Product, ProductFilters, PaginatedResponse } from '@/src/types/product';

export const productsApi = {
    getProducts: (filters: ProductFilters) => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== '') {
                params.append(key, String(value));
            }
        });
        return client.get<PaginatedResponse<Product>>(`/products?${params.toString()}`);
    },

    getProduct: (id: string) =>
        client.get<Product>(`/products/${id}`),

    getCategories: () =>
        client.get<string[]>('/products/categories'),
};
