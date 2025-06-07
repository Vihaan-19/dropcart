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
exports.getMe = getMe;
exports.updateProfile = updateProfile;
const userService_1 = require("../services/userService"); // Import service functions
const errorHandlers_1 = require("../utils/errorHandlers"); // Import error handler utility
function getMe(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user } = req;
        // Authentication middleware should handle this, but add a safeguard
        if (!user || !user.userId) {
            (0, errorHandlers_1.handleError)(res, 'Unauthorized', null, 401);
            return;
        }
        try {
            // Use the service function to fetch the user
            const dbUser = yield (0, userService_1.getUserById)(user.userId);
            res.json({ user: dbUser });
        }
        catch (err) {
            // Use the error handler utility
            (0, errorHandlers_1.handleError)(res, 'Failed to fetch user', err);
        }
    });
}
function updateProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user } = req;
        // Authentication middleware should handle this, but add a safeguard
        if (!user || !user.userId) {
            (0, errorHandlers_1.handleError)(res, 'Unauthorized', null, 401);
            return;
        }
        // Validation middleware should have ensured basic validity, extract validated data
        // Assuming validation.middleware.ts handles the allowed update fields (name, role)
        const { name, role } = req.body; // Get potentially updated fields from validated body
        // Build update data object, only include fields that are present in the request body
        const updateData = {};
        if (name !== undefined)
            updateData.name = name;
        if (role !== undefined)
            updateData.role = role;
        // Ensure at least one field is provided for update, although validation middleware might handle this
        if (Object.keys(updateData).length === 0) {
            (0, errorHandlers_1.handleError)(res, 'No update fields provided', null, 400);
            return;
        }
        try {
            // Use the service function to update the user
            const updatedUser = yield (0, userService_1.updateUser)(user.userId, updateData);
            res.json({ user: updatedUser });
        }
        catch (err) {
            // Use the error handler utility
            (0, errorHandlers_1.handleError)(res, 'Failed to update user', err);
        }
    });
}
// TODO: Add other controller functions for user management as needed 
