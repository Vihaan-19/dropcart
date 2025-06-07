import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { match } from 'path-to-regexp';
import { UserRole } from '../middlewares/authorization.middleware'; // Import UserRole

// Define a list of public routes that do not require authentication
// Paths should be relative to the gateway root, e.g., '/auth/login'
const PUBLIC_ROUTES = [
    '/auth/register',
    '/auth/login',
    '/products', // Example: Allow public browsing of products
    '/products/:productId', // Example: Allow public viewing of a single product
    '/vendors', // Example: Allow public browsing of vendors
    '/vendors/:vendorId', // Example: Allow public viewing of a single vendor
];

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Define JWT_SECRET

interface JwtPayload {
    user: {
        userId: string;
        role: UserRole; // Use UserRole type
        [key: string]: any;
    };
    iat: number;
    exp: number;
}

// Middleware to authenticate requests
export const authenticate: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const isPublicRoute = PUBLIC_ROUTES.some(route => match(route)(req.path));

    if (isPublicRoute) return next();

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Unauthorized: Missing or invalid token format' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        
        // Explicitly cast req to include the user property as a workaround
        (req as Request & { user: JwtPayload['user'] }).user = decoded.user;
        
        next();
    } catch (err) {
        console.error('Authentication middleware error:', err);
        res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
        return;
    }
}; 