import { User } from "@prisma/client";

export type UpdateProfileInput = {
  name?: string;
  role?: User['role'];
};

export type PublicUser = {
  id: string;
  name: string;
  email: string;
  role: User['role'];
}; 