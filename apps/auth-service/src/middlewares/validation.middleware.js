"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileValidation = exports.loginValidation = exports.registrationValidation = exports.handleValidationErrors = void 0;
const express_validator_1 = require("express-validator");
// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        // Return 400 Bad Request with validation errors
        res.status(400).json({ errors: errors.array() });
        return; // Explicitly return after sending response
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;
// Validation schema for user registration (POST /auth/register)
exports.registrationValidation = [
    (0, express_validator_1.body)('name').isString().notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Valid email is required'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    // Role validation: check if it's one of the allowed roles (e.g., 'customer', 'vendor', 'admin')
    // You might fetch allowed roles from a config or database if dynamic.
    (0, express_validator_1.body)('role').isIn(['customer', 'vendor', 'admin']).withMessage('Invalid user role'),
];
// Validation schema for user login (POST /auth/login)
exports.loginValidation = [
    (0, express_validator_1.body)('email').isEmail().withMessage('Valid email is required'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required'),
];
// Validation schema for user profile update (PUT /users/profile or /users/me)
// Fields are optional for updates
exports.updateProfileValidation = [
    (0, express_validator_1.body)('name').optional().isString().notEmpty().withMessage('Name must be a non-empty string'),
    // If email or role updates are allowed via this endpoint, add validation here
    // body('email').optional().isEmail().withMessage('Valid email is required'),
    // body('role').optional().isIn(['customer', 'vendor', 'admin']).withMessage('Invalid user role'),
];
// Add other validation schemas for forgotten password, reset password, etc. as needed 
