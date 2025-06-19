export const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';
export const EMAIL_HOST = process.env.EMAIL_HOST || '';
export const EMAIL_PORT = process.env.EMAIL_PORT ? Number(process.env.EMAIL_PORT) : 587;
export const EMAIL_USER = process.env.EMAIL_USER || '';
export const EMAIL_PASS = process.env.EMAIL_PASS || '';
export const WS_PORT = process.env.WS_PORT ? Number(process.env.WS_PORT) : 8081; 