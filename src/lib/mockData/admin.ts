import {
  AdminOrder,
  AdminOrderDetail,
  AdminProduct,
  AdminProductStatus,
  AdminUser,
  AdminUserStatus,
} from '@/src/types/admin';

export const MOCK_ADMIN_USERS: AdminUser[] = [
  {
    id: 'user_1',
    email: 'lena@storefront.com',
    name: 'Lena Gomez',
    role: 'seller',
    status: 'active',
    createdAt: '2023-08-11T10:00:00.000Z',
    lastLoginAt: '2024-05-01T08:30:00.000Z',
  },
  {
    id: 'user_2',
    email: 'jack@buyers.co',
    name: 'Jack Mendez',
    role: 'buyer',
    status: 'deactivated',
    createdAt: '2022-12-02T12:00:00.000Z',
    lastLoginAt: '2024-04-14T15:12:00.000Z',
  },
  {
    id: 'user_3',
    email: 'sarah@moda.ai',
    name: 'Sarah Malik',
    role: 'admin',
    status: 'active',
    createdAt: '2021-02-20T09:00:00.000Z',
  },
];

export const MOCK_ADMIN_PRODUCTS: AdminProduct[] = [
  {
    id: 'prod_a',
    name: 'Tonal Trail Jacket',
    sellerName: 'Lena Gomez',
    sellerEmail: 'lena@storefront.com',
    status: 'pending',
    createdAt: '2024-05-30T12:00:00.000Z',
    description: 'Hybrid tech shell awaiting approval.',
  },
  {
    id: 'prod_b',
    name: 'Midnight Runner',
    sellerName: 'Carbon Labs',
    sellerEmail: 'ops@carbonlabs.io',
    status: 'approved',
    createdAt: '2024-04-28T09:21:00.000Z',
    description: 'Flagship sneaker collaboration.',
  },
  {
    id: 'prod_c',
    name: 'Studio Linen Set',
    sellerName: 'Nova Collective',
    sellerEmail: 'buyers@novacollective.ai',
    status: 'hidden',
    createdAt: '2024-03-18T14:45:00.000Z',
  },
];

export const MOCK_ADMIN_ORDERS: AdminOrder[] = [
  {
    id: 'order_101',
    buyerEmail: 'jack@buyers.co',
    totalAmount: 248,
    status: 'paid',
    createdAt: '2024-05-29T11:12:00.000Z',
  },
  {
    id: 'order_102',
    buyerEmail: 'sam@creators.fyi',
    totalAmount: 560,
    status: 'disputed',
    createdAt: '2024-05-28T08:40:00.000Z',
  },
  {
    id: 'order_103',
    buyerEmail: 'maya@inspo.ai',
    totalAmount: 132,
    status: 'refunded',
    createdAt: '2024-05-26T16:05:00.000Z',
  },
];

export const MOCK_ADMIN_ORDER_DETAILS: Record<string, AdminOrderDetail> = {
  order_101: {
    ...MOCK_ADMIN_ORDERS[0],
    items: [
      { productId: 'prod_b', name: 'Midnight Runner', quantity: 1, price: 220 },
      { productId: 'prod_c', name: 'Studio Linen Top', quantity: 1, price: 28 },
    ],
    paymentMethod: 'card',
    shippingAddress: '211 7th Ave, NYC',
  },
  order_102: {
    ...MOCK_ADMIN_ORDERS[1],
    items: [{ productId: 'prod_a', name: 'Tonal Trail Jacket', quantity: 2, price: 280 }],
    paymentMethod: 'card',
    disputes: [
      { id: 'disp_12', openedAt: '2024-05-29T10:00:00.000Z', reason: 'Incorrect size delivered' },
    ],
  },
  order_103: {
    ...MOCK_ADMIN_ORDERS[2],
    items: [{ productId: 'prod_c', name: 'Studio Linen Set', quantity: 1, price: 132 }],
    paymentMethod: 'paypal',
  },
};

export const getMockAdminUsers = (status?: AdminUserStatus) =>
  status ? MOCK_ADMIN_USERS.filter((user) => user.status === status) : MOCK_ADMIN_USERS;

export const getMockAdminProducts = (status?: AdminProductStatus) =>
  status ? MOCK_ADMIN_PRODUCTS.filter((product) => product.status === status) : MOCK_ADMIN_PRODUCTS;
