import { PrismaClient, Prisma } from "@prisma/client";
import {
  CreateProductBody,
  UpdateProductBody,
  Product,
  ProductList,
} from "../types/product.types";
import { NotFoundError, ForbiddenError, ConflictError, ValidationError } from "../utils/errorHandlers"; // Import custom errors

const prisma = new PrismaClient();

/**
 * Get a list of all products with optional filtering and pagination.
 * This is a public endpoint.
 * @param page - The page number for pagination (default: 1).
 * @param limit - The number of items per page (default: 20).
 * @param search - Optional search term for product name or description.
 * @param category - Optional filter by category.
 * @param vendorId - Optional filter by vendor ID.
 * @param minPrice - Optional minimum price filter.
 * @param maxPrice - Optional maximum price filter.
 * @param inStock - Optional filter for products currently in stock.
 * @returns A promise that resolves to a list of products with pagination info.
 * @throws Error for unexpected issues.
 */
export const getAllProducts = async (
  page: number = 1,
  limit: number = 20,
  search?: string,
  category?: string,
  vendorId?: string,
  minPrice?: number,
  maxPrice?: number,
  inStock?: boolean
): Promise<ProductList> => {
  try {
    const skip = (page - 1) * limit;
    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" as "insensitive" } },
        {
          description: { contains: search, mode: "insensitive" as "insensitive" },
        },
      ];
    }

    if (category) {
      where.category = category;
    }

    if (vendorId) {
      where.vendorId = vendorId;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) {
        where.price.gte = minPrice;
      }
      if (maxPrice !== undefined) {
        where.price.lte = maxPrice;
      }
    }

    if (inStock !== undefined) {
      where.stockQty = inStock ? { gt: 0 } : 0;
    }

    const products = await prisma.product.findMany({
      where,
      skip,
      take: limit,
    });

    const total = await prisma.product.count({ where });

    return {
      products,
      page,
      limit,
      total,
    };
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw new Error("Failed to fetch products."); // Generic error for unexpected issues
  }
};

/**
 * Create a new product.
 * Requires authentication and vendor/admin role.
 * @param data - The product data.
 * @param userId - The ID of the authenticated user.
 * @param userRole - The role of the authenticated user.
 * @returns A promise that resolves to the created product.
 * @throws ForbiddenError if the user is not authorized (not a vendor or admin).
 * @throws NotFoundError if the vendor associated with the user is not found.
 * @throws Error for other unexpected issues.
 */
export const createProduct = async (
  data: CreateProductBody,
  userId: string,
  userRole: string // Added userRole
): Promise<Product> => {
  try {
    // Check if the user is authorized (vendor or admin)
    const isVendor = userRole === "vendor";
    const isAdmin = userRole === "admin";

    if (!isVendor && !isAdmin) {
      throw new ForbiddenError("You are not authorized to create a product.");
    }

    // Find the vendor associated with the user
    const vendor = await prisma.vendor.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!vendor) {
      // If user is authenticated but has no vendor profile, they cannot create a product
      throw new NotFoundError("Vendor profile not found for this user.");
    }

    const product = await prisma.product.create({
      data: {
        name: data.name,
        vendorId: vendor.id, // Use the found vendor's ID
        price: data.price,
        stockQty: data.stockQty,
        description: data.description,
        category: data.category,
        images: data.images,
      },
    });
    return product;
  } catch (error) {
    console.error("Error creating product:", error);
    // Re-throw custom errors or throw a generic error for unexpected issues
    if (error instanceof ForbiddenError || error instanceof NotFoundError || error instanceof ConflictError || error instanceof ValidationError) {
      throw error;
    }
    throw new Error("Failed to create product."); // Generic error
  }
};

/**
 * Get a product by its ID.
 * This is a public endpoint.
 * @param productId - The ID of the product.
 * @returns A promise that resolves to the product.
 * @throws NotFoundError if the product is not found.
 * @throws Error for unexpected issues.
 */
export const getProductById = async (
  productId: string
): Promise<Product> => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new NotFoundError(`Product with ID ${productId} not found.`);
    }
    return product;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
     // Re-throw custom errors or throw a generic error for unexpected issues
    if (error instanceof NotFoundError) {
       throw error;
    }
    throw new Error("Failed to fetch product."); // Generic error
  }
};

/**
 * Update a product by its ID.
 * Requires authentication and product ownership (vendor) or admin role.
 * @param productId - The ID of the product.
 * @param data - The updated product data.
 * @param userId - The ID of the authenticated user.
 * @param userRole - The role of the authenticated user.
 * @returns A promise that resolves to the updated product.
 * @throws NotFoundError if the product is not found.
 * @throws ForbiddenError if the user is not authorized to update the product.
 * @throws Error for other unexpected issues.
 */
export const updateProduct = async (
  productId: string,
  data: UpdateProductBody,
  userId: string,
  userRole: string // Added userRole
): Promise<Product> => {
  try {
    // Find the product and include the vendor to check ownership
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      select: {
        id: true,
        vendorId: true,
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

    // Check if the user is the owner or an admin
    const isOwner = product.vendor?.userId === userId;
    const isAdmin = userRole === "admin";

    if (!isOwner && !isAdmin) {
      throw new ForbiddenError("You are not authorized to update this product.");
    }

    // Update the product
    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        ...data,
      },
    });
    return updatedProduct;
  } catch (error) {
    console.error("Error updating product:", error);
     // Re-throw custom errors or throw a generic error for unexpected issues
     if (error instanceof NotFoundError || error instanceof ForbiddenError || error instanceof ConflictError || error instanceof ValidationError) {
       throw error;
     }
    throw new Error("Failed to update product."); // Generic error
  }
};

/**
 * Delete a product by its ID.
 * Requires authentication and product ownership (vendor) or admin role.
 * @param productId - The ID of the product.
 * @param userId - The ID of the authenticated user.
 * @param userRole - The role of the authenticated user.
 * @returns A promise that resolves to the deleted product.
 * @throws NotFoundError if the product is not found.
 * @throws ForbiddenError if the user is not authorized to delete the product.
 * @throws Error for other unexpected issues.
 */
export const deleteProduct = async (
  productId: string,
  userId: string,
  userRole: string // Added userRole
): Promise<Product> => {
  try {
    // Find the product to check ownership
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

    // Check if the user is the owner or an admin
    const isOwner = product.vendor?.userId === userId;
    const isAdmin = userRole === "admin";

    if (!isOwner && !isAdmin) {
      throw new ForbiddenError("You are not authorized to delete this product.");
    }

    // Delete the product
    const deletedProduct = await prisma.product.delete({
      where: {
        id: productId,
      },
    });
    return deletedProduct;
  } catch (error) {
    console.error("Error deleting product:", error);
     // Re-throw custom errors or throw a generic error for unexpected issues
     if (error instanceof NotFoundError || error instanceof ForbiddenError || error instanceof ConflictError || error instanceof ValidationError) {
       throw error;
     }
    throw new Error("Failed to delete product."); // Generic error
  }
};
