const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

interface RequestOptions extends RequestInit {
    headers?: Record<string, string>;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;

    const defaultHeaders = {
        'Content-Type': 'application/json',
    };

    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };

    try {
        const response = await fetch(url, config);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `API Error: ${response.statusText}`);
        }

        // Handle 204 No Content
        if (response.status === 204) {
            return {} as T;
        }

        return response.json();
    } catch (error) {
        console.error('API Request Failed:', error);
        throw error;
    }
}

export const client = {
    get: <T>(endpoint: string, options?: RequestOptions) =>
        request<T>(endpoint, { ...options, method: 'GET' }),

    post: <T>(endpoint: string, body: any, options?: RequestOptions) =>
        request<T>(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),

    put: <T>(endpoint: string, body: any, options?: RequestOptions) =>
        request<T>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),

    delete: <T>(endpoint: string, options?: RequestOptions) =>
        request<T>(endpoint, { ...options, method: 'DELETE' }),
};
