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
exports.updateMyStore = exports.getMyStore = exports.getVendorById = exports.createVendor = exports.getAllVendors = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Placeholder service functions for vendors
const getAllVendors = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = 1, limit = 10, search) {
    const skip = (page - 1) * limit;
    const where = search
        ? {
            OR: [
                { storeName: { contains: search, mode: 'insensitive' } },
                // Add other fields to search if needed, e.g., contactInfo
            ],
        }
        : {};
    const vendors = yield prisma.vendor.findMany({
        where,
        skip,
        take: limit,
    });
    const total = yield prisma.vendor.count({ where });
    return {
        vendors,
        page,
        limit,
        total,
    };
});
exports.getAllVendors = getAllVendors;
const createVendor = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    // In a real app, you might check if a vendor already exists for this userId
    // Since userId is unique in schema, Prisma will throw P2002 on duplicate
    const vendor = yield prisma.vendor.create({
        data: {
            userId: userId,
            storeName: data.storeName,
            contactInfo: data.contactInfo,
        },
    });
    return vendor;
});
exports.createVendor = createVendor;
const getVendorById = (vendorId) => __awaiter(void 0, void 0, void 0, function* () {
    const vendor = yield prisma.vendor.findUnique({
        where: {
            id: vendorId,
        },
    });
    return vendor;
});
exports.getVendorById = getVendorById;
const getMyStore = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const vendor = yield prisma.vendor.findUnique({
        where: {
            userId: userId,
        },
    });
    return vendor;
});
exports.getMyStore = getMyStore;
const updateMyStore = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedVendor = yield prisma.vendor.update({
            where: {
                userId: userId, // Find vendor by userId
            },
            data: {
                storeName: data.storeName,
                contactInfo: data.contactInfo ? data.contactInfo : undefined,
            },
        });
        return updatedVendor;
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            // P2025 means the record to update was not found
            if (error.code === 'P2025') {
                return null; // Indicate vendor not found for this user
            }
        }
        throw error; // Re-throw other errors
    }
});
exports.updateMyStore = updateMyStore;
