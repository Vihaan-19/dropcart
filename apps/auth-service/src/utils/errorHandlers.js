"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.ConflictError = exports.ForbiddenError = exports.UnauthorizedError = exports.NotFoundError = void 0;
exports.handleError = handleError;
// Define custom error classes
class NotFoundError extends Error {
    constructor(message = 'Resource not found') {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404;
    }
}
exports.NotFoundError = NotFoundError;
class UnauthorizedError extends Error {
    constructor(message = 'Authentication required') {
        super(message);
        this.name = 'UnauthorizedError';
        this.statusCode = 401;
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends Error {
    constructor(message = 'Permission denied') {
        super(message);
        this.name = 'ForbiddenError';
        this.statusCode = 403;
    }
}
exports.ForbiddenError = ForbiddenError;
class ConflictError extends Error {
    constructor(message = 'Resource already exists') {
        super(message);
        this.name = 'ConflictError';
        this.statusCode = 409;
    }
}
exports.ConflictError = ConflictError;
class ValidationError extends Error {
    constructor(message = 'Validation failed', errors) {
        super(message);
        this.name = 'ValidationError';
        this.statusCode = 400;
        this.errors = errors;
    }
}
exports.ValidationError = ValidationError;
// Helper for consistent error responses - can be updated to handle custom errors
function handleError(res, message, err, code = 500) {
    console.error(message, err); // Log the error on the server side
    let statusCode = code;
    let errorResponse = { error: message };
    if (err instanceof Error) {
        // If it's one of our custom errors, use its status code and potentially details
        if (err instanceof NotFoundError || err instanceof UnauthorizedError || err instanceof ForbiddenError || err instanceof ConflictError) {
            statusCode = err.statusCode;
            errorResponse.error = err.message; // Use the specific error message
        }
        else if (err instanceof ValidationError) {
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
