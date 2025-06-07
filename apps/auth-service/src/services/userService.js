"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUserById = void 0;
const prisma_1 = __importDefault(require("./prisma")); // Assuming prisma client is initialized and exported here
const errorHandlers_1 = require("../utils/errorHandlers"); // Import custom errors
const client_1 = require("@prisma/client"); // Import User type and Prisma namespace
/**
 * Get a user by their ID.
 * @param userId - The ID of the user.
 * @returns A promise that resolves to the user.
 * @throws NotFoundError if the user is not found.
 * @throws Error for unexpected issues.
 */
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_1.default.user.findUnique({
            where: { id: userId },
            // Select specific fields to avoid exposing sensitive data like password hash
            select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true },
        });
        if (!user) {
            throw new errorHandlers_1.NotFoundError(`User with ID ${userId} not found.`);
        }
        return user;
    }
    catch (error) { // Explicitly type error as any
        console.error("Error fetching user by ID:", error);
        // Re-throw custom errors or throw a generic error
        if (error instanceof errorHandlers_1.NotFoundError) {
            throw error;
        }
        throw new Error("Failed to fetch user."); // Generic error
    }
});
exports.getUserById = getUserById;
/**
 * Update a user's profile by their ID.
 * @param userId - The ID of the user.
 * @param updateData - The data to update the user with.
 * @returns A promise that resolves to the updated user.
 * @throws NotFoundError if the user is not found.
 * @throws ConflictError if there's a conflict (e.g., updating email to an existing one).
 * @throws Error for other unexpected issues.
 */
const updateUser = (userId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield prisma_1.default.user.update({
            where: { id: userId },
            data: Object.assign({}, updateData),
            select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true },
        });
        return updatedUser;
    }
    catch (error) { // Explicitly type error as any
        console.error("Error updating user:", error);
        // Catch P2025 (record not found) specifically, means user for userId wasn't found
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            throw new errorHandlers_1.NotFoundError(`User with ID ${userId} not found for update.`);
        }
        // Catch P2002 (unique constraint failed) for conflicts like email update
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            // Assuming the constraint is on the email field, customize message if needed
            throw new errorHandlers_1.ConflictError("Email already exists.");
        }
        // Re-throw other custom errors or throw a generic error
        if (error instanceof errorHandlers_1.NotFoundError || error instanceof errorHandlers_1.ConflictError) {
            throw error;
        }
        throw new Error("Failed to update user."); // Generic error
    }
});
exports.updateUser = updateUser;
// TODO: Add other service functions for user management as needed (e.g., deleteUser) 
