import { Router } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const inventoryRoutes = Router();

const INVENTORY_SERVICE_URL = process.env.INVENTORY_SERVICE_URL || 'http://localhost:3002';

// Helper to forward requests to the consolidated Inventory/Product/Vendor service
const forwardToInventory = async (method: 'get' | 'post' | 'put' | 'delete', req: any, res: any, next: any) => {
  try {
    // Use req.path which is the path relative to the router's mount point (/products)
    const url = `${INVENTORY_SERVICE_URL}${req.path}`;
    const headers = {
      // Removed Authorization header as token is verified in API Gateway
      'X-User-Id': req.user?.userId, // Assuming authenticate middleware adds req.user
      'X-User-Role': req.user?.role,
      'Content-Type': req.headers['content-type'],
    };

    const config: any = { method, url, headers };

    if (method === 'post' || method === 'put') {
      config.data = req.body;
    } else if (method === 'get') {
        config.params = req.query;
    }

    const response = await axios(config);

    res.status(response.status).json(response.data);
  } catch (error) {
    // Improved error handling to propagate downstream service errors
    if (axios.isAxiosError(error) && error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    next(error); // Pass other errors to the global error handler
  }
};

// Define routes for Inventory, Product, and Vendor services as per OpenAPI spec (consolidated)
// These paths are relative to the router's mount point (/products)

// --- Product Endpoints (/products/* in OpenAPI) ---

// GET /products
inventoryRoutes.get('/', (req, res, next) => forwardToInventory('get', req, res, next));

// POST /products
inventoryRoutes.post('/', (req, res, next) => forwardToInventory('post', req, res, next));

// GET /products/{productId}
inventoryRoutes.get('/:productId', (req, res, next) => forwardToInventory('get', req, res, next));

// PUT /products/{productId}
inventoryRoutes.put('/:productId', (req, res, next) => forwardToInventory('put', req, res, next));

// DELETE /products/{productId}
inventoryRoutes.delete('/:productId', (req, res, next) => forwardToInventory('delete', req, res, next));

// --- Vendor Endpoints (/vendors/* in OpenAPI) ---
// These will be accessed externally via /products/vendors/*

// GET /vendors
inventoryRoutes.get('/vendors', (req, res, next) => forwardToInventory('get', req, res, next));

// POST /vendors
inventoryRoutes.post('/vendors', (req, res, next) => forwardToInventory('post', req, res, next));

// GET /vendors/{vendorId}
inventoryRoutes.get('/vendors/:vendorId', (req, res, next) => forwardToInventory('get', req, res, next));

// GET /vendors/my-store
inventoryRoutes.get('/vendors/my-store', (req, res, next) => forwardToInventory('get', req, res, next));

// PUT /vendors/my-store
inventoryRoutes.put('/vendors/my-store', (req, res, next) => forwardToInventory('put', req, res, next));

// --- Inventory Endpoints (/inventory/* in OpenAPI) ---
// These will be accessed externally via /products/inventory/*

// GET /inventory/{productId}
inventoryRoutes.get('/inventory/:productId', (req, res, next) => forwardToInventory('get', req, res, next));

// PUT /inventory/{productId}
inventoryRoutes.put('/inventory/:productId', (req, res, next) => forwardToInventory('put', req, res, next));

// GET /inventory/logs/{productId}
inventoryRoutes.get('/inventory/logs/:productId', (req, res, next) => forwardToInventory('get', req, res, next));

export default inventoryRoutes; 