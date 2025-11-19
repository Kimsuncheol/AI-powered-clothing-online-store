export interface Product {
    id: string;
    title: string;
    price: number;
    images: string[];
    category: string;
    description: string;
    sizes: string[];
    colors: string[];
    stock: number;
    seller: {
        id: string;
        name: string;
        rating?: number;
    };
    gender: 'men' | 'women' | 'unisex';
    brand: string;
    createdAt: string;
}

export interface ProductFilters {
    category?: string;
    size?: string;
    color?: string;
    price_min?: number;
    price_max?: number;
    gender?: string;
    brand?: string;
    seller?: string;
    sort?: string;
    page?: number;
    search?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export type SellerProductStatus = 'draft' | 'active' | 'out_of_stock' | 'archived';

export interface SellerProductVariant {
    id: string;
    name: string;
    options: string[];
}

export interface SellerProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    categories: string[];
    tags?: string[];
    status: SellerProductStatus;
    stock: number;
    variants: SellerProductVariant[];
    images: string[];
    totalSales?: number;
    createdAt: string;
    updatedAt?: string;
}

export interface SellerProductFilters {
    search?: string;
    status?: SellerProductStatus;
    category?: string;
    page?: number;
    limit?: number;
}

export type SellerProductPayload = Omit<SellerProduct, 'id' | 'createdAt' | 'updatedAt' | 'totalSales'>;

export interface SellerAnalyticsSummary {
    totalProducts: number;
    totalSales: number;
    topProductName?: string;
    topProductSales?: number;
}
