import { Router, Request, Response, NextFunction } from 'express';
import { register, login, refresh, logout } from '../controllers/authController';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { asyncHandler } from '../utils/asyncHandler';
import { registrationValidation, loginValidation, handleValidationErrors } from '../middlewares/validation.middleware';

const authRouter = Router();

// Middleware to convert role to uppercase before validation
const uppercaseRole = (req: Request, _res: Response, next: NextFunction) => {
  if (req.body.role && typeof req.body.role === 'string') {
    req.body.role = req.body.role.toUpperCase();
  }
  next();
};

// POST /auth/register
authRouter.post('/register', uppercaseRole, registrationValidation, handleValidationErrors, asyncHandler(register));

// POST /auth/login
authRouter.post('/login', loginValidation, handleValidationErrors, asyncHandler(login));

// POST /auth/refresh
authRouter.post('/refresh', authenticateJWT, asyncHandler(refresh));

// POST /auth/logout
authRouter.post('/logout', authenticateJWT, asyncHandler(logout));

export default authRouter;
