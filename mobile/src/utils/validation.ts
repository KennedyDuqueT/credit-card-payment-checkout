import { VALIDATION_RULES, PAYMENT_CONFIG } from '../constants';

export const validationUtils = {
  // Email validation
  isValidEmail(email: string): boolean {
    return VALIDATION_RULES.EMAIL.test(email);
  },

  // Card number validation
  isValidCardNumber(cardNumber: string): boolean {
    const cleanedNumber = cardNumber.replace(/\s/g, '');
    return VALIDATION_RULES.CARD_NUMBER.test(cleanedNumber);
  },

  // CVV validation
  isValidCvv(cvv: string): boolean {
    return VALIDATION_RULES.CVV.test(cvv);
  },

  // Expiry month validation
  isValidExpiryMonth(month: string): boolean {
    return VALIDATION_RULES.EXPIRY_MONTH.test(month);
  },

  // Expiry year validation
  isValidExpiryYear(year: string): boolean {
    return VALIDATION_RULES.EXPIRY_YEAR.test(year);
  },

  // Card type detection
  getCardType(cardNumber: string): string {
    const cleanedNumber = cardNumber.replace(/\s/g, '');
    
    if (cleanedNumber.startsWith('4')) {
      return PAYMENT_CONFIG.CARD_TYPES.VISA;
    } else if (cleanedNumber.startsWith('5') || cleanedNumber.startsWith('2')) {
      return PAYMENT_CONFIG.CARD_TYPES.MASTERCARD;
    } else if (cleanedNumber.startsWith('3')) {
      return PAYMENT_CONFIG.CARD_TYPES.AMERICAN_EXPRESS;
    }
    
    return '';
  },

  // Format card number with spaces
  formatCardNumber(cardNumber: string): string {
    const cleanedNumber = cardNumber.replace(/\s/g, '');
    const cardType = this.getCardType(cleanedNumber);
    
    if (cardType === PAYMENT_CONFIG.CARD_TYPES.AMERICAN_EXPRESS) {
      return cleanedNumber.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3');
    } else {
      return cleanedNumber.replace(/(\d{4})/g, '$1 ').trim();
    }
  },

  // Format expiry date
  formatExpiryDate(month: string, year: string): string {
    return `${month}/${year}`;
  },

  // Check if card is expired
  isCardExpired(month: string, year: string): boolean {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    
    const cardYear = parseInt(year, 10);
    const cardMonth = parseInt(month, 10);
    
    if (cardYear < currentYear) return true;
    if (cardYear === currentYear && cardMonth < currentMonth) return true;
    
    return false;
  },
};
