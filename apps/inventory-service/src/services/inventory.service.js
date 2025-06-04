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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInventoryLogs = exports.updateProductStock = exports.getInventoryDetails = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Placeholder service functions for inventory
const getInventoryDetails = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the vendor associated with the user
        const vendor = yield prisma.vendor.findUnique({
            where: {
                userId: userId,
            },
        });
        if (!vendor) {
            return null; // Indicate vendor not found for this user
        }
        // Find the product details only if it belongs to the vendor
        const product = yield prisma.product.findUnique({
            where: {
                id: productId,
                vendorId: vendor.id, // Ensure the product belongs to the vendor
            },
            select: {
                id: true,
                stockQty: true,
            },
        });
        if (!product) {
            return null; // Indicate product not found or doesn't belong to the vendor
        }
        return {
            productId: product.id,
            stockQty: product.stockQty,
        };
    }
    catch (error) {
        console.error('Error fetching inventory details:', error);
        throw error; // Re-throw other errors
    }
});
exports.getInventoryDetails = getInventoryDetails;
const updateProductStock = (userId, productId, data) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the vendor associated with the user
    const vendor = yield prisma.vendor.findUnique({
        where: {
            userId: userId,
        },
    });
    if (!vendor) {
        return null; // Indicate vendor not found for this user
    }
    // Use a transaction to ensure atomicity of stock update and log creation
    try {
        const result = yield prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            // Verify product ownership within the transaction
            const product = yield tx.product.findUnique({
                where: {
                    id: productId,
                    vendorId: vendor.id, // Ensure the product belongs to the vendor
                },
            });
            if (!product) {
                return null; // Indicate product not found or doesn't belong to the vendor
            }
            const previousQty = product.stockQty;
            const newQty = previousQty + data.changeQty;
            const updatedProduct = yield tx.product.update({
                where: {
                    id: productId,
                    vendorId: vendor.id, // Ensure the product belongs to the vendor
                },
                data: {
                    stockQty: newQty,
                },
                select: {
                    id: true,
                    stockQty: true,
                },
            });
            yield tx.inventoryLog.create({
                data: {
                    productId: productId,
                    changeQty: data.changeQty,
                    reason: data.reason,
                    previousQty: previousQty,
                    newQty: newQty,
                },
            });
            return {
                productId: updatedProduct.id,
                stockQty: updatedProduct.stockQty,
            };
        }));
        return result;
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            // P2025 means the record to update was not found (either product or vendor mismatch within transaction)
            if (error.code === 'P2025') {
                return null; // Indicate product not found or unauthorized
            }
        }
        console.error('Error updating product stock:', error);
        throw error; // Re-throw other errors
    }
});
exports.updateProductStock = updateProductStock;
const getInventoryLogs = (userId_1, productId_1, ...args_1) => __awaiter(void 0, [userId_1, productId_1, ...args_1], void 0, function* (userId, productId, page = 1, limit = 10) {
    try {
        // Find the vendor associated with the user
        const vendor = yield prisma.vendor.findUnique({
            where: {
                userId: userId,
            },
        });
        if (!vendor) {
            return {
                logs: [],
                page,
                limit,
                total: 0,
            };
        }
        // Find the product to ensure it belongs to the vendor
        const product = yield prisma.product.findUnique({
            where: {
                id: productId,
                vendorId: vendor.id, // Ensure the product belongs to the vendor
            },
            select: {
                id: true,
            },
        });
        if (!product) {
            return {
                logs: [],
                page,
                limit,
                total: 0,
            };
        }
        const skip = (page - 1) * limit;
        const logs = yield prisma.inventoryLog.findMany({
            where: {
                productId: productId, // Filter by product ID
                product: {
                    vendorId: vendor.id,
                },
            },
            skip,
            take: limit,
            orderBy: {
                createdAt: 'desc',
            },
        });
        const total = yield prisma.inventoryLog.count({
            where: {
                productId: productId,
                product: {
                    vendorId: vendor.id,
                },
            },
        });
        return {
            logs,
            page,
            limit,
            total,
        };
    }
    catch (error) {
        console.error('Error fetching inventory logs:', error);
        throw error; // Re-throw other errors
    }
});
exports.getInventoryLogs = getInventoryLogs;
