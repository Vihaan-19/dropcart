import { Response } from 'express';
import { register as registerUser, login as loginUser, refreshToken } from '../services/auth.service';
import { asyncHandler } from '../utils/asyncHandler';
import { AuthenticatedRequest } from '../types/express';

export const register = asyncHandler<AuthenticatedRequest>(async (req, res) => {
  const result = await registerUser(req.body);
  res.status(201).json({
    success: true,
    data: result
  });
});

export const login = asyncHandler<AuthenticatedRequest>(async (req, res) => {
  const result = await loginUser(req.body);
  res.status(200).json({
    success: true,
    data: result
  });
});

export const refresh = asyncHandler<AuthenticatedRequest>(async (req, res) => {
  const token = await refreshToken(req.user.userId);
  res.status(200).json({
    success: true,
    data: { token }
  });
});

export const logout = asyncHandler<AuthenticatedRequest>(async (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logout successful'
  });
}); 