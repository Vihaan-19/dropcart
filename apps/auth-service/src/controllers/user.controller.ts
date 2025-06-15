import { Response } from 'express';
import { getUserById, updateProfile as updateUserProfile } from '../services/user.service';
import { asyncHandler } from '../utils/asyncHandler';
import { AuthenticatedRequest } from '../types/express';

export const getMe = asyncHandler<AuthenticatedRequest>(async (req, res) => {
  const user = await getUserById(req.user.userId);
  res.status(200).json({
    success: true,
    data: { user }
  });
});

export const updateProfile = asyncHandler<AuthenticatedRequest>(async (req, res) => {
  const user = await updateUserProfile(req.user.userId, req.body);
  res.status(200).json({
    success: true,
    data: { user }
  });
}); 