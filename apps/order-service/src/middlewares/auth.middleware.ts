import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { HTTP_STATUS } from '../config/constants';

export interface AuthRequest extends Request {
  user?: { userId: string; role: string };
}

export function authenticateJWT(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Unauthorized' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, config.jwtSecret) as { userId: string; role: string };
    req.user = payload;
    next();
  } catch (err) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Unauthorized' });
  }
} 