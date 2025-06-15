import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { getInventoryDetails as getInventoryDetailsService, updateProductStock as updateProductStockService, getInventoryLogs as getInventoryLogsService } from '../services/inventory.service';
import { UpdateProductStockBody } from '../types/inventory.types';
import { NotFoundError, ForbiddenError, ValidationError, handleError } from "../utils/errorHandlers";

/**
 * Controller for GET /inventory/:productId - Get product inventory details.
 * Requires authentication and product ownership (vendor) or admin role (handled by service).
 */
export const getInventoryDetails = async (req: Request, res: Response, next: NextFunction) => {
  // Validation results for productId param are handled by middleware
  try {
    console.log('GET /inventory/:productId', req.params.productId);

    // Extract userId and userRole from headers forwarded by API Gateway
    const userId = req.headers['x-user-id'] as string | undefined;
    const userRole = req.headers['x-user-role'] as string | undefined; // Assuming role is a string

    // Basic check for required headers (authentication is done by API Gateway middleware)
    if (!userId || !userRole) {
        // Use Forbidden as auth middleware should have run
        return handleError(res, 'Unauthorized', new ForbiddenError('User information not provided in headers.'), 403); // Use Forbidden
    }

    const { productId } = req.params;

    // Call the service function to get inventory details
    const inventoryDetails = await getInventoryDetailsService(productId as string, userId, userRole);

    res.status(200).json(inventoryDetails);

  } catch (error) {
    // Use handleError to catch custom errors (like NotFoundError, ForbiddenError) and return appropriate responses
    handleError(res, 'Failed to fetch inventory details', error);
  }
};

/**
 * Controller for PUT /inventory/:productId - Update product stock.
 * Requires authentication and product ownership (vendor) or admin role (handled by service).
 */
export const updateProductStock = async (req: Request, res: Response, next: NextFunction) => {
   // Validation results are handled by middleware
  try {
    console.log('PUT /inventory/:productId', req.params.productId, req.body);

    // Extract userId and userRole from headers forwarded by API Gateway
    const userId = req.headers['x-user-id'] as string | undefined;
    const userRole = req.headers['x-user-role'] as string | undefined; // Assuming role is a string

     // Basic check for required headers
    if (!userId || !userRole) {
        return handleError(res, 'Unauthorized', new ForbiddenError('User information not provided in headers.'), 403); // Use Forbidden
    }

    const { productId } = req.params;
    const updateData: UpdateProductStockBody = req.body;

    // Call the service function to update the product stock
    const updatedInventory = await updateProductStockService(productId as string, updateData, userId, userRole);

    res.status(200).json(updatedInventory);

  } catch (error) {
    // Use handleError to catch custom errors (like NotFoundError, ForbiddenError, ValidationError) and return appropriate responses
    handleError(res, 'Failed to update product stock', error);
  }
};

/**
 * Controller for GET /inventory/logs/:productId - Get inventory change logs.
 * Requires authentication and product ownership (vendor) or admin role (handled by service).
 */
export const getInventoryLogs = async (req: Request, res: Response, next: NextFunction) => {
    // Validation results are handled by middleware
    try {
        console.log('GET /inventory/:productId/logs', req.params.productId, req.query);

        // Extract userId and userRole from headers forwarded by API Gateway
        const userId = req.headers['x-user-id'] as string | undefined;
        const userRole = req.headers['x-user-role'] as string | undefined; // Assuming role is a string

        // Basic check for required headers
        if (!userId || !userRole) {
            return handleError(res, 'Unauthorized', new ForbiddenError('User information not provided in headers.'), 403); // Use Forbidden
        }

        const { productId } = req.params;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        // Call the service function to get inventory logs
        const inventoryLogs = await getInventoryLogsService(productId as string, userId, userRole, page, limit);

        res.status(200).json(inventoryLogs);

    } catch (error) {
        // Use handleError to catch custom errors (like NotFoundError, ForbiddenError) and return appropriate responses
        handleError(res, 'Failed to fetch inventory logs', error);
    }
}; 