import { body, param, query, validationResult, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Middleware to handle validation errors
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return; // Explicitly return after sending response
  }
  next();
};

// Validation schema for POST /vendors (Create vendor profile)
export const createVendorValidation: ValidationChain[] = [
  body('storeName').isString().notEmpty().withMessage('storeName is required'),
  body('contactInfo').isObject().withMessage('contactInfo must be an object'), // TODO: Add more detailed validation for contactInfo fields
];

// Validation schema for PUT /vendors/my-store (Update vendor store)
export const updateMyStoreValidation: ValidationChain[] = [
  body('storeName').optional().isString().notEmpty().withMessage('storeName must be a non-empty string'),
  body('contactInfo').optional().isObject().withMessage('contactInfo must be an object'), // TODO: Add more detailed validation for contactInfo fields
];

// Validation schema for GET /vendors/{vendorId} (Get vendor by ID) - only path param validation
export const getVendorByIdValidation: ValidationChain[] = [
  param('vendorId').isUUID().withMessage('vendorId must be a valid UUID'),
];

// Validation schema for GET /vendors (Get all vendors) - query param validation
export const getAllVendorsValidation: ValidationChain[] = [
  query('page').optional().isInt({ gt: 0 }).withMessage('page must be a positive integer'),
  query('limit').optional().isInt({ gt: 0 }).withMessage('limit must be a positive integer'),
  query('search').optional().isString().withMessage('search must be a string'),
];

// Validation schema for POST /products (Create a new product)
export const createProductValidation: ValidationChain[] = [
  body('name').isString().notEmpty().withMessage('name is required'),
  body('price').isFloat({ gt: 0 }).withMessage('price must be a positive number'),
  body('stockQty').isInt({ gt: -1 }).withMessage('stockQty must be a non-negative integer'),
  body('description').isString().notEmpty().withMessage('description is required'),
  body('category').optional().isString().withMessage('category must be a string'),
  body('images').optional().isArray().withMessage('images must be an array'), // Assuming images is an array of URLs or similar
];

// Validation schema for GET /products (Get all products) - query param validation
export const getAllProductsValidation: ValidationChain[] = [
  query('page').optional().isInt({ gt: 0 }).withMessage('page must be a positive integer'),
  query('limit').optional().isInt({ gt: 0 }).withMessage('limit must be a positive integer'),
  query('search').optional().isString().withMessage('search must be a string'),
  query('category').optional().isString().withMessage('category must be a string'),
  query('vendorId').optional().isUUID().withMessage('vendorId must be a valid UUID'),
  query('minPrice').optional().isFloat({ gt: -1 }).withMessage('minPrice must be a non-negative number'),
  query('maxPrice').optional().isFloat({ gt: -1 }).withMessage('maxPrice must be a non-negative number'),
  query('inStock').optional().isBoolean().withMessage('inStock must be a boolean'),
];

// Validation schema for GET /products/{productId} (Get product by ID) - path param validation
export const getProductByIdValidation: ValidationChain[] = [
  param('productId').isUUID().withMessage('productId must be a valid UUID'),
];

// Validation schema for PUT /products/{productId} (Update product)
export const updateProductValidation: ValidationChain[] = [
  param('productId').isUUID().withMessage('productId must be a valid UUID'),
  body('name').optional().isString().notEmpty().withMessage('name must be a non-empty string'),
  body('price').optional().isFloat({ gt: 0 }).withMessage('price must be a positive number'),
  body('stockQty').optional().isInt({ gt: -1 }).withMessage('stockQty must be a non-negative integer'),
  body('description').optional().isString().notEmpty().withMessage('description must be a non-empty string'),
  body('category').optional().isString().withMessage('category must be a string'),
  body('images').optional().isArray().withMessage('images must be an array'), // Assuming images is an array
];

// Validation schema for DELETE /products/{productId} (Delete product) - path param validation
export const deleteProductValidation: ValidationChain[] = [
  param('productId').isUUID().withMessage('productId must be a valid UUID'),
];

// Validation schema for GET /inventory/{productId} (Get product inventory details) - path param validation
export const getInventoryDetailsValidation: ValidationChain[] = [
    param('productId').isUUID().withMessage('productId must be a valid UUID'),
];

// Validation schema for PUT /inventory/{productId} (Update product stock)
export const updateProductStockValidation: ValidationChain[] = [
  param('productId').isUUID().withMessage('productId must be a valid UUID'),
  body('changeQty').isInt().withMessage('changeQty must be an integer'), // Can be positive or negative
  body('reason').isString().notEmpty().withMessage('reason is required'),
];

// Validation schema for GET /inventory/logs/{productId} (Get inventory change logs) - path and query param validation
export const getInventoryLogsValidation: ValidationChain[] = [
    param('productId').isUUID().withMessage('productId must be a valid UUID'),
    query('page').optional().isInt({ gt: 0 }).withMessage('page must be a positive integer'),
    query('limit').optional().isInt({ gt: 0 }).withMessage('limit must be a positive integer'),
]; 