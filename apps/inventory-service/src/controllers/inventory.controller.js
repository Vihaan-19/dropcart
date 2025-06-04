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
const inventory_service_1 = require("../services/inventory.service");
// Placeholder controller functions for inventory 
const getInventoryDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log('GET /inventory/:productId', req.params.productId);
        // Assuming user is provided by the API Gateway in req.user.userId
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized: User ID not provided' });
            return;
        }
        const { productId } = req.params;
        const inventoryDetails = yield (0, inventory_service_1.getInventoryDetails)(userId, productId);
        if (inventoryDetails) {
            res.status(200).json(inventoryDetails);
        }
        else {
            // Service returns null if product not found or doesn't belong to the vendor
            res.status(404).json({ message: 'Inventory details not found or unauthorized' });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getInventoryDetails = getInventoryDetails;
const updateProductStock = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log('PUT /inventory/:productId', req.params.productId, req.body);
        // Assuming user is provided by the API Gateway in req.user.userId
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized: User ID not provided' });
            return;
        }
        const { productId } = req.params;
        const updateData = req.body;
        const updatedInventory = yield (0, inventory_service_1.updateProductStock)(userId, productId, updateData);
        if (updatedInventory) {
            res.status(200).json(updatedInventory);
        }
        else {
            // Service returns null if product not found or doesn't belong to the vendor
            res.status(404).json({ message: 'Product not found or unauthorized' });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateProductStock = updateProductStock;
const getInventoryLogs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log('GET /inventory/logs/:productId', req.params.productId, req.query);
        // Assuming user is provided by the API Gateway in req.user.userId
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized: User ID not provided' });
            return;
        }
        const { productId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        // Service returns pagination info even if no logs found or product not found/unauthorized.
        // The controller doesn't need to check for null here, as the service handles that by returning
        // an empty list and total 0 in the InventoryLogList structure.
        const inventoryLogs = yield (0, inventory_service_1.getInventoryLogs)(userId, productId, page, limit);
        res.status(200).json(inventoryLogs);
    }
    catch (error) {
        next(error);
    }
});
exports.getInventoryLogs = getInventoryLogs;
