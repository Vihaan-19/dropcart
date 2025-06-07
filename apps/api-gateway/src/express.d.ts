// src/types/express/index.d.ts (or just src/types/express.d.ts)
import { UserRole } from './middlewares/authorization.middleware';

declare module 'express' {
  export interface Request {
    user?: {
      userId: string;
      role: UserRole;
      [key: string]: any;
    };
  }
}
