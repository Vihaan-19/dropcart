import { Router } from 'express';
import { getNotifications } from '../controllers/notifications.controller';
import asyncHandler from '../utils/asyncHandler';

const router = Router();

router.get('/', asyncHandler(getNotifications));

export default router; 