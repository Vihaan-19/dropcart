import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler, notFoundHandler } from './utils/error';
import { requestLogger, errorLogger } from './middlewares/logging.middleware';
import { serveSwagger } from './config/swagger';
import routes from './routes';

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(requestLogger);

// API Documentation
app.use('/api-docs', ...serveSwagger);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'auth-service' });
});

// Routes
app.use('/api', routes);

// Error handling
app.use(notFoundHandler);
app.use(errorLogger);
app.use(errorHandler);

export default app; 