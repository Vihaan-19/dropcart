import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    role: string;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: string;
      };
      validatedBody?: any;
    }
  }
} 