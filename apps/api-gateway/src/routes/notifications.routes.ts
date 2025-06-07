import { Router } from 'express';
import { forwardToNotificationService } from '../services/notifications.service';

const notificationsRoutes = Router();

// Define routes for Notification service as per OpenAPI spec
// These paths are relative to the router's mount point (/notifications)

// GET /notifications
notificationsRoutes.get('/', (req, res, next) => forwardToNotificationService('get', req, res, next));

// PUT /notifications/{notificationId}/read
notificationsRoutes.put('/:notificationId/read', (req, res, next) => forwardToNotificationService('put', req, res, next));

export default notificationsRoutes; 