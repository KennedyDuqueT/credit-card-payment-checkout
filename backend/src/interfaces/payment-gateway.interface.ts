// Interfaces para Payment Gateway API
export interface PaymentGatewayConfig {
  baseUrl: string;
  publicKey: string;
  privateKey: string;
  integrityKey: string;
}

export interface PaymentTokenResponse {
  data: {
    id: string;
  };
}

export interface PaymentTransactionResponse {
  data: {
    id: string;
    status: string;
    status_message?: string;
  };
}

export interface PaymentData {
  amount_in_cents: number;
  currency: string;
  customer_email: string;
  payment_method: {
    type: string;
    installments: number;
    token: string;
  };
  reference: string;
  payment_source_id: number;
}
