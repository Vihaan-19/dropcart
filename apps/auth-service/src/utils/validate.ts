import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from './error';

declare global {
  namespace Express {
    interface Request {
      validatedBody?: any;
    }
  }
}

export const validate = (schema: ZodSchema, source: 'body' | 'query' | 'params' = 'body') => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);
    
    if (!result.success) {
      return next(new ValidationError('Validation failed', result.error.errors));
    }

    req.validatedBody = result.data;
    next();
  };
}; 