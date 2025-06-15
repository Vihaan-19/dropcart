import { Router } from 'express';
import { getMe, updateProfile } from '../controllers/user.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { validate } from '../utils/validate';
import { updateProfileSchema } from '../validators/user.validator';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.get('/me', authenticateJWT, asyncHandler(getMe));
router.put('/profile', authenticateJWT, validate(updateProfileSchema), asyncHandler(updateProfile));

export const userRoutes = router; 