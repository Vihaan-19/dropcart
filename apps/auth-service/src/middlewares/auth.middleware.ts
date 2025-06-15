import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { AUTH_ERRORS, HTTP_STATUS } from '../config/constants';

export interface AuthRequest extends Request {
  user?: { userId: string; role: string };
}

export function authenticateJWT(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: AUTH_ERRORS.UNAUTHORIZED });
    return;
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = verifyToken(token) as { userId: string; role: string };
    req.user = payload;
    next();
  } catch (err) {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: AUTH_ERRORS.UNAUTHORIZED });
  }
} 