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
const products_service_1 = require("../services/products.service");
// Placeholder controller functions for products 
const getAllProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('GET /products', req.query);
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const search = req.query.search;
        const category = req.query.category;
        const vendorId = req.query.vendorId; // Allow filtering by vendorId
        const minPrice = req.query.minPrice ? parseFloat(req.query.minPrice) : undefined;
        const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice) : undefined;
        const inStock = req.query.inStock ? req.query.inStock === 'true' : undefined; // Assuming 'true' or 'false' as string
        const products = yield (0, products_service_1.getAllProducts)(page, limit, search, category, vendorId, minPrice, maxPrice, inStock);
        res.status(200).json(products);
    }
    catch (error) {
        next(error); // Pass errors to the error handling middleware
    }
});
exports.getAllProducts = getAllProducts;
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log('POST /products', req.body);
        // Assuming user is provided by the API Gateway in req.user.userId
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized: User ID not provided' });
            return;
        }
        const productData = req.body;
        // Note: vendorId is not taken directly from body but derived from the authenticated user's vendor
        // if (productData.vendorId) { delete productData.vendorId; } // Ensure vendorId is not set by client
        const newProduct = yield (0, products_service_1.createProduct)(userId, productData);
        if (newProduct) {
            res.status(201).json(newProduct);
        }
        else {
            // Service returns null if vendor not found for this user (should be handled by API Gateway auth/authz)
            // But adding a safeguard here just in case.
            res.status(403).json({ message: 'Forbidden: User is not associated with a vendor.' });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.createProduct = createProduct;
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('GET /products/:productId', req.params.productId);
        const { productId } = req.params;
        const product = yield (0, products_service_1.getProductById)(productId);
        if (product) {
            res.status(200).json(product);
        }
        else {
            res.status(404).json({ message: 'Product not found' });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getProductById = getProductById;
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log('PUT /products/:productId', req.params.productId, req.body);
        // Assuming user is provided by the API Gateway in req.user.userId
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized: User ID not provided' });
            return;
        }
        const { productId } = req.params;
        const updateData = req.body;
        const updatedProduct = yield (0, products_service_1.updateProduct)(userId, productId, updateData);
        if (updatedProduct) {
            res.status(200).json(updatedProduct);
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
exports.updateProduct = updateProduct;
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log('DELETE /products/:productId', req.params.productId);
        // Assuming user is provided by the API Gateway in req.user.userId
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized: User ID not provided' });
            return;
        }
        const { productId } = req.params;
        const deletedProduct = yield (0, products_service_1.deleteProduct)(userId, productId);
        if (deletedProduct) {
            res.status(204).send(); // Successful deletion, no content
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
exports.deleteProduct = deleteProduct;
