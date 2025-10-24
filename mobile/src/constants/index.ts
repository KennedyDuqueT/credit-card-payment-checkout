// API Configuration
export const API_CONFIG = {
  BASE_URL: __DEV__ ? 'http://192.168.1.7:3001' : 'https://your-production-api.com',
  ENDPOINTS: {
    PRODUCTS: '/products',
    PAYMENTS: '/payments',
  },
};

// Payment Gateway Configuration
export const PAYMENT_CONFIG = {
  CARD_TYPES: {
    VISA: 'visa',
    MASTERCARD: 'mastercard',
    AMERICAN_EXPRESS: 'amex',
  },
  CARD_LENGTHS: {
    VISA: [13, 16, 19],
    MASTERCARD: [16],
    AMERICAN_EXPRESS: [15],
  },
  CVV_LENGTHS: {
    VISA: 3,
    MASTERCARD: 3,
    AMERICAN_EXPRESS: 4,
  },
};

// Validation Rules
export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  CARD_NUMBER: /^\d{13,19}$/,
  CVV: /^\d{3,4}$/,
  EXPIRY_MONTH: /^(0[1-9]|1[0-2])$/,
  EXPIRY_YEAR: /^(20[2-9][0-9]|2[1-9][0-9][0-9])$/,
};

// UI Constants
export const UI_CONSTANTS = {
  COLORS: {
    PRIMARY: '#007BFF',
    SECONDARY: '#6C757D',
    SUCCESS: '#28A745',
    ERROR: '#DC3545',
    WARNING: '#FFC107',
    BACKGROUND: '#F8F9FA',
    CARD: '#FFFFFF',
    TEXT: '#2C3E50',
    TEXT_SECONDARY: '#6C757D',
    BORDER: '#E9ECEF',
  },
  SPACING: {
    XS: 4,
    SM: 8,
    MD: 16,
    LG: 24,
    XL: 32,
  },
  BORDER_RADIUS: {
    SM: 8,
    MD: 12,
    LG: 16,
  },
};
