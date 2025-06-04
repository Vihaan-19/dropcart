import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { getUserById, updateUser } from '../services/userService'; // Import service functions
import { handleError } from '../utils/errorHandlers'; // Import error handler utility

export async function getMe(req: Request, res: Response): Promise<void> {
  const { user } = req as AuthRequest;

  // Authentication middleware should handle this, but add a safeguard
  if (!user || !user.userId) {
     handleError(res, 'Unauthorized', null, 401);
     return;
  }

  try {
    // Use the service function to fetch the user
    const dbUser = await getUserById(user.userId);

    res.json({ user: dbUser });
  } catch (err: any) {
    // Use the error handler utility
    handleError(res, 'Failed to fetch user', err);
  }
}

export async function updateProfile(req: Request, res: Response): Promise<void> {
  const { user } = req as AuthRequest;

   // Authentication middleware should handle this, but add a safeguard
   if (!user || !user.userId) {
      handleError(res, 'Unauthorized', null, 401);
      return;
   }

  // Validation middleware should have ensured basic validity, extract validated data
  // Assuming validation.middleware.ts handles the allowed update fields (name, role)
  const { name, role } = req.body; // Get potentially updated fields from validated body

  // Build update data object, only include fields that are present in the request body
  const updateData: { name?: string, role?: string } = {};
  if (name !== undefined) updateData.name = name;
  if (role !== undefined) updateData.role = role;

  // Ensure at least one field is provided for update, although validation middleware might handle this
  if (Object.keys(updateData).length === 0) {
     handleError(res, 'No update fields provided', null, 400);
     return;
  }

  try {
    // Use the service function to update the user
    const updatedUser = await updateUser(user.userId, updateData);

    res.json({ user: updatedUser });
  } catch (err: any) {
    // Use the error handler utility
    handleError(res, 'Failed to update user', err);
  }
}

// TODO: Add other controller functions for user management as needed 