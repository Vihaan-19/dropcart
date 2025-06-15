import { Request, Response, NextFunction } from 'express';
import { body, validationResult, ValidationChain } from 'express-validator';
import { AnyZodObject, ZodError } from 'zod';
import { ValidationError } from '../utils/error';

// Middleware to handle validation errors
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return 400 Bad Request with validation errors
    res.status(400).json({ errors: errors.array() });
    return; // Explicitly return after sending response
  }
  next();
};

// Validation schema for user registration (POST /auth/register)
export const registrationValidation: ValidationChain[] = [
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  // Role validation: check if it's one of the allowed roles (e.g., 'CUSTOMER', 'VENDOR', 'ADMIN')
  // You might fetch allowed roles from a config or database if dynamic.
  body('role').isIn(['CUSTOMER', 'VENDOR', 'ADMIN']).withMessage('Invalid user role')
];

// Validation schema for user login (POST /auth/login)
export const loginValidation: ValidationChain[] = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Validation schema for user profile update (PUT /users/profile or /users/me)
// Fields are optional for updates
export const updateProfileValidation: ValidationChain[] = [
  body('name').optional().isString().notEmpty().withMessage('Name must be a non-empty string'),
  // If email or role updates are allowed via this endpoint, add validation here
  // body('email').optional().isEmail().withMessage('Valid email is required'),
  // body('role').optional().isIn(['customer', 'vendor', 'admin']).withMessage('Invalid user role'),
];

// Add other validation schemas for forgotten password, reset password, etc. as needed

export const validate = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        }));
        next(new ValidationError(JSON.stringify(errors)));
      } else {
        next(error);
      }
    }
  };
}; 