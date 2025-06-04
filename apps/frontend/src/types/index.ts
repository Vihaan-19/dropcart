// Common types used across the application

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: 'user' | 'vendor' | 'admin';
  emailVerified?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  costPerItem?: number;
  sku?: string;
  barcode?: string;
  quantity: number;
  weight?: number;
  weightUnit?: 'g' | 'kg' | 'lb' | 'oz';
  categoryId: string;
  vendorId: string;
  status: 'draft' | 'active' | 'archived';
  images: string[];
  tags: string[];
  options: ProductOption[];
  variants: ProductVariant[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface ProductVariant {
  id: string;
  option1?: string;
  option2?: string;
  option3?: string;
  price: number;
  compareAtPrice?: number;
  sku?: string;
  barcode?: string;
  quantity: number;
  weight?: number;
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId: string | null;
  image?: string;
  order: number;
  isActive: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
  product: Pick<Product, 'id' | 'name' | 'images'>;
  variant?: Pick<ProductVariant, 'id' | 'option1' | 'option2' | 'option3'>;
}

export interface Cart {
  id: string;
  userId: string | null;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  paymentStatus: 'pending' | 'authorized' | 'paid' | 'partially_refunded' | 'refunded' | 'voided';
  fulfillmentStatus: 'unfulfilled' | 'partially_fulfilled' | 'fulfilled' | 'returned';
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  shippingAddress: Address;
  billingAddress: Address;
  items: OrderItem[];
  transactions: Transaction[];
  customerNote?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  shippingMethod?: string;
  paymentMethod: string;
  paidAt?: Date;
  fulfilledAt?: Date;
  cancelledAt?: Date;
  refundedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
  compareAtPrice?: number;
  tax: number;
  discount: number;
  total: number;
  product: Pick<Product, 'id' | 'name' | 'images'>;
  variant?: Pick<ProductVariant, 'id' | 'option1' | 'option2' | 'option3'>;
}

export interface Transaction {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'failed' | 'refunded' | 'voided';
  processor: 'stripe' | 'paypal' | 'manual' | string;
  processorTransactionId?: string;
  paymentMethod: string;
  paymentMethodDetails?: Record<string, any>;
  refundedAmount?: number;
  refundReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
  type: 'shipping' | 'billing';
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  title?: string;
  comment?: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: Pick<User, 'id' | 'name' | 'image'>;
}

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
  product: Pick<Product, 'id' | 'name' | 'price' | 'images'>;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  [key: string]: any;
}

// Form types
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface CheckoutFormData {
  email: string;
  shippingAddress: Omit<Address, 'id' | 'userId' | 'isDefault' | 'type' | 'createdAt' | 'updatedAt'>;
  billingAddressSameAsShipping: boolean;
  billingAddress?: Omit<Address, 'id' | 'userId' | 'isDefault' | 'type' | 'createdAt' | 'updatedAt'>;
  shippingMethod: string;
  paymentMethod: string;
  saveInfo: boolean;
  notes?: string;
}

// Component props
export interface LayoutProps {
  children: React.ReactNode;
}

export interface PageProps {
  params: Record<string, string>;
  searchParams: Record<string, string | string[] | undefined>;
}

// API response types
export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface ErrorResponse {
  statusCode: number;
  message: string;
  error?: string;
  errors?: Record<string, string[]>;
}

// Utility types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type ValueOf<T> = T[keyof T];

// Enums
export enum UserRole {
  USER = 'user',
  VENDOR = 'vendor',
  ADMIN = 'admin',
}

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

export enum PaymentStatus {
  PENDING = 'pending',
  AUTHORIZED = 'authorized',
  PAID = 'paid',
  PARTIALLY_REFUNDED = 'partially_refunded',
  REFUNDED = 'refunded',
  VOIDED = 'voided',
}

export enum FulfillmentStatus {
  UNFULFILLED = 'unfulfilled',
  PARTIALLY_FULFILLED = 'partially_fulfilled',
  FULFILLED = 'fulfilled',
  RETURNED = 'returned',
}

export enum TransactionStatus {
  PENDING = 'pending',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  VOIDED = 'voided',
}

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    ME: '/auth/me',
  },
  USERS: {
    BASE: '/users',
    ME: '/users/me',
    ADDRESSES: '/users/me/addresses',
    ADDRESS: (id: string) => `/users/me/addresses/${id}`,
  },
  PRODUCTS: {
    BASE: '/products',
    FEATURED: '/products/featured',
    POPULAR: '/products/popular',
    RELATED: (id: string) => `/products/${id}/related`,
    REVIEWS: (id: string) => `/products/${id}/reviews`,
  },
  CATEGORIES: {
    BASE: '/categories',
    TREE: '/categories/tree',
    PRODUCTS: (id: string) => `/categories/${id}/products`,
  },
  CARTS: {
    BASE: '/carts',
    MY_CART: '/carts/my-cart',
    ITEMS: (cartId: string) => `/carts/${cartId}/items`,
    ITEM: (cartId: string, itemId: string) => `/carts/${cartId}/items/${itemId}`,
  },
  ORDERS: {
    BASE: '/orders',
    MY_ORDERS: '/orders/my-orders',
    TRACK: (id: string) => `/orders/${id}/track`,
    CANCEL: (id: string) => `/orders/${id}/cancel`,
    RETURN: (id: string) => `/orders/${id}/return`,
  },
  WISHLIST: {
    BASE: '/wishlist',
    ITEM: (productId: string) => `/wishlist/${productId}`,
  },
  REVIEWS: {
    BASE: '/reviews',
    PRODUCT: (productId: string) => `/reviews/product/${productId}`,
  },
  UPLOAD: {
    IMAGE: '/upload/image',
  },
  PAYMENT: {
    CREATE_INTENT: '/payment/create-intent',
    CONFIRM: '/payment/confirm',
  },
} as const;
