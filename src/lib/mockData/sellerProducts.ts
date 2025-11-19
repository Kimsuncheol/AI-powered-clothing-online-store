import { SellerAnalyticsSummary, SellerProduct } from '@/src/types/product';

export const MOCK_SELLER_PRODUCTS: SellerProduct[] = [
  {
    id: 'prod_1',
    name: 'Essential Flex Hoodie',
    description: 'Premium cotton-blend hoodie designed for everyday performance.',
    price: 78,
    categories: ['Hoodies', 'Streetwear'],
    tags: ['hoodie', 'casual', 'flex'],
    status: 'active',
    stock: 120,
    variants: [
      { id: 'size', name: 'Size', options: ['S', 'M', 'L', 'XL'] },
      { id: 'color', name: 'Color', options: ['Black', 'Ash', 'Navy'] },
    ],
    images: ['https://placehold.co/320x320'],
    totalSales: 420,
    createdAt: '2024-01-10T12:00:00.000Z',
    updatedAt: '2024-05-02T08:32:00.000Z',
  },
  {
    id: 'prod_2',
    name: 'Studio Knit Set',
    description: 'Two-piece knit co-ord set popular with content creators.',
    price: 98,
    categories: ['Sets', 'Women'],
    tags: ['knit', 'set', 'studio'],
    status: 'draft',
    stock: 40,
    variants: [{ id: 'size', name: 'Size', options: ['XS', 'S', 'M', 'L'] }],
    images: ['https://placehold.co/320x320'],
    totalSales: 86,
    createdAt: '2024-02-14T16:00:00.000Z',
    updatedAt: '2024-04-20T10:45:00.000Z',
  },
  {
    id: 'prod_3',
    name: 'Serotonin Runner Sneakers',
    description: 'Lightweight sneakers with responsive foam and bold gradients.',
    price: 140,
    categories: ['Footwear', 'Athleisure'],
    tags: ['sneaker', 'running'],
    status: 'out_of_stock',
    stock: 0,
    variants: [
      { id: 'size', name: 'Size', options: ['7', '8', '9', '10', '11'] },
      { id: 'color', name: 'Color', options: ['Neon Fade', 'Monochrome'] },
    ],
    images: ['https://placehold.co/320x320'],
    totalSales: 233,
    createdAt: '2023-11-01T09:00:00.000Z',
    updatedAt: '2024-03-29T15:12:00.000Z',
  },
];

export const MOCK_SELLER_ANALYTICS: SellerAnalyticsSummary = {
  totalProducts: 28,
  totalSales: 67800,
  topProductName: 'Essential Flex Hoodie',
  topProductSales: 420,
};

export const MOCK_SELLER_CATEGORIES = Array.from(
  new Set(MOCK_SELLER_PRODUCTS.flatMap((product) => product.categories))
);
