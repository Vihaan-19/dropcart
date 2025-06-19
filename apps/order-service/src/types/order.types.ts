export type OrderStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'COMPLETED'
  | 'CANCELLED';

export interface OrderItemInput {
  productId: string;
  quantity: number;
}

export interface CreateOrderInput {
  items: OrderItemInput[];
  shippingAddress: Record<string, any>;
}

export interface UpdateOrderStatusInput {
  status: OrderStatus;
}

export interface OrderQuery {
  page?: number;
  limit?: number;
  status?: OrderStatus;
}

export interface PaginatedOrders {
  orders: any[];
  total: number;
  page: number;
  limit: number;
} 