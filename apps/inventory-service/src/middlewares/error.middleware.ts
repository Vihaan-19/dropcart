import { Request, Response, NextFunction } from 'express';
import { NotFoundError, ForbiddenError, ConflictError, ValidationError } from "../utils/errorHandlers"; // Import custom errors

// Global error handling middleware
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled Error:', err); // Log the unhandled error on the server side

  let statusCode = 500; // Default to Internal Server Error
  let message = 'Internal Server Error';
  let details: any | undefined = undefined; // Explicitly type details

  if (err instanceof Error) {
    // Check if it's one of our custom errors
    if (err instanceof NotFoundError || err instanceof ForbiddenError || err instanceof ConflictError) {
      statusCode = err.statusCode;
      message = err.message;
    } else if (err instanceof ValidationError) {
       statusCode = err.statusCode;
       message = err.message;
       if (err.errors) { // Include validation errors if available
           details = err.errors; // details is now typed to accept this
       }
    } else {
        // For other standard Errors or unexpected errors, keep default 500 and generic message
        // In development, you might want to send more error details/stack trace.
        if (process.env.NODE_ENV === 'development') {
            // console.error(err.stack); // Log stack trace in dev
            // message = err.message; // Optionally send specific message for unexpected errors in dev
        }
    }
  }

  // Ensure response is not already sent
  if (res.headersSent) {
        return next(err); // Let default Express error handling take over if headers already sent
  }

  res.status(statusCode).json({
    error: message,
    ...(details ? { details: details } : {}), // Fix spread operator error
    // Optionally include stack trace in development
    // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
 