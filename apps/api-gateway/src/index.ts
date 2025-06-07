import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { authenticate } from './middlewares/auth.middleware';
import authRoutes from './routes/auth.routes'; // Use relative path from the root of src
import inventoryRoutes from './routes/inventory.routes';
import ordersRoutes from './routes/orders.routes'; // Import orders and now payments routes
// import paymentsRoutes from './routes/payments.routes'; // Removed for consolidation
import notificationsRoutes from './routes/notifications.routes'; // Import notifications routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// --- Health Check ---
app.get('/', (_req: Request, res: Response) => {
  res.send('API Gateway is running!').status(200);
});

// --- Routes ---
// Auth service routes (public + protected handled inside routes)
app.use('/auth', authRoutes);

// Inventory service routes (protected by authentication middleware)
app.use('/inventory', authenticate, inventoryRoutes);

// Orders and Payments service routes (protected by authentication middleware)
app.use('/orders', authenticate, ordersRoutes); // Mount consolidated orders and payments routes

// Notifications service routes (protected by authentication middleware)
app.use('/notifications', authenticate, notificationsRoutes); // Mount notifications routes

// app.use('/payments', authenticate, paymentsRoutes); // Removed for consolidation

// --- Global Error Handler ---
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('API Gateway Error:', err);

  const statusCode = err.response?.status || 500;
  const message = err.response?.data?.message || err.message || 'Internal API Gateway Error';

  res.status(statusCode).json({ message });
});

// --- Server Start ---
app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on port ${PORT}`);
});
