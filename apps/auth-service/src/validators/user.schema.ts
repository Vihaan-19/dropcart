import { z } from 'zod';

export const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  role: z.enum(['ADMIN', 'VENDOR', 'CUSTOMER']).optional()
}); 