import prisma from './prisma'; // Assuming prisma client is initialized and exported here
import { NotFoundError, ConflictError, ValidationError } from "../utils/errorHandlers"; // Import custom errors
import { PublicUser } from "../types/user.types";
import { Prisma, PrismaClient } from "@prisma/client"; // Import only Prisma namespace

/**
 * Get a user by their ID.
 * @param userId - The ID of the user.
 * @returns A promise that resolves to the user.
 * @throws NotFoundError if the user is not found.
 * @throws Error for unexpected issues.
 */
export const getUserById = async (userId: string): Promise<PublicUser> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      // Select specific fields to avoid exposing sensitive data like password hash
      select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true },
    });

    if (!user) {
      throw new NotFoundError(`User with ID ${userId} not found.`);
    }

    return user;
  } catch (error: any) { // Explicitly type error as any
    console.error("Error fetching user by ID:", error);
    // Re-throw custom errors or throw a generic error
    if (error instanceof NotFoundError) {
       throw error;
    }
    throw new Error("Failed to fetch user."); // Generic error
  }
};

/**
 * Update a user's profile by their ID.
 * @param userId - The ID of the user.
 * @param updateData - The data to update the user with.
 * @returns A promise that resolves to the updated user.
 * @throws NotFoundError if the user is not found.
 * @throws ConflictError if there's a conflict (e.g., updating email to an existing one).
 * @throws Error for other unexpected issues.
 */
export const updateUser = async (userId: string, updateData: any): Promise<PublicUser> => { // TODO: Define a proper type for updateData
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...updateData,
      },
      select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true },
    });

    return updatedUser;
  } catch (error: any) { // Explicitly type error as any
    console.error("Error updating user:", error);
    // Catch P2025 (record not found) specifically, means user for userId wasn't found
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
       throw new NotFoundError(`User with ID ${userId} not found for update.`);
    }
    // Catch P2002 (unique constraint failed) for conflicts like email update
     if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        // Assuming the constraint is on the email field, customize message if needed
       throw new ConflictError("Email already exists.");
     }
    // Re-throw other custom errors or throw a generic error
    if (error instanceof NotFoundError || error instanceof ConflictError) {
       throw error;
    }
    throw new Error("Failed to update user."); // Generic error
  }
};

// TODO: Add other service functions for user management as needed (e.g., deleteUser) 