import prisma from './prisma.client';
import { NotFoundError } from '../utils/error';
import { USER_ERRORS } from '../config/constants';
import type { UpdateProfileInput } from '../types/user.types';

export const getUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  if (!user) {
    throw new NotFoundError(USER_ERRORS.NOT_FOUND);
  }

  return user;
};

export const updateProfile = async (userId: string, input: UpdateProfileInput) => {
  try {
    return await prisma.user.update({
      where: { id: userId },
      data: input,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  } catch (error) {
    throw new NotFoundError(USER_ERRORS.NOT_FOUND);
  }
}; 