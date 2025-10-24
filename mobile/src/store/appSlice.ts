import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, PaymentData, Transaction, AppState } from '../types';

import { API_CONFIG } from '../constants';
import { paymentService } from '../services/paymentService';

// Async thunks
export const fetchProducts = createAsyncThunk(
  'app/fetchProducts',
  async () => {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCTS}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  }
);

export const processPayment = createAsyncThunk(
  'app/processPayment',
  async (paymentData: PaymentData) => {
    const response = await paymentService.processPayment(paymentData);
    return response;
  }
);

// Initial state
const initialState: AppState = {
  products: [],
  cart: [],
  currentTransaction: null,
  loading: false,
  error: null,
};

// Slice
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.cart.find(cartItem => cartItem.product.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ product: action.payload, quantity: 1 });
      }
    },
    decreaseCartQuantity: (state, action: PayloadAction<number>) => {
      const existingItem = state.cart.find(cartItem => cartItem.product.id === action.payload);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          // Solo eliminar si la cantidad es 1
          state.cart = state.cart.filter(item => item.product.id !== action.payload);
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter(item => item.product.id !== action.payload);
    },
    updateCartQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
      const existingItem = state.cart.find(cartItem => cartItem.product.id === action.payload.productId);
      if (existingItem) {
        if (action.payload.quantity <= 0) {
          state.cart = state.cart.filter(item => item.product.id !== action.payload.productId);
        } else {
          existingItem.quantity = action.payload.quantity;
        }
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
    setCurrentTransaction: (state, action: PayloadAction<Transaction | null>) => {
      state.currentTransaction = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      // Process payment
      .addCase(processPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(processPayment.fulfilled, (state) => {
        state.loading = false;
        // Payment response will be handled in the component
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Payment failed';
      });
  },
});

export const {
  addToCart,
  decreaseCartQuantity,
  removeFromCart,
  updateCartQuantity,
  clearCart,
  setCurrentTransaction,
  clearError,
} = appSlice.actions;

export default appSlice.reducer;
