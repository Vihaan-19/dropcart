import { z } from 'zod';

export const orderItemSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().min(1),
});

export const createOrderSchema = z.object({
  items: z.array(orderItemSchema).min(1),
  shippingAddress: z.record(z.any()),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum([
    'PENDING',
    'PROCESSING',
    'SHIPPED',
    'DELIVERED',
    'COMPLETED',
    'CANCELLED',
  ]),
});

export const orderQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  status: z.string().optional(),
}); 