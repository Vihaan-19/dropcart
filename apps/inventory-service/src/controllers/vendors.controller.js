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
const vendors_service_1 = require("../services/vendors.service");
const client_1 = require("@prisma/client"); // Import Prisma for specific error handling
// Placeholder controller functions for vendors
const getAllVendors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('GET /vendors', req.query);
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search;
        const vendors = yield (0, vendors_service_1.getAllVendors)(page, limit, search);
        res.status(200).json(vendors);
    }
    catch (error) {
        next(error); // Pass errors to the error handling middleware
    }
});
exports.getAllVendors = getAllVendors;
const createVendor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Assuming user is provided by the API Gateway in req.user.userId
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized: User ID not provided' });
            return;
        }
        const vendorData = req.body;
        const newVendor = yield (0, vendors_service_1.createVendor)(userId, vendorData);
        res.status(201).json(newVendor);
    }
    catch (error) {
        // Handle specific Prisma errors if necessary, e.g., unique constraint violation (P2002)
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                // Assuming P2002 on userId means a vendor already exists for this user
                res.status(409).json({ message: 'Vendor profile already exists for this user.' });
                return;
            }
        }
        next(error); // Pass other errors to the error handling middleware
    }
});
exports.createVendor = createVendor;
const getVendorById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('GET /vendors/:vendorId', req.params.vendorId);
        const { vendorId } = req.params;
        const vendor = yield (0, vendors_service_1.getVendorById)(vendorId);
        if (vendor) {
            res.status(200).json(vendor);
        }
        else {
            res.status(404).json({ message: 'Vendor not found' });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getVendorById = getVendorById;
const getMyStore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log('GET /vendors/my-store');
        // Assuming user is provided by the API Gateway in req.user.userId
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized: User ID not provided' });
            return;
        }
        const vendor = yield (0, vendors_service_1.getMyStore)(userId);
        if (vendor) {
            res.status(200).json(vendor);
        }
        else {
            res.status(404).json({ message: 'Vendor not found for this user' });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getMyStore = getMyStore;
const updateMyStore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log('PUT /vendors/my-store', req.body);
        // Assuming user is provided by the API Gateway in req.user.userId
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized: User ID not provided' });
            return;
        }
        const updateData = req.body;
        const updatedVendor = yield (0, vendors_service_1.updateMyStore)(userId, updateData);
        if (updatedVendor) {
            res.status(200).json(updatedVendor);
        }
        else {
            // Service returns null if vendor not found for this user
            res.status(404).json({ message: 'Vendor not found for this user' });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateMyStore = updateMyStore;
