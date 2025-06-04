import { Router } from 'express';
import authRouter from './auth';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { getMe, updateProfile } from '../controllers/userController';
import { asyncHandler } from '../utils/asyncHandler';
import { updateProfileValidation, handleValidationErrors } from '../middlewares/validation.middleware';

const router = Router();

router.use('/auth', authRouter);

router.get('/users/me', authenticateJWT, asyncHandler(getMe));

router.put('/users/me', authenticateJWT, updateProfileValidation, handleValidationErrors, asyncHandler(updateProfile));

export default router; 