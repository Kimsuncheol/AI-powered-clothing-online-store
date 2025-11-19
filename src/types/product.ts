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
