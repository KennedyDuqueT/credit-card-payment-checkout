import { PaymentData, PaymentResponse } from '../types';
import { API_CONFIG } from '../constants';

export const paymentService = {
  async processPayment(paymentData: PaymentData): Promise<PaymentResponse> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PAYMENTS}/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Payment processing failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Payment service error:', error);
      throw error;
    }
  },
};
