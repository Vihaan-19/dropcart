import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import prisma from '../services/prisma';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}


const JWT_SECRET: Secret = process.env.JWT_SECRET || 'changeme';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

function generateToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as SignOptions['expiresIn'] });
}


function validateFields(fields: string[], body: Record<string, any>) {
  const missing = fields.filter(field => !body[field]);
  return missing.length > 0 ? `Missing fields: ${missing.join(', ')}` : null;
}

function handleError(res: Response, message: string, err: unknown, code = 500) {
  console.error(err);
  return res.status(code).json({
    error: message,
    ...(err instanceof Error && { details: err.message }),
  });
}

export async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
  const error = validateFields(['name', 'email', 'password', 'role'], req.body);
  if (error) {
    res.status(400).json({ error });
    return;
  }

  const { name, email, password, role } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(409).json({ error: 'Email already exists' });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, passwordHash, role },
    });

    const token = generateToken({ userId: user.id, role: user.role });

    res.status(201).json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token,
    });
    return;
  } catch (err) {
    handleError(res, 'Registration failed', err);
    return;
  }
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  const error = validateFields(['email', 'password'], req.body);
  if (error) {
    res.status(400).json({ error });
    return;
  }

  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const token = generateToken({ userId: user.id, role: user.role });

    res.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token,
    });
    return;
  } catch (err) {
    handleError(res, 'Login failed', err);
    return;
  }
}

export async function refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
  // The authenticateJWT middleware should have attached the user payload to req.user
  const user = (req as any).user; // Cast to any or define a specific AuthRequest type

  if (!user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    // Optionally, verify the user still exists in the database
    const dbUser = await prisma.user.findUnique({
      where: { id: user.userId },
    });

    if (!dbUser) {
       res.status(401).json({ error: 'Unauthorized' });
       return;
    }

    // Generate a new token
    const newToken = generateToken({ userId: dbUser.id, role: dbUser.role });

    res.json({ token: newToken });
    return;
  } catch (err) {
    handleError(res, 'Failed to refresh token', err, 500);
    return;
  }
}

export async function logout(req: Request, res: Response, next: NextFunction): Promise<void> {
  // For a stateless JWT, logout is usually client-side (deleting the token).
  // Server-side logout typically involves token invalidation (e.g., in a database or cache).
  // This is a basic implementation assuming client-side token removal is sufficient,
  // or if you implement token invalidation elsewhere.

  // If you were using a token blacklist/denylist, you would add the current token here.
  // The authenticateJWT middleware would need to be modified to check the blacklist.

  // For now, just confirm success assuming the client will discard the token.
  res.json({ message: 'Logout successful' });
  return;
}
