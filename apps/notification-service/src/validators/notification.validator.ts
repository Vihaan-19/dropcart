import { z } from 'zod';

export const notificationSchema = z.object({
  type: z.enum(['EMAIL', 'SMS', 'PUSH', 'WS']),
  message: z.string().min(1),
  recipientEmail: z.string().email().optional(),
  recipientPhone: z.string().optional(),
  userId: z.string().optional(),
  relatedOrderId: z.string().optional(),
}); 