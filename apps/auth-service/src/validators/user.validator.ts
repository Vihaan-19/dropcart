import { z } from 'zod';

export const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').optional(),
    email: z.string().email('Invalid email address').optional(),
    currentPassword: z.string().min(1, 'Current password is required').optional(),
    newPassword: z.string().min(6, 'New password must be at least 6 characters').optional(),
  }).refine(
    (data) => {
      // If changing password, both current and new password are required
      if (data.newPassword && !data.currentPassword) {
        return false;
      }
      return true;
    },
    {
      message: 'Current password is required when setting a new password',
      path: ['currentPassword'],
    }
  ),
}); 