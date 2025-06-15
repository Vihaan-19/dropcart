import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { Prisma } from '@prisma/client';
import { HTTP_STATUS } from '../config/constants';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

export const PRISMA_ERRORS = {
  UNIQUE_CONSTRAINT: 'P2002',
  RECORD_NOT_FOUND: 'P2025',
  FOREIGN_KEY_CONSTRAINT: 'P2003',
  REQUIRED_FIELD: 'P2011',
} as const;

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string) {
    super(message, 401, 'UNAUTHORIZED');
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, 'CONFLICT');
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400, 'VALIDATION_ERROR');
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404, 'NOT_FOUND');
  }
}

type ErrorResponse = {
  success: false;
  message: string;
  details?: any;
};

export const errorHandler: ErrorRequestHandler = (
  err: Error | Prisma.PrismaClientKnownRequestError | JsonWebTokenError | TokenExpiredError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: err.message,
      code: err.code,
      status: err.statusCode,
    });
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case PRISMA_ERRORS.UNIQUE_CONSTRAINT:
        res.status(HTTP_STATUS.CONFLICT).json({
          success: false,
          message: 'A record with this value already exists'
        } as ErrorResponse);
        return;
      case PRISMA_ERRORS.RECORD_NOT_FOUND:
        res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: 'Record not found'
        } as ErrorResponse);
        return;
      case PRISMA_ERRORS.FOREIGN_KEY_CONSTRAINT:
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: 'Invalid reference to related record'
        } as ErrorResponse);
        return;
      case PRISMA_ERRORS.REQUIRED_FIELD:
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: 'Required field is missing'
        } as ErrorResponse);
        return;
    }
  }

  if (err instanceof JsonWebTokenError) {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: 'Invalid token'
    } as ErrorResponse);
    return;
  }

  if (err instanceof TokenExpiredError) {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: 'Token has expired'
    } as ErrorResponse);
    return;
  }

  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: 'Internal server error',
    ...(process.env.NODE_ENV !== 'production' && { details: err.message })
  } as ErrorResponse);
};

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    message: 'Not found'
  } as ErrorResponse);
}; 