import { Request, Response, NextFunction, RequestHandler } from 'express';

// Define strict user roles
export const UserRole = {
  ADMIN: 'Admin',
  VENDOR: 'Vendor',
  CUSTOMER: 'Customer',
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export const authorize = (allowedRoles: UserRole[]): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user; 

    if (!user) {
      res.status(401).json({ message: 'Unauthorized: User not authenticated' });
      return;
    }

    const { role } = user;

    if (!allowedRoles.includes(role as UserRole)) {
      res.status(403).json({ message: 'Forbidden: Access denied for role' });
      return;
    }

    next();
  };
}; 