import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { processPayment, setCurrentTransaction } from '../store/appSlice';
import { CartItem, RootStackParamList } from '../types';
import { UI_CONSTANTS } from '../constants';
import { formatCurrency } from '../utils/currency';

type PaymentSummaryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PaymentSummary'>;
type PaymentSummaryScreenRouteProp = RouteProp<RootStackParamList, 'PaymentSummary'>;

const PaymentSummaryScreen: React.FC = () => {
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
    } catch {
      Alert.alert('Error', 'Ocurrió un error al procesar el pago');
    }
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.product.imageUrl }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.product.name}</Text>
        <Text style={styles.itemPrice}>${item.product.price}</Text>
        <Text style={styles.itemQuantity}>Cantidad: {item.quantity}</Text>
      </View>
      <Text style={styles.itemTotal}>
        ${(item.product.price * item.quantity).toFixed(2)}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Resumen de Pago</Text>
        <Text style={styles.headerSubtitle}>
          Revisa la información antes de confirmar
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Productos</Text>
        <FlatList
          data={cart}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.product.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información de Pago</Text>
        <View style={styles.paymentInfo}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nombre:</Text>
            <Text style={styles.infoValue}>{paymentData.customerName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{paymentData.customerEmail}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Tarjeta:</Text>
            <Text style={styles.infoValue}>
              **** **** **** {paymentData.cardNumber.slice(-4)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Expira:</Text>
            <Text style={styles.infoValue}>
              {paymentData.cardExpiryMonth}/{paymentData.cardExpiryYear}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: ${formatCurrency(calculateTotal())}</Text>
        </View>
        <TouchableOpacity
          style={[styles.payButton, loading && styles.payButtonDisabled]}
          onPress={handleProcessPayment}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={UI_CONSTANTS.COLORS.CARD} />
          ) : (
            <Text style={styles.payButtonText}>Confirmar Pago</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UI_CONSTANTS.COLORS.BACKGROUND,
  },
  header: {
    backgroundColor: UI_CONSTANTS.COLORS.CARD,
    padding: UI_CONSTANTS.SPACING.LG,
    borderBottomWidth: 1,
    borderBottomColor: UI_CONSTANTS.COLORS.BACKGROUND,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: UI_CONSTANTS.COLORS.TEXT,
    marginBottom: UI_CONSTANTS.SPACING.SM,
  },
  headerSubtitle: {
    fontSize: 16,
    color: UI_CONSTANTS.COLORS.TEXT_SECONDARY,
  },
  section: {
    backgroundColor: UI_CONSTANTS.COLORS.CARD,
    margin: UI_CONSTANTS.SPACING.MD,
    padding: UI_CONSTANTS.SPACING.LG,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS.MD,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: UI_CONSTANTS.COLORS.TEXT,
    marginBottom: UI_CONSTANTS.SPACING.MD,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: UI_CONSTANTS.SPACING.MD,
    paddingBottom: UI_CONSTANTS.SPACING.MD,
    borderBottomWidth: 1,
    borderBottomColor: UI_CONSTANTS.COLORS.BACKGROUND,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS.SM,
    marginRight: UI_CONSTANTS.SPACING.MD,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: UI_CONSTANTS.COLORS.TEXT,
    marginBottom: UI_CONSTANTS.SPACING.SM,
  },
  itemPrice: {
    fontSize: 16,
    color: UI_CONSTANTS.COLORS.PRIMARY,
    marginBottom: UI_CONSTANTS.SPACING.SM,
  },
  itemQuantity: {
    fontSize: 14,
    color: UI_CONSTANTS.COLORS.TEXT_SECONDARY,
  },
  itemTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: UI_CONSTANTS.COLORS.PRIMARY,
  },
  paymentInfo: {
    backgroundColor: UI_CONSTANTS.COLORS.BACKGROUND,
    padding: UI_CONSTANTS.SPACING.MD,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS.SM,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: UI_CONSTANTS.SPACING.SM,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: UI_CONSTANTS.COLORS.TEXT,
  },
  infoValue: {
    fontSize: 16,
    color: UI_CONSTANTS.COLORS.TEXT_SECONDARY,
  },
  footer: {
    backgroundColor: UI_CONSTANTS.COLORS.CARD,
    padding: UI_CONSTANTS.SPACING.LG,
    borderTopWidth: 1,
    borderTopColor: UI_CONSTANTS.COLORS.BACKGROUND,
  },
  totalContainer: {
    alignItems: 'center',
    marginBottom: UI_CONSTANTS.SPACING.LG,
  },
  totalText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: UI_CONSTANTS.COLORS.PRIMARY,
  },
  payButton: {
    backgroundColor: UI_CONSTANTS.COLORS.SUCCESS,
    paddingVertical: UI_CONSTANTS.SPACING.MD,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS.SM,
    alignItems: 'center',
  },
  payButtonDisabled: {
    backgroundColor: UI_CONSTANTS.COLORS.TEXT_SECONDARY,
  },
  payButtonText: {
    color: UI_CONSTANTS.COLORS.CARD,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default PaymentSummaryScreen;
