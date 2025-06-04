"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Import routes
const vendors_routes_1 = __importDefault(require("./routes/vendors.routes"));
const products_routes_1 = __importDefault(require("./routes/products.routes"));
const inventory_routes_1 = __importDefault(require("./routes/inventory.routes"));
const error_middleware_1 = require("./middlewares/error.middleware");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3002; // Example port
app.use(express_1.default.json());
// Use routes
app.use('/vendors', vendors_routes_1.default);
app.use('/products', products_routes_1.default);
app.use('/inventory', inventory_routes_1.default);
app.get('/', (req, res) => {
    res.send('Inventory service is running!');
});
// Error handling middleware
app.use(error_middleware_1.errorHandler);
app.listen(PORT, () => {
    console.log(`Inventory service running on port ${PORT}`);
});
