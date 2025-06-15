# Auth Service

A robust authentication and user management service built with Express.js, TypeScript, and Prisma. This service handles user authentication, authorization, and profile management for the DropCart platform.

## Features

- 🔒 JWT-based Authentication
- 👤 User Management
- 🔐 Role-based Authorization
- 🛡️ Password Hashing
- 📝 Request Validation
- 🔍 Request Logging
- 📚 API Documentation (Swagger)
- 🛡️ Security Headers (Helmet)
- 🎯 Type Safety with TypeScript

## Project Structure

```
└── 📁auth-service
    └── 📁src
        └── app.ts                # Express app configuration
        └── 📁config
            └── config.ts         # Environment configuration
            └── constants.ts      # Application constants
            └── swagger.ts        # API documentation
        └── 📁controllers
            └── auth.controller.ts    # Authentication handlers
            └── user.controller.ts    # User management handlers
        └── 📁middlewares
            └── auth.middleware.ts    # JWT authentication
            └── logging.middleware.ts # Request logging
        └── 📁routes
            └── auth.routes.ts    # Authentication routes
            └── user.routes.ts    # User management routes
            └── index.ts          # Route aggregator
        └── 📁services
            └── auth.service.ts   # Authentication business logic
            └── user.service.ts   # User management business logic
            └── prisma.client.ts  # Database client
        └── 📁types
            └── auth.types.ts     # Authentication types
            └── user.types.ts     # User management types
            └── express.d.ts      # Express type extensions
        └── 📁utils
            └── asyncHandler.ts   # Async error handling
            └── error.ts          # Error handling utilities
            └── jwt.ts            # JWT utilities
            └── logger.ts         # Logging utilities
            └── validate.ts       # Request validation
        └── 📁validators
            └── auth.validator.ts # Authentication schemas
            └── user.validator.ts # User management schemas
    └── 📁prisma
        └── schema.prisma        # Database schema
        └── 📁migrations         # Database migrations
    └── .env                    # Environment variables
    └── Dockerfile             # Docker configuration
    └── package.json           # Project dependencies
    └── tsconfig.json         # TypeScript configuration
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
  - Required fields: name, email, password, role
- `POST /api/auth/login` - User login
  - Required fields: email, password
- `POST /api/auth/logout` - User logout
  - Requires authentication
- `POST /api/auth/refresh` - Refresh authentication token
  - Requires authentication

### User Management
- `GET /api/users/me` - Get user profile
  - Requires authentication
- `PUT /api/users/profile` - Update user profile
  - Requires authentication
  - Optional fields: name, email, currentPassword, newPassword

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```env
PORT=4000
DATABASE_URL="postgresql://user:password@localhost:5432/auth_db"
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="1d"
CORS_ORIGIN="http://localhost:3000"
```

3. Set up the database:
```bash
npx prisma migrate dev
```

4. Start the development server:
```bash
npm run dev
```

## Security

- JWT-based authentication
- Password hashing with bcrypt
- Request validation with Zod
- Helmet.js for security headers
- CORS configuration
- Rate limiting
- Error handling

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run database migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate
```

## Error Handling

The service implements a global error handler that:
- Logs errors with stack traces
- Returns appropriate HTTP status codes
- Provides user-friendly error messages
- Handles database errors
- Validates request data

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License. 