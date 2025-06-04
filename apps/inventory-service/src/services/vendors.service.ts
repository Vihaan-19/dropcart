import { PrismaClient, Prisma } from '@prisma/client';
import { CreateVendorBody, UpdateMyStoreBody, Vendor, VendorList } from '../types/vendor.types';
import { NotFoundError, ForbiddenError, ConflictError } from "../utils/errorHandlers"; // Import custom errors

const prisma = new PrismaClient();

/**
 * Get a list of all vendors with optional filtering and pagination.
 * This is a public endpoint.
 * @param page - The page number for pagination (default: 1).
 * @param limit - The number of items per page (default: 10).
 * @param search - Optional search term for store name.
 * @returns A promise that resolves to a list of vendors with pagination info.
 * @throws Error for unexpected issues.
 */
export const getAllVendors = async (page: number = 1, limit: number = 10, search?: string): Promise<VendorList> => {
  try {
    const skip = (page - 1) * limit;
    const where = search
      ? {
          OR: [
            { storeName: { contains: search, mode: 'insensitive' as 'insensitive' } },
            // Add other fields to search if needed, e.g., contactInfo
          ],
        }
      : {};

    const vendors = await prisma.vendor.findMany({
      where,
      skip,
      take: limit,
    });

    const total = await prisma.vendor.count({ where });

    return {
      vendors,
      page,
      limit,
      total,
    };
  } catch (error) {
    console.error("Error fetching all vendors:", error);
    throw new Error("Failed to fetch vendors."); // Generic error for unexpected issues
  }
};

/**
 * Create a new vendor profile for a user.
 * Requires authentication.
 * @param userId - The ID of the authenticated user.
 * @param data - The vendor profile data.
 * @returns A promise that resolves to the created vendor.
 * @throws ConflictError if a vendor profile already exists for this user.
 * @throws ForbiddenError if the user role is not permitted to create a vendor profile (optional, depending on policy).
 * @throws Error for other unexpected issues.
 */
export const createVendor = async (userId: string, data: CreateVendorBody): Promise<Vendor> => {
  try {
    // Role check could be added here if certain roles cannot create vendor profiles
    // e.g., if(userRole === 'admin') throw new ForbiddenError(...);

    const vendor = await prisma.vendor.create({
      data: {
        userId: userId,
        storeName: data.storeName,
        contactInfo: data.contactInfo as Prisma.JsonObject,
      },
    });
    return vendor;
  } catch (error) {
    console.error("Error creating vendor:", error);
    // Catch unique constraint violation for userId
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
       throw new ConflictError("A vendor profile already exists for this user.");
    }
    // Re-throw other custom errors or throw a generic error
    if (error instanceof ForbiddenError || error instanceof ConflictError) {
       throw error;
    }
    throw new Error("Failed to create vendor profile."); // Generic error
  }
};

/**
 * Get a vendor profile by its ID.
 * This is a public endpoint.
 * @param vendorId - The ID of the vendor.
 * @returns A promise that resolves to the vendor.
 * @throws NotFoundError if the vendor is not found.
 * @throws Error for unexpected issues.
 */
export const getVendorById = async (vendorId: string): Promise<Vendor> => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        id: vendorId,
      },
    });
    if (!vendor) {
       throw new NotFoundError(`Vendor with ID ${vendorId} not found.`);
    }
    return vendor;
  } catch (error) {
     console.error("Error fetching vendor by ID:", error);
     // Re-throw custom errors or throw a generic error
     if (error instanceof NotFoundError) {
       throw error;
     }
     throw new Error("Failed to fetch vendor."); // Generic error
  }
};

/**
 * Get the vendor profile for the authenticated user.
 * Requires authentication.
 * @param userId - The ID of the authenticated user.
 * @returns A promise that resolves to the user's vendor profile.
 * @throws NotFoundError if no vendor profile is found for the user.
 * @throws Error for unexpected issues.
 */
export const getMyStore = async (userId: string): Promise<Vendor> => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: userId,
      },
    });
    if (!vendor) {
      throw new NotFoundError("No vendor profile found for this user.");
    }
    return vendor;
  } catch (error) {
     console.error("Error fetching user's vendor profile:", error);
     // Re-throw custom errors or throw a generic error
     if (error instanceof NotFoundError) {
       throw error;
     }
     throw new Error("Failed to fetch user's vendor profile."); // Generic error
  }
};

/**
 * Update the vendor profile for the authenticated user.
 * Requires authentication and ownership.
 * @param userId - The ID of the authenticated user.
 * @param data - The updated vendor profile data.
 * @returns A promise that resolves to the updated vendor profile.
 * @throws NotFoundError if no vendor profile is found for the user.
 * @throws Error for unexpected issues.
 */
export const updateMyStore = async (userId: string, data: UpdateMyStoreBody): Promise<Vendor> => {
  try {
    const updatedVendor = await prisma.vendor.update({
      where: {
        userId: userId, // Find vendor by userId
      },
      data: {
        storeName: data.storeName,
        contactInfo: data.contactInfo ? data.contactInfo as Prisma.JsonObject : undefined,
      },
    });

    return updatedVendor;
  } catch (error) {
    console.error("Error updating user's vendor profile:", error);
    // Catch P2025 (record not found) specifically, means vendor for userId wasn't found
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
       throw new NotFoundError("No vendor profile found for this user to update.");
    }
    // Re-throw other custom errors or throw a generic error
    if (error instanceof NotFoundError) {
       throw error;
    }
    throw new Error("Failed to update user's vendor profile."); // Generic error
  }
};