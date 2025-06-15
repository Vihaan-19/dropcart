import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
} 