"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vendors_controller_1 = require("../controllers/vendors.controller");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const router = (0, express_1.Router)();
// Define vendor routes here
router.get('/', validation_middleware_1.getAllVendorsValidation, validation_middleware_1.handleValidationErrors, vendors_controller_1.getAllVendors);
router.post('/', validation_middleware_1.createVendorValidation, validation_middleware_1.handleValidationErrors, vendors_controller_1.createVendor);
router.get('/:vendorId', validation_middleware_1.getVendorByIdValidation, validation_middleware_1.handleValidationErrors, vendors_controller_1.getVendorById);
router.get('/my-store', vendors_controller_1.getMyStore);
router.put('/my-store', validation_middleware_1.updateMyStoreValidation, validation_middleware_1.handleValidationErrors, vendors_controller_1.updateMyStore);
exports.default = router;
