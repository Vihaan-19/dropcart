"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const userController_1 = require("../controllers/userController");
const asyncHandler_1 = require("../utils/asyncHandler");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const router = (0, express_1.Router)();
// Health check for the Auth Service (accessible via /auth/api/health through API Gateway)
router.get('/health', (_req, res) => {
    res.json({ status: 'ok', service: 'auth-service', timestamp: new Date().toISOString() });
});
router.use('/auth', auth_1.default);
router.get('/users/me', authMiddleware_1.authenticateJWT, (0, asyncHandler_1.asyncHandler)(userController_1.getMe));
router.put('/users/me', authMiddleware_1.authenticateJWT, validation_middleware_1.updateProfileValidation, validation_middleware_1.handleValidationErrors, (0, asyncHandler_1.asyncHandler)(userController_1.updateProfile));
exports.default = router;
