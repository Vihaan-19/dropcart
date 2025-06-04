import { Router } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const authRoutes = Router();

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3001';

// Helper to forward requests to the consolidated Auth/User service
const forwardToAuthService = async (method: 'get' | 'post' | 'put', req: any, res: any, next: any) => {
  try {
    // Use req.originalUrl to capture the full path including /auth or /users
    const url = `${AUTH_SERVICE_URL}${req.originalUrl}`;
    const headers = {
      // Removed Authorization header as token is verified in API Gateway
      // Assuming the auth service might need user info for some user endpoints, e.g., /users/profile
      'X-User-Id': req.user?.userId, // Assuming authenticate middleware adds req.user
      'X-User-Role': req.user?.role,
      'Content-Type': req.headers['content-type'],
    };

    const config: any = { method, url, headers };

    if (method === 'post' || method === 'put') {
      config.data = req.body;
    } else if (method === 'get') {
        config.params = req.query;
    }

    const response = await axios(config);

    res.status(response.status).json(response.data);
  } catch (error) {
    // Improved error handling to propagate downstream service errors
    if (axios.isAxiosError(error) && error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    next(error); // Pass other errors to the global error handler
  }
};

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

// GET /users/profile
// This route is defined relative to the router's base path. If the router is mounted at /auth, this becomes /auth/users/profile.
// If the backend expects /users/profile, we'll need to adjust the mounting in index.ts.
authRoutes.get('/users/profile', (req, res, next) => forwardToAuthService('get', req, res, next));

// PUT /users/profile
authRoutes.put('/users/profile', (req, res, next) => forwardToAuthService('put', req, res, next));

export default authRoutes; 