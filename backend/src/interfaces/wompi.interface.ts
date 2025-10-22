// Interfaces para Wompi API
export interface WompiConfig {
  baseUrl: string;
  publicKey: string;
  privateKey: string;
  integrityKey: string;
}

export interface WompiTokenResponse {
  data: {
    id: string;
  };
}

export interface WompiTransactionResponse {
  data: {
    id: string;
    status: string;
    status_message?: string;
  };
}

export interface WompiPaymentData {
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
