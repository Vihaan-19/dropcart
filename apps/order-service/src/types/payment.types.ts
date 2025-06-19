export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
export type PaymentMethod = 'CREDIT_CARD' | 'DEBIT_CARD' | 'PAYPAL' | 'STRIPE';

export interface ProcessPaymentInput {
  orderId: string;
  method: PaymentMethod;
  amount: number;
}

export interface RefundPaymentInput {
  paymentId: string;
  amount?: number;
} 