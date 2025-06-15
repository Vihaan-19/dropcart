import bcrypt from 'bcrypt';
import prisma from './prisma.client';
import { generateToken } from '../utils/jwt';
import { AuthenticationError, ConflictError } from '../utils/error';
import { AUTH_ERRORS } from '../config/constants';
import type { RegisterInput, LoginInput } from '../types/auth.types';

export const register = async (input: RegisterInput) => {
  const { name, email, password, role } = input;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new ConflictError(AUTH_ERRORS.EMAIL_EXISTS);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, passwordHash, role },
  });

  const token = generateToken({ userId: user.id, role: user.role });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

export const login = async (input: LoginInput) => {
  const { email, password } = input;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    throw new AuthenticationError(AUTH_ERRORS.INVALID_CREDENTIALS);
  }

  const token = generateToken({ userId: user.id, role: user.role });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

export const refreshToken = async (userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new AuthenticationError(AUTH_ERRORS.UNAUTHORIZED);
  }

  return generateToken({ userId: user.id, role: user.role });
}; 