export type AdminUserStatus = 'active' | 'deactivated' | 'banned';
export type AdminProductStatus = 'pending' | 'approved' | 'hidden' | 'flagged';
export type AdminOrderStatus = 'paid' | 'pending' | 'cancelled' | 'refunded' | 'disputed' | 'resolved';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'buyer' | 'seller' | 'admin';
  status: AdminUserStatus;
  createdAt: string;
  lastLoginAt?: string;
}

export interface AdminProduct {
  id: string;
  name: string;
  sellerName: string;
  sellerEmail: string;
  status: AdminProductStatus;
  createdAt: string;
  description?: string;
}

export interface AdminOrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface AdminOrder {
  id: string;
  buyerEmail: string;
  totalAmount: number;
  status: AdminOrderStatus;
  createdAt: string;
}

export interface AdminOrderDetail extends AdminOrder {
  items: AdminOrderItem[];
  paymentMethod: string;
  shippingAddress?: string;
  disputes?: {
    id: string;
    openedAt: string;
    reason: string;
  }[];
}

export interface AdminPaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}
