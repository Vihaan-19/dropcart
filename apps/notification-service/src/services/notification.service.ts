import prisma from './prisma.client';
import { EmailService } from './email.service';
import { SmsService } from './sms.service';
import { WebSocketGateway } from './websocket.gateway';
import { NotificationType, NotificationStatus } from '@prisma/client';
import logger from '../utils/logger';

export class NotificationService {
  static async processNotification({
    type,
    message,
    recipientEmail,
    recipientPhone,
    userId,
    relatedOrderId,
  }: {
    type: NotificationType;
    message: string;
    recipientEmail?: string;
    recipientPhone?: string;
    userId?: string;
    relatedOrderId?: string;
  }) {
    const notification = await prisma.notification.create({
      data: {
        type,
        message,
        recipientEmail,
        recipientPhone,
        userId,
        status: NotificationStatus.PENDING,
        relatedOrderId,
      },
    });
    try {
      if (type === NotificationType.EMAIL && recipientEmail) {
        await EmailService.sendEmail(recipientEmail, 'Notification', message);
      } else if (type === NotificationType.SMS && recipientPhone) {
        await SmsService.sendSms(recipientPhone, message);
      } else if (type === NotificationType.WS && userId) {
        WebSocketGateway.broadcast('notification', { userId, message });
      }
      await prisma.notification.update({
        where: { id: notification.id },
        data: { status: NotificationStatus.SENT },
      });
    } catch (err) {
      logger.error('Notification send failed:', err);
      await prisma.notification.update({
        where: { id: notification.id },
        data: { status: NotificationStatus.FAILED },
      });
    }
  }
} 