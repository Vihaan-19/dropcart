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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = getMe;
exports.updateProfile = updateProfile;
const prisma_1 = __importDefault(require("../services/prisma"));
function getMe(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user } = req;
        if (!user) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        try {
            const dbUser = yield prisma_1.default.user.findUnique({
                where: { id: user.userId },
                select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true },
            });
            if (!dbUser) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.json({ user: dbUser });
        }
        catch (err) {
            res.status(500).json({ error: 'Failed to fetch user', details: err instanceof Error ? err.message : err });
        }
    });
}
function updateProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user } = req;
        if (!user) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        // Assuming users_profile_body schema allows updating name and role
        // Add more validation as needed based on the actual schema
        const { name, role } = req.body;
        if (!name && !role) {
            res.status(400).json({ error: 'No update fields provided' });
            return;
        }
        try {
            const updatedUser = yield prisma_1.default.user.update({
                where: { id: user.userId },
                data: Object.assign(Object.assign({}, (name && { name })), (role && { role })),
                select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true },
            });
            res.json({ user: updatedUser });
            return;
        }
        catch (err) {
            // Handle cases like user not found (PrismaClientKnownRequestError P2025)
            if (err instanceof Error && err.code === 'P2025') {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.status(500).json({ error: 'Failed to update user', details: err instanceof Error ? err.message : err });
            return;
        }
    });
}
