# API Gateway

A robust API Gateway service built with Express.js that handles routing, authentication, and request forwarding to various microservices.

## Features

- 🔒 Authentication & Authorization
- 🛡️ Rate Limiting
- 🔄 Request Forwarding
- 🏗️ Microservices Integration
- 🚀 High Performance
- 🔍 Request Logging
- 🛡️ Security Headers (Helmet)

## Project Structure

```
└── 📁api-gateway
    └── 📁src
        └── express.d.ts           # Express type definitions
        └── index.ts              # Application entry point
        └── 📁middlewares
            └── auth.middleware.ts        # Authentication middleware
            └── authorization.middleware.ts # Authorization middleware
        └── 📁routes
            └── auth.routes.ts           # Authentication routes
            └── index.ts                 # Route aggregator
            └── inventory.routes.ts      # Inventory routes
            └── notifications.routes.ts  # Notification routes
            └── orders.routes.ts         # Order routes
        └── 📁services
            └── auth.service.ts          # Auth service proxy
            └── inventory.service.ts     # Inventory service proxy
            └── notifications.service.ts # Notifications service proxy
            └── orders.service.ts        # Orders service proxy
            └── proxy.service.ts         # Base proxy service
    └── .env                    # Environment variables
    └── Dockerfile             # Docker configuration
    └── package.json           # Project dependencies
    └── README.md             # Project documentation
    └── tsconfig.json         # TypeScript configuration
```

## Services Integration

The API Gateway integrates with the following microservices:

- **Auth Service** (`/auth/*`)
  - User authentication
  - User management
  - Profile management

- **Inventory Service** (`/inventory/*`)
  - Product management
  - Vendor management
  - Inventory tracking
  - Stock management

- **Orders Service** (`/orders/*`)
  - Order processing
  - Payment handling
  - Order status management

- **Notifications Service** (`/notifications/*`)
  - User notifications
  - Notification preferences

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Refresh authentication token
- `GET /auth/users/profile` - Get user profile
- `PUT /auth/users/profile` - Update user profile

### Products and Inventory
- `GET /inventory` - List all products
- `POST /inventory` - Create new product
- `GET /inventory/:productId` - Get product details
- `PUT /inventory/:productId` - Update product
- `DELETE /inventory/:productId` - Delete product

#### Inventory Management
- `GET /inventory/inventory/:productId` - Get product inventory
- `PUT /inventory/inventory/:productId` - Update product inventory
- `GET /inventory/inventory/:productId/logs` - Get inventory logs

#### Vendor Management
- `GET /inventory/vendors` - List all vendors
- `POST /inventory/vendors` - Create new vendor
- `GET /inventory/vendors/:vendorId` - Get vendor details
- `GET /inventory/vendors/my-store` - Get my store details
- `PUT /inventory/vendors/my-store` - Update my store

### Orders
- `GET /orders` - Get user orders
- `POST /orders` - Create new order
- `GET /orders/:orderId` - Get order by ID
- `PUT /orders/:orderId` - Update order status
- `DELETE /orders/:orderId` - Cancel order

### Payments
- `POST /orders/payments/process` - Process payment for order
- `GET /orders/payments/:paymentId` - Get payment details
- `POST /orders/payments/refund/:paymentId` - Process refund

### Notifications
- `GET /notifications` - Get user notifications
- `PUT /notifications/:notificationId/read` - Mark notification as read

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```env
PORT=8080
AUTH_SERVICE_URL=http://localhost:4000
INVENTORY_SERVICE_URL=http://localhost:4001
ORDER_SERVICE_URL=http://localhost:4003
NOTIFICATION_SERVICE_URL=http://localhost:4004
```

3. Start the development server:
```bash
npm run dev
```

## Security

- Rate limiting: 100 requests per 15 minutes per IP
- Helmet.js for security headers
- Authentication middleware for protected routes
- Request validation
- Error handling

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Error Handling

The API Gateway implements a global error handler that:
- Logs errors with stack traces
- Returns appropriate HTTP status codes
- Provides user-friendly error messages
- Handles service communication errors

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License. 