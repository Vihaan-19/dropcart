import { Router } from 'express';
import { register, login, refresh, logout } from '../controllers/authController';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { asyncHandler } from '../utils/asyncHandler';
import { registrationValidation, loginValidation, handleValidationErrors } from '../middlewares/validation.middleware';

const authRouter = Router();

// POST /auth/register
authRouter.post('/register', registrationValidation, handleValidationErrors, asyncHandler(register));

// POST /auth/login
authRouter.post('/login', loginValidation, handleValidationErrors, asyncHandler(login));

// POST /auth/refresh
authRouter.post('/refresh', authenticateJWT, asyncHandler(refresh));

// POST /auth/logout
authRouter.post('/logout', authenticateJWT, asyncHandler(logout));

export default authRouter;
