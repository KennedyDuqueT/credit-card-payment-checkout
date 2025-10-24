import React, { useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { formatCurrency } from '../../utils/currency';
import { usePaymentFormScreen } from './hooks';
import { styles } from './styles';

const PaymentFormScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { formData, errors, handleInputChange, handleInputFocus, handleContinueToSummary, calculateTotal } = usePaymentFormScreen();
  const scrollViewRef = useRef<ScrollView>(null);


  return (
    <TouchableWithoutFeedback onPress={handleInputFocus}>
      <View style={[styles.container, { paddingBottom: insets.bottom }]}>
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <ScrollView 
            ref={scrollViewRef}
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
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
    </TouchableWithoutFeedback>
  );
};

export default PaymentFormScreen;
