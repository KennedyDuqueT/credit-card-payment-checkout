import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { processPayment, setCurrentTransaction } from '../../store/appSlice';
import { RootStackParamList } from '../../types';
import { Alert } from 'react-native';

type PaymentSummaryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PaymentSummary'>;
type PaymentSummaryScreenRouteProp = RouteProp<RootStackParamList, 'PaymentSummary'>;

export const usePaymentSummaryScreen = () => {
  const navigation = useNavigation<PaymentSummaryScreenNavigationProp>();
  const route = useRoute<PaymentSummaryScreenRouteProp>();
  const dispatch = useDispatch<AppDispatch>();
  const { cart, loading } = useSelector((state: RootState) => state.app);
  const { paymentData } = route.params;

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const handleProcessPayment = async () => {
    try {
      const paymentDataWithProduct = {
        ...paymentData,
        productId: cart[0].product.id, // Assuming single product for simplicity
      };

      const result = await dispatch(processPayment(paymentDataWithProduct)).unwrap();
      
      if (result.success) {
        // Create a mock transaction for the result screen
        const transaction = {
          id: Date.now(),
          transactionNumber: result.transactionNumber,
          status: 'APPROVED' as const,
          amount: calculateTotal(),
          customerEmail: paymentData.customerEmail,
          customerName: paymentData.customerName,
          cardNumber: paymentData.cardNumber,
          cardExpiryMonth: paymentData.cardExpiryMonth,
          cardExpiryYear: paymentData.cardExpiryYear,
          cardCvv: paymentData.cardCvv,
          paymentGatewayTransactionId: result.paymentGatewayTransactionId,
          product: cart[0].product,
          productId: cart[0].product.id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        dispatch(setCurrentTransaction(transaction));
        navigation.navigate('TransactionResult', { transaction });
      } else {
        Alert.alert('Error', result.message || 'El pago no pudo ser procesado');
      }
    } catch (error) {
      console.error('Payment error:', error);
      Alert.alert(
        'Error de Pago', 
        'El pago no pudo ser procesado. Esto puede deberse a datos de prueba en el entorno sandbox. Por favor, intenta con datos diferentes o contacta al soporte.',
        [{ text: 'OK' }]
      );
    }
  };

  return {
    cart,
    loading,
    paymentData,
    calculateTotal,
    handleProcessPayment,
  };
};
