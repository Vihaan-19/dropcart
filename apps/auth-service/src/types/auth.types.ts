import { User, Role } from '@prisma/client';

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface LoginInput {
  email: string;
  password: string;
}

export type AuthResponse = {
  user: {
    id: string;
    name: string;
    email: string;
    role: User['role'];
  };
  token: string;
};

export type TokenPayload = {
  userId: string;
  role: User['role'];
}; 