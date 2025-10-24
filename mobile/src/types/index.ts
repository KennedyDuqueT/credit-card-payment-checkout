// Product types
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Cart types
export interface CartItem {
  product: Product;
  quantity: number;
}

// Payment types
export interface PaymentData {
  productId: number;
  customerEmail: string;
  customerName: string;
  cardNumber: string;
  cardExpiryMonth: string;
  cardExpiryYear: string;
  cardCvv: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionNumber: string;
  message: string;
  paymentGatewayTransactionId?: string;
}

// Transaction types
export interface Transaction {
  id: number;
  transactionNumber: string;
  status: 'PENDING' | 'APPROVED' | 'DECLINED' | 'FAILED';
  amount: number;
  customerEmail: string;
  customerName: string;
  cardNumber: string;
  cardExpiryMonth: string;
  cardExpiryYear: string;
  cardCvv: string;
  paymentGatewayTransactionId?: string;
  paymentGatewayResponse?: string;
  errorMessage?: string;
  product: Product;
  productId: number;
  createdAt: string;
  updatedAt: string;
}

// Navigation types
export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  ProductDetail: { product: Product };
  Cart: undefined;
  PaymentForm: undefined;
  PaymentSummary: { paymentData: PaymentData };
  TransactionResult: { transaction: Transaction };
};

// Redux state types
export interface AppState {
  products: Product[];
  cart: CartItem[];
  currentTransaction: Transaction | null;
  loading: boolean;
  error: string | null;
}
