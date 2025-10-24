import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { RootStackParamList } from '../types';
import { UI_CONSTANTS } from '../constants';
import { validationUtils } from '../utils/validation';
import { formatCurrency } from '../utils/currency';

type PaymentFormScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PaymentForm'>;

const PaymentFormScreen: React.FC = () => {
  const navigation = useNavigation<PaymentFormScreenNavigationProp>();
  const { cart } = useSelector((state: RootState) => state.app);
  const insets = useSafeAreaInsets();

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    cardNumber: '',
    cardExpiryMonth: '',
    cardExpiryYear: '',
    cardCvv: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

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
    if (field === 'cardExpiryMonth' && value.length === 1 && parseInt(value) > 1) {
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

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Información de Pago</Text>
            <Text style={styles.headerSubtitle}>
              Total a pagar: ${formatCurrency(calculateTotal())}
            </Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Información Personal</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Nombre Completo</Text>
              <TextInput
                style={[styles.input, errors.customerName && styles.inputError]}
                value={formData.customerName}
                onChangeText={(value) => handleInputChange('customerName', value)}
                placeholder="Ingresa tu nombre completo"
                placeholderTextColor="#999999"
                autoCapitalize="words"
              />
              {errors.customerName && (
                <Text style={styles.errorText}>{errors.customerName}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={[styles.input, errors.customerEmail && styles.inputError]}
                value={formData.customerEmail}
                onChangeText={(value) => handleInputChange('customerEmail', value)}
                placeholder="tu@email.com"
                placeholderTextColor="#999999"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.customerEmail && (
                <Text style={styles.errorText}>{errors.customerEmail}</Text>
              )}
            </View>

            <Text style={styles.sectionTitle}>Información de la Tarjeta</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Número de Tarjeta</Text>
              <TextInput
                style={[styles.input, errors.cardNumber && styles.inputError]}
                value={formData.cardNumber}
                onChangeText={(value) => handleInputChange('cardNumber', value)}
                placeholder="1234 5678 9012 3456"
                placeholderTextColor="#999999"
                keyboardType="numeric"
                maxLength={19}
              />
              {errors.cardNumber && (
                <Text style={styles.errorText}>{errors.cardNumber}</Text>
              )}
            </View>

            <View style={styles.rowContainer}>
              <View style={[styles.inputContainer, styles.halfWidth]}>
                <Text style={styles.inputLabel}>Mes</Text>
                <TextInput
                  style={[styles.input, errors.cardExpiryMonth && styles.inputError]}
                  value={formData.cardExpiryMonth}
                  onChangeText={(value) => handleInputChange('cardExpiryMonth', value)}
                  placeholder="MM"
                  placeholderTextColor="#999999"
                  keyboardType="numeric"
                  maxLength={2}
                />
                {errors.cardExpiryMonth && (
                  <Text style={styles.errorText}>{errors.cardExpiryMonth}</Text>
                )}
              </View>

              <View style={[styles.inputContainer, styles.halfWidth]}>
                <Text style={styles.inputLabel}>Año</Text>
                <TextInput
                  style={[styles.input, errors.cardExpiryYear && styles.inputError]}
                  value={formData.cardExpiryYear}
                  onChangeText={(value) => handleInputChange('cardExpiryYear', value)}
                  placeholder="YYYY"
                  placeholderTextColor="#999999"
                  keyboardType="numeric"
                  maxLength={4}
                />
                {errors.cardExpiryYear && (
                  <Text style={styles.errorText}>{errors.cardExpiryYear}</Text>
                )}
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>CVV</Text>
              <TextInput
                style={[styles.input, errors.cardCvv && styles.inputError]}
                value={formData.cardCvv}
                onChangeText={(value) => handleInputChange('cardCvv', value)}
                placeholder="123"
                placeholderTextColor="#999999"
                keyboardType="numeric"
                maxLength={4}
                secureTextEntry
              />
              {errors.cardCvv && (
                <Text style={styles.errorText}>{errors.cardCvv}</Text>
              )}
            </View>
          </View>
        </ScrollView>
        
        <View style={styles.floatingButtonContainer}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinueToSummary}
          >
            <Text style={styles.continueButtonText}>Continuar al Resumen</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UI_CONSTANTS.COLORS.CARD,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    padding: UI_CONSTANTS.SPACING.MD,
    paddingBottom: UI_CONSTANTS.SPACING.XL * 2, // Extra space for floating button
  },
  header: {
    padding: UI_CONSTANTS.SPACING.LG,
    marginBottom: UI_CONSTANTS.SPACING.LG,
    backgroundColor: UI_CONSTANTS.COLORS.CARD,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: UI_CONSTANTS.COLORS.TEXT,
    marginBottom: UI_CONSTANTS.SPACING.SM,
  },
  headerSubtitle: {
    fontSize: 18,
    color: UI_CONSTANTS.COLORS.PRIMARY,
    fontWeight: '600',
  },
  formContainer: {
    padding: UI_CONSTANTS.SPACING.LG,
    marginBottom: UI_CONSTANTS.SPACING.LG,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: UI_CONSTANTS.COLORS.TEXT,
    marginBottom: UI_CONSTANTS.SPACING.LG,
  },
  inputContainer: {
    marginBottom: UI_CONSTANTS.SPACING.MD,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: UI_CONSTANTS.COLORS.TEXT,
    marginBottom: UI_CONSTANTS.SPACING.SM,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: UI_CONSTANTS.SPACING.MD,
    paddingHorizontal: 0,
    fontSize: 16,
    backgroundColor: 'transparent',
    color: UI_CONSTANTS.COLORS.TEXT,
  },
  inputError: {
    borderBottomColor: UI_CONSTANTS.COLORS.ERROR,
  },
  errorText: {
    color: UI_CONSTANTS.COLORS.ERROR,
    fontSize: 14,
    marginTop: UI_CONSTANTS.SPACING.SM,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  continueButton: {
    backgroundColor: UI_CONSTANTS.COLORS.SUCCESS,
    paddingVertical: UI_CONSTANTS.SPACING.MD,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS.SM,
    alignItems: 'center',
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: UI_CONSTANTS.COLORS.CARD,
    paddingHorizontal: UI_CONSTANTS.SPACING.MD,
    paddingVertical: UI_CONSTANTS.SPACING.MD,
    borderTopWidth: 1,
    borderTopColor: UI_CONSTANTS.COLORS.BORDER,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  continueButtonText: {
    color: UI_CONSTANTS.COLORS.CARD,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default PaymentFormScreen;
