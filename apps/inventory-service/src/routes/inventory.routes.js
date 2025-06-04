"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inventory_controller_1 = require("../controllers/inventory.controller");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const router = (0, express_1.Router)();
// Define inventory routes here
router.get('/:productId', validation_middleware_1.getInventoryDetailsValidation, validation_middleware_1.handleValidationErrors, inventory_controller_1.getInventoryDetails);
router.put('/:productId', validation_middleware_1.updateProductStockValidation, validation_middleware_1.handleValidationErrors, inventory_controller_1.updateProductStock);
router.get('/logs/:productId', validation_middleware_1.getInventoryLogsValidation, validation_middleware_1.handleValidationErrors, inventory_controller_1.getInventoryLogs);
exports.default = router;
