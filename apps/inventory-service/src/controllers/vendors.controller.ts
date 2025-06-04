import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator'; // Import validationResult
import { createVendor as createVendorService, getVendorById as getVendorByIdService, getMyStore as getMyStoreService, updateMyStore as updateMyStoreService, getAllVendors as getAllVendorsService } from '../services/vendors.service';
import { CreateVendorBody, UpdateMyStoreBody } from '../types/vendor.types';
import { NotFoundError, ForbiddenError, ConflictError, ValidationError, handleError } from "../utils/errorHandlers"; // Import custom errors and helper

/**
 * Controller for GET /vendors - Get a list of all vendors.
 * This is a public endpoint handled by the API Gateway.
 */
export const getAllVendors = async (req: Request, res: Response, next: NextFunction) => {
  // Validation results are handled by handleValidationErrors middleware before reaching here
  // const errors = validationResult(req); if (!errors.isEmpty()) { ... handled by middleware ... }

  try {
    console.log('GET /vendors', req.query);
    // Query parameters are validated by validation.middleware.ts
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string | undefined;

    // Call the service function to get all vendors
    const vendors = await getAllVendorsService(page, limit, search);

    res.status(200).json(vendors);
  } catch (error) {
    // Use handleError for consistent error responses
    handleError(res, 'Failed to fetch vendors', error);
  }
};

/**
 * Controller for POST /vendors - Create a new vendor profile.
 * Requires authentication (handled by API Gateway) and possibly specific role (handled by service).
 */
export const createVendor = async (req: Request, res: Response, next: NextFunction) => {
   // Validation results are handled by handleValidationErrors middleware
  try {
    console.log('POST /vendors', req.body);

    // Extract userId and userRole from headers forwarded by API Gateway
    const userId = req.headers['x-user-id'] as string | undefined;
    const userRole = req.headers['x-user-role'] as string | undefined; // Assuming role is a string

     // Basic check for required headers (authentication is done by API Gateway middleware)
    if (!userId || !userRole) {
        // Use Forbidden as auth middleware should have run
        return handleError(res, 'Unauthorized', new ForbiddenError('User information not provided in headers.'), 403); // Use Forbidden
    }

    const vendorData: CreateVendorBody = req.body;

    // Call the service function to create the vendor profile
    const newVendor = await createVendorService(userId, vendorData);

    res.status(201).json(newVendor);

  } catch (error) {
    // Use handleError to catch custom errors (like ConflictError, ForbiddenError) and return appropriate responses
    handleError(res, 'Failed to create vendor profile', error);
  }
};

/**
 * Controller for GET /vendors/:vendorId - Get a vendor by ID.
 * This is a public endpoint handled by the API Gateway.
 */
export const getVendorById = async (req: Request, res: Response, next: NextFunction) => {
  // Validation results for vendorId param are handled by middleware
  try {
    console.log('GET /vendors/:vendorId', req.params.vendorId);
    const { vendorId } = req.params;

    // Call the service function to get the vendor by ID
    const vendor = await getVendorByIdService(vendorId as string);

    res.status(200).json(vendor);

  } catch (error) {
    // Use handleError to catch custom errors (like NotFoundError) and return appropriate responses
    handleError(res, 'Failed to fetch vendor', error);
  }
};

/**
 * Controller for GET /vendors/my-store - Get the authenticated user's vendor profile.
 * Requires authentication (handled by API Gateway).
 */
export const getMyStore = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('GET /vendors/my-store');

    // Extract userId and userRole from headers forwarded by API Gateway
    const userId = req.headers['x-user-id'] as string | undefined;
    const userRole = req.headers['x-user-role'] as string | undefined; // Assuming role is a string

     // Basic check for required headers
    if (!userId || !userRole) {
        return handleError(res, 'Unauthorized', new ForbiddenError('User information not provided in headers.'), 403); // Use Forbidden
    }

    // Call the service function to get the user's vendor profile
    const vendor = await getMyStoreService(userId);

    res.status(200).json(vendor);

  } catch (error) {
    // Use handleError to catch custom errors (like NotFoundError) and return appropriate responses
    handleError(res, 'Failed to fetch user\'s vendor profile', error);
  }
};

/**
 * Controller for PUT /vendors/my-store - Update the authenticated user's vendor profile.
 * Requires authentication (handled by API Gateway) and ownership (handled by service implicitly).
 */
export const updateMyStore = async (req: Request, res: Response, next: NextFunction) => {
   // Validation results are handled by handleValidationErrors middleware
  try {
    console.log('PUT /vendors/my-store', req.body);

    // Extract userId and userRole from headers forwarded by API Gateway
    const userId = req.headers['x-user-id'] as string | undefined;
    const userRole = req.headers['x-user-role'] as string | undefined; // Assuming role is a string

     // Basic check for required headers
    if (!userId || !userRole) {
        return handleError(res, 'Unauthorized', new ForbiddenError('User information not provided in headers.'), 403); // Use Forbidden
    }

    const updateData: UpdateMyStoreBody = req.body;

    // Call the service function to update the user's vendor profile
    const updatedVendor = await updateMyStoreService(userId, updateData);

    res.status(200).json(updatedVendor);

  } catch (error) {
    // Use handleError to catch custom errors (like NotFoundError) and return appropriate responses
    handleError(res, 'Failed to update user\'s vendor profile', error);
  }
};