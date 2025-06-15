import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import type { RequestHandler } from 'express';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                 // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
}) as unknown as express.RequestHandler;

app.use(limiter);

// --- Health Check ---
app.get('/', (_req: Request, res: Response) => {
  res.status(200).send('API Gateway is running!');
});

// --- Route Handling ---
app.use('/', routes);

// --- Global Error Handler ---
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('🔥 API Gateway Error:', {
    message: err.message,
    status: err.response?.status,
    stack: err.stack,
  });

  const statusCode = err.response?.status || 500;
  const message = err.response?.data?.message || err.message || 'Internal API Gateway Error';

  res.status(statusCode).json({ error: 'Gateway Error', message });
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on port ${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('👋 API Gateway shutting down gracefully...');
  process.exit();
});
