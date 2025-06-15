export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_EXISTS: 'Email already exists',
  UNAUTHORIZED: 'Unauthorized',
  USER_NOT_FOUND: 'User not found',
  TOKEN_EXPIRED: 'Token expired',
  INVALID_TOKEN: 'Invalid token'
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
};

export const USER_ERRORS = {
  NOT_FOUND: 'User not found',
  UPDATE_FAILED: 'Failed to update user',
  INVALID_ROLE: 'Invalid role',
}; 