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
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.createProduct = exports.getAllProducts = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Placeholder service functions for products
const getAllProducts = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = 1, limit = 20, search, category, vendorId, minPrice, maxPrice, inStock) {
    const skip = (page - 1) * limit;
    const where = {};
    if (search) {
        where.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
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
    const products = yield prisma.product.findMany({
        where,
        skip,
        take: limit,
    });
    const total = yield prisma.product.count({ where });
    return {
        products,
        page,
        limit,
        total,
    };
});
exports.getAllProducts = getAllProducts;
const createProduct = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the vendor associated with the user
    const vendor = yield prisma.vendor.findUnique({
        where: {
            userId: userId,
        },
    });
    if (!vendor) {
        return null; // Indicate vendor not found for this user (should be handled by API Gateway auth/authz)
    }
    const product = yield prisma.product.create({
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
});
exports.createProduct = createProduct;
const getProductById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield prisma.product.findUnique({
        where: {
            id: productId,
        },
    });
    return product;
});
exports.getProductById = getProductById;
const updateProduct = (userId, productId, data) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the vendor associated with the user
    const vendor = yield prisma.vendor.findUnique({
        where: {
            userId: userId,
        },
    });
    if (!vendor) {
        return null; // Indicate vendor not found for this user
    }
    try {
        // Update the product only if it belongs to the vendor
        const updatedProduct = yield prisma.product.update({
            where: {
                id: productId,
                vendorId: vendor.id, // Ensure the product belongs to the vendor
            },
            data: Object.assign({}, data),
        });
        return updatedProduct;
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            // P2025 means the record to update was not found (either product or vendor mismatch)
            if (error.code === 'P2025') {
                return null; // Indicate product not found or unauthorized
            }
        }
        throw error; // Re-throw other errors
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (userId, productId) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the vendor associated with the user
    const vendor = yield prisma.vendor.findUnique({
        where: {
            userId: userId,
        },
    });
    if (!vendor) {
        return null; // Indicate vendor not found for this user
    }
    try {
        // Delete the product only if it belongs to the vendor
        const deletedProduct = yield prisma.product.delete({
            where: {
                id: productId,
                vendorId: vendor.id, // Ensure the product belongs to the vendor
            },
        });
        return deletedProduct;
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            // P2025 means the record to delete was not found (either product or vendor mismatch)
            if (error.code === 'P2025') {
                return null; // Indicate product not found or unauthorized
            }
        }
        throw error; // Re-throw other errors
    }
});
exports.deleteProduct = deleteProduct;
