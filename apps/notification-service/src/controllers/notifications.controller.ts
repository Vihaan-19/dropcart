import { Request, Response } from 'express';
import prisma from '../services/prisma.client';

export const getNotifications = async (req: Request, res: Response) => {
  const notifications = await prisma.notification.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  });
  res.json({ notifications });
}; 