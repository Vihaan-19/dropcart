import { Router } from 'express';
import { forwardToAuthService } from '../services/auth.service';

const authRoutes = Router();

// Define routes for Auth and User Management service as per OpenAPI spec (consolidated)

// --- Authentication Endpoints ---

// POST /auth/register
authRoutes.post('/register', (req, res, next) => forwardToAuthService('post', req, res, next));

// POST /auth/login
authRoutes.post('/login', (req, res, next) => forwardToAuthService('post', req, res, next));

// Add other auth routes if needed that were in index.ts, e.g., /auth/logout, /auth/refresh
authRoutes.post('/logout', (req, res, next) => forwardToAuthService('post', req, res, next));
authRoutes.post('/refresh', (req, res, next) => forwardToAuthService('post', req, res, next));

// --- User Management Endpoints ---

// GET /users/profile (maps to /api/users/me in auth-service)
// Assuming the auth service expects /api/users/me after its root
authRoutes.get('/users/profile', (req, res, next) => forwardToAuthService('get', req, res, next));

// PUT /users/profile (maps to /api/users/me in auth-service)
authRoutes.put('/users/profile', (req, res, next) => forwardToAuthService('put', req, res, next));

// Health check endpoint (maps to /api/health in auth-service)
authRoutes.get('/health', (req, res, next) => forwardToAuthService('get', req, res, next)); // Add health check proxy route

export default authRoutes; 