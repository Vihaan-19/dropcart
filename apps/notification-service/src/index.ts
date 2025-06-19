import { QueueConsumerService } from './services/queue.consumer';
import logger from './utils/logger';

(async () => {
  try {
    await QueueConsumerService.start();
    logger.info('Queue consumer started');
  } catch (err) {
    logger.error('Failed to start queue consumer:', err);
    process.exit(1);
  }
})(); 