"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const asyncHandler_1 = require("../utils/asyncHandler");
const authRouter = (0, express_1.Router)();
// POST /auth/register
authRouter.post('/register', (0, asyncHandler_1.asyncHandler)(authController_1.register));
// POST /auth/login
authRouter.post('/login', (0, asyncHandler_1.asyncHandler)(authController_1.login));
// POST /auth/refresh
authRouter.post('/refresh', authMiddleware_1.authenticateJWT, (0, asyncHandler_1.asyncHandler)(authController_1.refresh));
// POST /auth/logout
authRouter.post('/logout', authMiddleware_1.authenticateJWT, (0, asyncHandler_1.asyncHandler)(authController_1.logout));
exports.default = authRouter;
