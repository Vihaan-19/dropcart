import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['ADMIN', 'VENDOR', 'CUSTOMER'])
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export const refreshSchema = z.object({
  token: z.string()
}); 