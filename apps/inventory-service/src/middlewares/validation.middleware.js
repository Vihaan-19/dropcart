"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInventoryLogsValidation = exports.updateProductStockValidation = exports.getInventoryDetailsValidation = exports.deleteProductValidation = exports.updateProductValidation = exports.getProductByIdValidation = exports.getAllProductsValidation = exports.createProductValidation = exports.getAllVendorsValidation = exports.getVendorByIdValidation = exports.updateMyStoreValidation = exports.createVendorValidation = exports.handleValidationErrors = void 0;
const express_validator_1 = require("express-validator");
// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return; // Explicitly return after sending response
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;
// Validation schema for POST /vendors (Create vendor profile)
exports.createVendorValidation = [
    (0, express_validator_1.body)('storeName').isString().notEmpty().withMessage('storeName is required'),
    (0, express_validator_1.body)('contactInfo').isObject().withMessage('contactInfo must be an object'), // Basic check, can be more detailed
];
// Validation schema for PUT /vendors/my-store (Update vendor store)
exports.updateMyStoreValidation = [
    (0, express_validator_1.body)('storeName').optional().isString().notEmpty().withMessage('storeName must be a non-empty string'),
    (0, express_validator_1.body)('contactInfo').optional().isObject().withMessage('contactInfo must be an object'), // Basic check, can be more detailed
];
// Validation schema for GET /vendors/{vendorId} (Get vendor by ID) - only path param validation
exports.getVendorByIdValidation = [
    (0, express_validator_1.param)('vendorId').isUUID().withMessage('vendorId must be a valid UUID'),
];
// Validation schema for GET /vendors (Get all vendors) - query param validation
exports.getAllVendorsValidation = [
    (0, express_validator_1.query)('page').optional().isInt({ gt: 0 }).withMessage('page must be a positive integer'),
    (0, express_validator_1.query)('limit').optional().isInt({ gt: 0 }).withMessage('limit must be a positive integer'),
    (0, express_validator_1.query)('search').optional().isString().withMessage('search must be a string'),
];
// Validation schema for POST /products (Create a new product)
exports.createProductValidation = [
    (0, express_validator_1.body)('name').isString().notEmpty().withMessage('name is required'),
    (0, express_validator_1.body)('price').isFloat({ gt: 0 }).withMessage('price must be a positive number'),
    (0, express_validator_1.body)('stockQty').isInt({ gt: -1 }).withMessage('stockQty must be a non-negative integer'),
    (0, express_validator_1.body)('description').isString().notEmpty().withMessage('description is required'),
    (0, express_validator_1.body)('category').optional().isString().withMessage('category must be a string'),
    (0, express_validator_1.body)('images').optional().isArray().withMessage('images must be an array'), // Assuming images is an array of URLs or similar
];
// Validation schema for GET /products (Get all products) - query param validation
exports.getAllProductsValidation = [
    (0, express_validator_1.query)('page').optional().isInt({ gt: 0 }).withMessage('page must be a positive integer'),
    (0, express_validator_1.query)('limit').optional().isInt({ gt: 0 }).withMessage('limit must be a positive integer'),
    (0, express_validator_1.query)('search').optional().isString().withMessage('search must be a string'),
    (0, express_validator_1.query)('category').optional().isString().withMessage('category must be a string'),
    (0, express_validator_1.query)('vendorId').optional().isUUID().withMessage('vendorId must be a valid UUID'),
    (0, express_validator_1.query)('minPrice').optional().isFloat({ gt: -1 }).withMessage('minPrice must be a non-negative number'),
    (0, express_validator_1.query)('maxPrice').optional().isFloat({ gt: -1 }).withMessage('maxPrice must be a non-negative number'),
    (0, express_validator_1.query)('inStock').optional().isBoolean().withMessage('inStock must be a boolean'),
];
// Validation schema for GET /products/{productId} (Get product by ID) - path param validation
exports.getProductByIdValidation = [
    (0, express_validator_1.param)('productId').isUUID().withMessage('productId must be a valid UUID'),
];
// Validation schema for PUT /products/{productId} (Update product)
exports.updateProductValidation = [
    (0, express_validator_1.param)('productId').isUUID().withMessage('productId must be a valid UUID'),
    (0, express_validator_1.body)('name').optional().isString().notEmpty().withMessage('name must be a non-empty string'),
    (0, express_validator_1.body)('price').optional().isFloat({ gt: 0 }).withMessage('price must be a positive number'),
    (0, express_validator_1.body)('stockQty').optional().isInt({ gt: -1 }).withMessage('stockQty must be a non-negative integer'),
    (0, express_validator_1.body)('description').optional().isString().notEmpty().withMessage('description must be a non-empty string'),
    (0, express_validator_1.body)('category').optional().isString().withMessage('category must be a string'),
    (0, express_validator_1.body)('images').optional().isArray().withMessage('images must be an array'), // Assuming images is an array
];
// Validation schema for DELETE /products/{productId} (Delete product) - path param validation
exports.deleteProductValidation = [
    (0, express_validator_1.param)('productId').isUUID().withMessage('productId must be a valid UUID'),
];
// Validation schema for GET /inventory/{productId} (Get product inventory details) - path param validation
exports.getInventoryDetailsValidation = [
    (0, express_validator_1.param)('productId').isUUID().withMessage('productId must be a valid UUID'),
];
// Validation schema for PUT /inventory/{productId} (Update product stock)
exports.updateProductStockValidation = [
    (0, express_validator_1.param)('productId').isUUID().withMessage('productId must be a valid UUID'),
    (0, express_validator_1.body)('changeQty').isInt().withMessage('changeQty must be an integer'), // Can be positive or negative
    (0, express_validator_1.body)('reason').isString().notEmpty().withMessage('reason is required'),
];
// Validation schema for GET /inventory/logs/{productId} (Get inventory change logs) - path and query param validation
exports.getInventoryLogsValidation = [
    (0, express_validator_1.param)('productId').isUUID().withMessage('productId must be a valid UUID'),
    (0, express_validator_1.query)('page').optional().isInt({ gt: 0 }).withMessage('page must be a positive integer'),
    (0, express_validator_1.query)('limit').optional().isInt({ gt: 0 }).withMessage('limit must be a positive integer'),
];
