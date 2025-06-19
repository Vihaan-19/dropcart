export const ORDER_ERRORS = {
  NOT_FOUND: 'Order not found',
  UNAUTHORIZED: 'Unauthorized to access this order',
  INVALID_STATUS: 'Invalid order status',
  CANNOT_UPDATE: 'Cannot update order',
  CANNOT_CANCEL: 'Cannot cancel order',
};

export const PAYMENT_ERRORS = {
  NOT_FOUND: 'Payment not found',
  PROCESS_FAILED: 'Payment processing failed',
  REFUND_FAILED: 'Refund failed',
  UNAUTHORIZED: 'Unauthorized to access this payment',
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

export const ROLES = {
  ADMIN: 'ADMIN',
  VENDOR: 'VENDOR',
  CUSTOMER: 'CUSTOMER',
}; 