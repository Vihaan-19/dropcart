import { Response } from 'express';

// Define custom error classes
export class NotFoundError extends Error {
  statusCode: number;
  constructor(message = 'Resource not found') {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

export class UnauthorizedError extends Error {
  statusCode: number;
  constructor(message = 'Authentication required') {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = 401;
  }
}

export class ForbiddenError extends Error {
  statusCode: number;
  constructor(message = 'Permission denied') {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = 403;
  }
}

export class ConflictError extends Error {
  statusCode: number;
  constructor(message = 'Resource already exists') {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = 409;
  }
}

export class ValidationError extends Error {
  statusCode: number;
  errors?: any[]; // Optional field to hold express-validator results
  constructor(message = 'Validation failed', errors?: any[]) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
    this.errors = errors;
  }
}

// Helper for consistent error responses - can be updated to handle custom errors
export function handleError(res: Response, message: string, err: unknown, code = 500) {
  console.error(message, err); // Log the error on the server side

  let statusCode = code;
  let errorResponse: any = { error: message };

  if (err instanceof Error) {
    // If it's one of our custom errors, use its status code and potentially details
    if (err instanceof NotFoundError || err instanceof UnauthorizedError || err instanceof ForbiddenError || err instanceof ConflictError) {
      statusCode = err.statusCode;
      errorResponse.error = err.message; // Use the specific error message
    } else if (err instanceof ValidationError) {
       statusCode = err.statusCode;
       errorResponse.error = err.message; // Use the specific error message
       if (err.errors) { // Include validation errors if available
           errorResponse.details = err.errors;
       }
    }
     // For other standard Errors, you might log details but send a generic client message
     // ...(process.env.NODE_ENV !== 'production' && { details: err.message }),
  }

  // Optionally add original error message in development for debugging
  if (process.env.NODE_ENV !== 'production' && err instanceof Error) {
      errorResponse.originalError = err.message;
  }

  return res.status(statusCode).json(errorResponse);
} 