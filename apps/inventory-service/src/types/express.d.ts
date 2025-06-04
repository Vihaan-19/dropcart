import 'express';

declare global {
  namespace Express {
    interface Request {
      user?: { // Define the structure of the user object based on what your API Gateway provides (aligned with auth-service)
        userId: string; // Changed from 'id' to 'userId' to match auth-service
        role: string; // Assuming role is also passed by the gateway
        // Add other user properties if needed
      };
    }
  }
} 