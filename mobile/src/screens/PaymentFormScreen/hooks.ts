import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { RootStackParamList } from '../../types';
import { validationUtils } from '../../utils/validation';
import { Alert, Keyboard } from 'react-native';

type PaymentFormScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PaymentForm'>;

export const usePaymentFormScreen = () => {
  const navigation = useNavigation<PaymentFormScreenNavigationProp>();
  const { cart } = useSelector((state: RootState) => state.app);

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    cardNumber: '',
    cardExpiryMonth: '',
    cardExpiryYear: '',
    cardCvv: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputFocus = () => {
    // Dismiss keyboard when tapping outside inputs
    Keyboard.dismiss();
  };

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;
    
    // Format card number with spaces
    if (field === 'cardNumber') {
      const cleanedValue = value.replace(/\s/g, '');
      if (cleanedValue.length <= 19) {
        formattedValue = cleanedValue.replace(/(\d{4})/g, '$1 ').trim();
      } else {
        return; // Don't update if too long
      }
    }
    
    // Format expiry month (add leading zero)
    if (field === 'cardExpiryMonth' && value.length === 1 && parseInt(value, 10) > 1) {
      formattedValue = '0' + value;
    }
    
    setFormData(prev => ({ ...prev, [field]: formattedValue }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'El nombre es requerido';
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'El email es requerido';
    } else if (!validationUtils.isValidEmail(formData.customerEmail)) {
      newErrors.customerEmail = 'El email no es válido';
    }

    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'El número de tarjeta es requerido';
    } else if (!validationUtils.isValidCardNumber(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'El número de tarjeta no es válido';
    }

    if (!formData.cardExpiryMonth.trim()) {
      newErrors.cardExpiryMonth = 'El mes de expiración es requerido';
    } else if (!validationUtils.isValidExpiryMonth(formData.cardExpiryMonth)) {
      newErrors.cardExpiryMonth = 'El mes debe estar entre 01 y 12';
    }

    if (!formData.cardExpiryYear.trim()) {
      newErrors.cardExpiryYear = 'El año de expiración es requerido';
    } else if (!validationUtils.isValidExpiryYear(formData.cardExpiryYear)) {
      newErrors.cardExpiryYear = 'El año debe ser 2024 o posterior';
    }

    if (!formData.cardCvv.trim()) {
      newErrors.cardCvv = 'El CVV es requerido';
    } else if (!validationUtils.isValidCvv(formData.cardCvv)) {
      newErrors.cardCvv = 'El CVV debe tener 3 o 4 dígitos';
    }

    // Check if card is expired
    if (formData.cardExpiryMonth && formData.cardExpiryYear) {
      if (validationUtils.isCardExpired(formData.cardExpiryMonth, formData.cardExpiryYear)) {
        newErrors.cardExpiryMonth = 'La tarjeta ha expirado';
        newErrors.cardExpiryYear = 'La tarjeta ha expirado';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinueToSummary = () => {
    if (!validateForm()) {
      Alert.alert('Error', 'Por favor corrige los errores en el formulario');
      return;
    }

    if (cart.length === 0) {
      Alert.alert('Error', 'No hay productos en el carrito');
      return;
    }

    // Navigate to payment summary with form data
    const paymentDataWithProduct = {
      ...formData,
      cardNumber: formData.cardNumber.replace(/\s/g, ''), // Remove spaces for API
      productId: cart[0].product.id, // Assuming single product for simplicity
    };
    navigation.navigate('PaymentSummary', { paymentData: paymentDataWithProduct });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  return {
    formData,
    errors,
    handleInputChange,
    handleInputFocus,
    handleContinueToSummary,
    calculateTotal,
  };
};
