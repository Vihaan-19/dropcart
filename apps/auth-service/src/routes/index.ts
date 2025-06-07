import { Router, Request, Response } from 'express';
import authRouter from './auth';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { getMe, updateProfile } from '../controllers/userController';
import { asyncHandler } from '../utils/asyncHandler';
import { updateProfileValidation, handleValidationErrors } from '../middlewares/validation.middleware';

const router = Router();

// Health check for the Auth Service (accessible via /auth/api/health through API Gateway)
router.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'auth-service', timestamp: new Date().toISOString() });
});

router.use('/auth', authRouter);

router.get('/users/me', authenticateJWT, asyncHandler(getMe));

router.put('/users/me', authenticateJWT, updateProfileValidation, handleValidationErrors, asyncHandler(updateProfile));

export default router; 