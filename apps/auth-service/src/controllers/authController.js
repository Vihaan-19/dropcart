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
exports.register = register;
exports.login = login;
exports.refresh = refresh;
exports.logout = logout;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../services/prisma"));
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
}
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';
function generateToken(payload) {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}
function validateFields(fields, body) {
    const missing = fields.filter(field => !body[field]);
    return missing.length > 0 ? `Missing fields: ${missing.join(', ')}` : null;
}
function handleError(res, message, err, code = 500) {
    console.error(err);
    return res.status(code).json(Object.assign({ error: message }, (err instanceof Error && { details: err.message })));
}
function register(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const error = validateFields(['name', 'email', 'password', 'role'], req.body);
        if (error) {
            res.status(400).json({ error });
            return;
        }
        const { name, email, password, role } = req.body;
        try {
            const existingUser = yield prisma_1.default.user.findUnique({ where: { email } });
            if (existingUser) {
                res.status(409).json({ error: 'Email already exists' });
                return;
            }
            const passwordHash = yield bcrypt_1.default.hash(password, 10);
            const user = yield prisma_1.default.user.create({
                data: { name, email, passwordHash, role },
            });
            const token = generateToken({ userId: user.id, role: user.role });
            res.status(201).json({
                user: { id: user.id, name: user.name, email: user.email, role: user.role },
                token,
            });
            return;
        }
        catch (err) {
            handleError(res, 'Registration failed', err);
            return;
        }
    });
}
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const error = validateFields(['email', 'password'], req.body);
        if (error) {
            res.status(400).json({ error });
            return;
        }
        const { email, password } = req.body;
        try {
            const user = yield prisma_1.default.user.findUnique({ where: { email } });
            if (!user || !(yield bcrypt_1.default.compare(password, user.passwordHash))) {
                res.status(401).json({ error: 'Invalid email or password' });
                return;
            }
            const token = generateToken({ userId: user.id, role: user.role });
            res.json({
                user: { id: user.id, name: user.name, email: user.email, role: user.role },
                token,
            });
            return;
        }
        catch (err) {
            handleError(res, 'Login failed', err);
            return;
        }
    });
}
function refresh(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // The authenticateJWT middleware should have attached the user payload to req.user
        const user = req.user; // Cast to any or define a specific AuthRequest type
        if (!user) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        try {
            // Optionally, verify the user still exists in the database
            const dbUser = yield prisma_1.default.user.findUnique({
                where: { id: user.userId },
            });
            if (!dbUser) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }
            // Generate a new token
            const newToken = generateToken({ userId: dbUser.id, role: dbUser.role });
            res.json({ token: newToken });
            return;
        }
        catch (err) {
            handleError(res, 'Failed to refresh token', err, 500);
            return;
        }
    });
}
function logout(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // For a stateless JWT, logout is usually client-side (deleting the token).
        // Server-side logout typically involves token invalidation (e.g., in a database or cache).
        // This is a basic implementation assuming client-side token removal is sufficient,
        // or if you implement token invalidation elsewhere.
        // If you were using a token blacklist/denylist, you would add the current token here.
        // The authenticateJWT middleware would need to be modified to check the blacklist.
        // For now, just confirm success assuming the client will discard the token.
        res.json({ message: 'Logout successful' });
        return;
    });
}
