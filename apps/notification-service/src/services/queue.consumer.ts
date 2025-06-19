import amqp from 'amqplib';
import { NotificationService } from './notification.service';
import logger from '../utils/logger';

const QUEUE = 'notifications';
const EVENTS = [
  'order.created',
  'order.status_updated',
  'stock.low',
  'product.out_of_stock',
];

export class QueueConsumerService {
  static async start() {
    const conn = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
    const channel = await conn.createChannel();
    await channel.assertQueue(QUEUE, { durable: true });
    logger.info(`Listening to RabbitMQ queue: ${QUEUE}`);
    channel.consume(QUEUE, async (msg) => {
      if (!msg) return;
      try {
        const event = JSON.parse(msg.content.toString());
        if (EVENTS.includes(event.type)) {
          await NotificationService.processNotification(event.payload);
        }
        channel.ack(msg);
      } catch (err) {
        logger.error('Failed to process queue message:', err);
        channel.nack(msg, false, false);
      }
    });
  }
} 