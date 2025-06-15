import { Router } from 'express';
import { register, login, refresh, logout } from '../controllers/auth.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { validate } from '../utils/validate';
import { registerSchema, loginSchema } from '../validators/auth.validator';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.post('/register', validate(registerSchema), asyncHandler(register));
router.post('/login', validate(loginSchema), asyncHandler(login));
router.post('/refresh', authenticateJWT, asyncHandler(refresh));
router.post('/logout', authenticateJWT, asyncHandler(logout));

export const authRoutes = router; 