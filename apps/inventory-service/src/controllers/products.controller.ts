import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { getAllProducts as getAllProductsService, createProduct as createProductService, getProductById as getProductByIdService, updateProduct as updateProductService, deleteProduct as deleteProductService } from '../services/products.service';
import { CreateProductBody, UpdateProductBody } from '../types/product.types';
import { NotFoundError, ForbiddenError, ConflictError, ValidationError, handleError } from "../utils/errorHandlers"; // Import custom errors and helper

/**
 * Controller for GET /products - Get a list of all products.
 * This is a public endpoint handled by the API Gateway.
 */
export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('GET /products', req.query);
    // Query parameters are validated by validation.middleware.ts
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const search = req.query.search as string | undefined;
    const category = req.query.category as string | undefined;
    const vendorId = req.query.vendorId as string | undefined; // Allow filtering by vendorId
    const minPrice = req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined;
    const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined;
    // Convert string 'true'/'false' to boolean, handle undefined
    const inStock = req.query.inStock !== undefined ? req.query.inStock === 'true' : undefined;

    const products = await getAllProductsService(page, limit, search, category, vendorId, minPrice, maxPrice, inStock);
    res.status(200).json(products);
  } catch (error) {
    // Use handleError for consistent error responses
    handleError(res, 'Failed to fetch products', error);
  }
};

/**
 * Controller for POST /products - Create a new product.
 * Requires authentication and vendor/admin role (handled by service).
 */
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  // Validation results are handled by handleValidationErrors middleware before reaching here
  // const errors = validationResult(req); if (!errors.isEmpty()) { ... handled by middleware ... }

  try {
    console.log('POST /products', req.body);

    // Extract userId and userRole from headers forwarded by API Gateway
    const userId = req.headers['x-user-id'] as string | undefined;
    const userRole = req.headers['x-user-role'] as string | undefined; // Assuming role is a string

    // Basic check for required headers (authentication is done by API Gateway middleware)
    if (!userId || !userRole) {
      // This case should ideally be caught by API Gateway's auth middleware,
      // but adding a safeguard is good practice.
      return handleError(res, 'Unauthorized', new ForbiddenError('User information not provided in headers.'), 403); // Use Forbidden as auth middleware should have run
    }

    const productData: CreateProductBody = req.body;

    // Call the service function to create the product
    const newProduct = await createProductService(productData, userId, userRole);

    res.status(201).json(newProduct);

  } catch (error) {
    // Use handleError to catch custom errors and return appropriate responses
    handleError(res, 'Failed to create product', error);
  }
};

/**
 * Controller for GET /products/:productId - Get product by ID.
 * This is a public endpoint handled by the API Gateway.
 */
export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
   // Validation results for productId param are handled by middleware
  try {
    console.log('GET /products/:productId', req.params.productId);
    const { productId } = req.params;

    const product = await getProductByIdService(productId as string);

    res.status(200).json(product);

  } catch (error) {
    // Use handleError to catch custom errors (like NotFoundError) and return appropriate responses
    handleError(res, 'Failed to fetch product', error);
  }
};

/**
 * Controller for PUT /products/:productId - Update a product.
 * Requires authentication and product ownership (vendor) or admin role (handled by service).
 */
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
   // Validation results are handled by middleware
  try {
    console.log('PUT /products/:productId', req.params.productId, req.body);

    // Extract userId and userRole from headers forwarded by API Gateway
    const userId = req.headers['x-user-id'] as string | undefined;
    const userRole = req.headers['x-user-role'] as string | undefined; // Assuming role is a string

     // Basic check for required headers
    if (!userId || !userRole) {
        return handleError(res, 'Unauthorized', new ForbiddenError('User information not provided in headers.'), 403); // Use Forbidden
    }

    const { productId } = req.params;
    const updateData: UpdateProductBody = req.body;

    // Call the service function to update the product
    const updatedProduct = await updateProductService(productId as string, updateData, userId, userRole);

    res.status(200).json(updatedProduct);

  } catch (error) {
    // Use handleError to catch custom errors (like NotFoundError, ForbiddenError) and return appropriate responses
    handleError(res, 'Failed to update product', error);
  }
};

/**
 * Controller for DELETE /products/:productId - Delete a product.
 * Requires authentication and product ownership (vendor) or admin role (handled by service).
 */
export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    // Validation results are handled by middleware
    try {
        console.log('DELETE /products/:productId', req.params.productId);

        // Extract userId and userRole from headers forwarded by API Gateway
        const userId = req.headers['x-user-id'] as string | undefined;
        const userRole = req.headers['x-user-role'] as string | undefined; // Assuming role is a string

        // Basic check for required headers
        if (!userId || !userRole) {
            return handleError(res, 'Unauthorized', new ForbiddenError('User information not provided in headers.'), 403); // Use Forbidden
        }

        const { productId } = req.params;

        // Call the service function to delete the product
        await deleteProductService(productId as string, userId, userRole);

        res.status(204).send(); // Successful deletion, no content

    } catch (error) {
        // Use handleError to catch custom errors (like NotFoundError, ForbiddenError) and return appropriate responses
        handleError(res, 'Failed to delete product', error);
    }
}; 