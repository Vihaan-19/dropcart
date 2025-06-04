import { PrismaClient, Prisma } from "@prisma/client";
import {
  InventoryDetails,
  UpdateProductStockBody,
  InventoryLogList,
  InventoryLog,
} from "../types/inventory.types";
import { NotFoundError, ForbiddenError, ConflictError, ValidationError } from "../utils/errorHandlers"; // Import custom errors

const prisma = new PrismaClient();

/**
 * Get inventory details for a specific product.
 * @param productId - The ID of the product.
 * @param userId - The ID of the authenticated user.
 * @param userRole - The role of the authenticated user.
 * @returns A promise that resolves to the inventory details or throws an error.
 * @throws NotFoundError if the product is not found.
 * @throws ForbiddenError if the user is not authorized to view the inventory details.
 */
export const getInventoryDetails = async (
  productId: string,
  userId: string,
  userRole: string // Added userRole parameter
): Promise<InventoryDetails> => {
  try {
    // Find the product and include the vendor to check ownership
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      select: {
        id: true,
        stockQty: true,
        vendor: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundError(`Product with ID ${productId} not found.`);
    }

    // Check if the user is the vendor or an admin
    const isOwner = product.vendor?.userId === userId;
    const isAdmin = userRole === "admin"; // Assuming 'admin' is the admin role

    if (!isOwner && !isAdmin) {
      throw new ForbiddenError(
        "You are not authorized to view inventory details for this product."
      );
    }

    return {
      productId: product.id,
      stockQty: product.stockQty,
    };
  } catch (error) {
    console.error("Error fetching inventory details:", error);
    // Re-throw custom errors or throw a generic error for unexpected issues
    if (error instanceof NotFoundError || error instanceof ForbiddenError) {
      throw error;
    }
    throw new Error("Failed to fetch inventory details."); // Generic error for unexpected issues
  }
};

/**
 * Update the stock quantity for a specific product.
 * @param productId - The ID of the product.
 * @param data - The update data (changeQty, reason).
 * @param userId - The ID of the authenticated user.
 * @param userRole - The role of the authenticated user.
 * @returns A promise that resolves to the updated inventory details or throws an error.
 * @throws NotFoundError if the product is not found.
 * @throws ForbiddenError if the user is not authorized to update the stock.
 * @throws ValidationError if the resulting stock quantity is invalid (e.g., negative).
 */
export const updateProductStock = async (
  productId: string,
  data: UpdateProductStockBody,
  userId: string,
  userRole: string // Added userRole parameter
): Promise<InventoryDetails> => {
  // Use a transaction to ensure atomicity of stock update and log creation
  try {
    const result = await prisma.$transaction(async (tx) => {
      // Find the product within the transaction to verify ownership and get current stock
      const product = await tx.product.findUnique({
        where: {
          id: productId,
        },
        select: {
          id: true,
          stockQty: true,
          vendor: {
            select: {
              userId: true,
            },
          },
        },
      });

      if (!product) {
        throw new NotFoundError(`Product with ID ${productId} not found.`);
      }

      // Check if the user is the vendor or an admin
      const isOwner = product.vendor?.userId === userId;
      const isAdmin = userRole === "admin"; // Assuming 'admin' is the admin role

      if (!isOwner && !isAdmin) {
        throw new ForbiddenError(
          "You are not authorized to update stock for this product."
        );
      }

      const previousQty = product.stockQty;
      const newQty = previousQty + data.changeQty;

      // Basic validation for non-negative stock quantity if required by schema
      if (newQty < 0) {
           throw new ValidationError("Resulting stock quantity cannot be negative.");
      }

      const updatedProduct = await tx.product.update({
        where: {
          id: productId,
        },
        data: {
          stockQty: newQty,
        },
        select: {
          id: true,
          stockQty: true,
        },
      });

      // Ensure previousQty and newQty are treated as numbers for the log
      const logPreviousQty: number = previousQty !== null && previousQty !== undefined ? previousQty : 0; // Handle potential null/undefined
      const logNewQty: number = newQty !== null && newQty !== undefined ? newQty : 0; // Handle potential null/undefined

      await tx.inventoryLog.create({
        data: {
          productId: productId,
          changeQty: data.changeQty,
          reason: data.reason,
          previousQty: logPreviousQty,
          newQty: logNewQty,
          // Assuming a relation to User or storing userId directly in InventoryLog
          // If direct relation, need userId in schema; if storing, use userId from params
          // For now, assuming storing userId directly is an option
           userId: userId, // Store the user who made the change
        },
      });

      return {
        productId: updatedProduct.id,
        stockQty: updatedProduct.stockQty,
      };
    });

    return result;
  } catch (error) {
    console.error("Error updating product stock:", error);
    // Re-throw custom errors or throw a generic error for unexpected issues
     if (error instanceof NotFoundError || error instanceof ForbiddenError || error instanceof ValidationError) {
       throw error;
     }
    // Handle potential Prisma transaction errors specifically if needed
    throw new Error("Failed to update product stock."); // Generic error
  }
};

/**
 * Get inventory change logs for a specific product.
 * @param productId - The ID of the product.
 * @param userId - The ID of the authenticated user.
 * @param userRole - The role of the authenticated user.
 * @param page - The page number for pagination.
 * @param limit - The number of logs per page.
 * @returns A promise that resolves to a list of inventory logs with pagination info or throws an error.
 * @throws NotFoundError if the product is not found.
 * @throws ForbiddenError if the user is not authorized to view the logs.
 */
export const getInventoryLogs = async (
  productId: string,
  userId: string,
  userRole: string, // Added userRole parameter
  page: number = 1,
  limit: number = 10
): Promise<InventoryLogList> => {
  try {
    // Find the product and include the vendor to check ownership
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      select: {
        id: true,
        vendor: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!product) {
       throw new NotFoundError(`Product with ID ${productId} not found.`);
    }

    // Check if the user is the vendor or an admin
    const isOwner = product.vendor?.userId === userId;
    const isAdmin = userRole === "admin"; // Assuming 'admin' is the admin role

    if (!isOwner && !isAdmin) {
      throw new ForbiddenError(
        "You are not authorized to view inventory logs for this product."
      );
    }

    const skip = (page - 1) * limit;

    const logs = await prisma.inventoryLog.findMany({
      where: {
        productId: productId, // Filter by product ID
        // We've already authorized based on product ownership, so no need to filter logs by vendorId here again
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    const total = await prisma.inventoryLog.count({
      where: {
        productId: productId,
      },
    });

    return {
      logs: logs as InventoryLog[], // Cast to InventoryLog[] assuming the select/shape matches
      page,
      limit,
      total,
    };
  } catch (error) {
    console.error("Error fetching inventory logs:", error);
     // Re-throw custom errors or throw a generic error for unexpected issues
    if (error instanceof NotFoundError || error instanceof ForbiddenError) {
       throw error;
    }
    throw new Error("Failed to fetch inventory logs."); // Generic error
  }
};
