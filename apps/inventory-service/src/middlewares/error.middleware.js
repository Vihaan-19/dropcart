"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
// Basic error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    const statusCode = err.statusCode || 500; // Default to 500 Internal Server Error
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        message: message,
        // Optionally include error details in development
        // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
};
exports.errorHandler = errorHandler;
