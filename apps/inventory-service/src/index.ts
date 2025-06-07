import express from 'express';
// Import routes
import vendorRoutes from './routes/vendors.routes';
import productRoutes from './routes/products.routes';
import inventoryRoutes from './routes/inventory.routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();
const PORT = process.env.PORT || 4001; // Example port

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'inventory-service' });
});

// Use routes
app.use('/api/vendors', vendorRoutes);
app.use('/api/products', productRoutes);
app.use('/api/inventory', inventoryRoutes);

app.get('/', (req, res) => {
  res.send('Inventory service is running!');
});

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Inventory service running on port ${PORT}`);
}); 