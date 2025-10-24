import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { UI_CONSTANTS } from '../../constants';
import { formatCurrency } from '../../utils/currency';
import { usePaymentSummaryScreen } from './hooks';
import { styles } from './styles';

const PaymentSummaryScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { cart, loading, paymentData, calculateTotal, handleProcessPayment } = usePaymentSummaryScreen();

  const renderCartItem = ({ item }: { item: any }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.product.imageUrl }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.product.name}</Text>
        <Text style={styles.itemPrice}>${formatCurrency(item.product.price)}</Text>
        <Text style={styles.itemQuantity}>Cantidad: {item.quantity}</Text>
      </View>
      <Text style={styles.itemTotal}>
        ${formatCurrency(item.product.price * item.quantity)}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
            scrollEnabled={false}
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
            <View style={[styles.infoRow, { paddingBottom: insets.bottom }]}>
              <Text style={styles.infoLabel}>Expira:</Text>
              <Text style={styles.infoValue}>
                {paymentData.cardExpiryMonth}/{paymentData.cardExpiryYear}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
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
    </View>
  );
};

export default PaymentSummaryScreen;
