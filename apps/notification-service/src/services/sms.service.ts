import logger from '../utils/logger';

export class SmsService {
  static async sendSms(phone: string, message: string) {
    // Placeholder for real SMS integration (e.g., Twilio)
    logger.info(`SMS sent to ${phone}: ${message}`);
    // throw new Error('SMS sending not implemented');
  }
} 