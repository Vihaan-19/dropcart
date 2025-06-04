import 'express';
import { UserRole } from '../middlewares/authorization.middleware'; // Adjust path if needed

declare global {
  namespace Express {
    interface Request {
      user?: { // Define the structure of the user object as provided by the auth service
        userId: string;
        role: UserRole; 
        email?: string;
        name?: string;
      };
    }
  }
} 