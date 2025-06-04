"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("../controllers/products.controller");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const router = (0, express_1.Router)();
// Define product routes here
router.get('/', validation_middleware_1.getAllProductsValidation, validation_middleware_1.handleValidationErrors, products_controller_1.getAllProducts);
router.post('/', validation_middleware_1.createProductValidation, validation_middleware_1.handleValidationErrors, products_controller_1.createProduct);
router.get('/:productId', validation_middleware_1.getProductByIdValidation, validation_middleware_1.handleValidationErrors, products_controller_1.getProductById);
router.put('/:productId', validation_middleware_1.updateProductValidation, validation_middleware_1.handleValidationErrors, products_controller_1.updateProduct);
router.delete('/:productId', validation_middleware_1.deleteProductValidation, validation_middleware_1.handleValidationErrors, products_controller_1.deleteProduct);
exports.default = router;
