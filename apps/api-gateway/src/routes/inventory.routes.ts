import { Router } from 'express';
import type { RequestHandler } from 'express';
import { forwardToInventory } from '../services/inventory.service';

const inventoryRoutes = Router();

// Define routes for Inventory, Product, and Vendor services as per OpenAPI spec (consolidated)
// These paths are relative to the router's mount point (/products)

// --- Product Endpoints (/products/* in OpenAPI) ---

// GET /products
inventoryRoutes.get('/', ((req, res, next) => forwardToInventory('get', req, res, next)) as RequestHandler);

// POST /products
inventoryRoutes.post('/', ((req, res, next) => forwardToInventory('post', req, res, next)) as RequestHandler);

// GET /products/{productId}
inventoryRoutes.get('/:productId', ((req, res, next) => forwardToInventory('get', req, res, next)) as RequestHandler);

// PUT /products/{productId}
inventoryRoutes.put('/:productId', ((req, res, next) => forwardToInventory('put', req, res, next)) as RequestHandler);

// DELETE /products/{productId}
inventoryRoutes.delete('/:productId', ((req, res, next) => forwardToInventory('delete', req, res, next)) as RequestHandler);

// --- Vendor Endpoints (/vendors/* in OpenAPI) ---
// These will be accessed externally via /products/vendors/*

// GET /vendors
inventoryRoutes.get('/vendors', ((req, res, next) => forwardToInventory('get', req, res, next)) as RequestHandler);

// POST /vendors
inventoryRoutes.post('/vendors', ((req, res, next) => forwardToInventory('post', req, res, next)) as RequestHandler);

// GET /vendors/{vendorId}
inventoryRoutes.get('/vendors/:vendorId', ((req, res, next) => forwardToInventory('get', req, res, next)) as RequestHandler);

// GET /vendors/my-store
inventoryRoutes.get('/vendors/my-store', ((req, res, next) => forwardToInventory('get', req, res, next)) as RequestHandler);

// PUT /vendors/my-store
inventoryRoutes.put('/vendors/my-store', ((req, res, next) => forwardToInventory('put', req, res, next)) as RequestHandler);

// --- Inventory Endpoints (/inventory/* in OpenAPI) ---
// These will be accessed externally via /products/inventory/*

// GET /inventory/{productId}
inventoryRoutes.get('/inventory/:productId', ((req, res, next) => forwardToInventory('get', req, res, next)) as RequestHandler);

// PUT /inventory/{productId}
inventoryRoutes.put('/inventory/:productId', ((req, res, next) => forwardToInventory('put', req, res, next)) as RequestHandler);

// GET /inventory/logs/{productId}
inventoryRoutes.get('/inventory/:productId/logs', ((req, res, next) => forwardToInventory('get', req, res, next)) as RequestHandler);

export default inventoryRoutes; 