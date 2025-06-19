import { z } from 'zod';

export const processPaymentSchema = z.object({
  orderId: z.string().uuid(),
  method: z.enum(['CREDIT_CARD', 'DEBIT_CARD', 'PAYPAL', 'STRIPE']),
  amount: z.number().positive(),
});

export const refundPaymentSchema = z.object({
  paymentId: z.string().uuid(),
  amount: z.number().positive().optional(),
}); 