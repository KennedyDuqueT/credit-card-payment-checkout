import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { clearCart } from '../store/appSlice';
import { RootStackParamList } from '../types';
import { UI_CONSTANTS } from '../constants';

type TransactionResultScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TransactionResult'>;
type TransactionResultScreenRouteProp = RouteProp<RootStackParamList, 'TransactionResult'>;

const TransactionResultScreen: React.FC = () => {
  const navigation = useNavigation<TransactionResultScreenNavigationProp>();
  const route = useRoute<TransactionResultScreenRouteProp>();
  const dispatch = useDispatch<AppDispatch>();
  const { transaction } = route.params;

  const handleContinueShopping = () => {
    dispatch(clearCart());
    navigation.navigate('Home');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return UI_CONSTANTS.COLORS.SUCCESS;
      case 'DECLINED':
      case 'FAILED':
        return UI_CONSTANTS.COLORS.ERROR;
      default:
        return UI_CONSTANTS.COLORS.WARNING;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'Aprobado';
      case 'DECLINED':
        return 'Declinado';
      case 'FAILED':
        return 'Fallido';
      default:
        return 'Pendiente';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Resultado de la Transacción</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(transaction.status) }]}>
            <Text style={styles.statusText}>
              {getStatusText(transaction.status)}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalles de la Transacción</Text>
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Número de Transacción:</Text>
              <Text style={styles.detailValue}>{transaction.transactionNumber}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Monto:</Text>
              <Text style={styles.detailValue}>${transaction.amount.toFixed(2)}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Estado:</Text>
              <Text style={[styles.detailValue, { color: getStatusColor(transaction.status) }]}>
                {getStatusText(transaction.status)}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Fecha:</Text>
              <Text style={styles.detailValue}>
                {new Date(transaction.createdAt).toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información del Cliente</Text>
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Nombre:</Text>
              <Text style={styles.detailValue}>{transaction.customerName}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Email:</Text>
              <Text style={styles.detailValue}>{transaction.customerEmail}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información de la Tarjeta</Text>
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Tarjeta:</Text>
              <Text style={styles.detailValue}>
                **** **** **** {transaction.cardNumber.slice(-4)}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Expira:</Text>
              <Text style={styles.detailValue}>
                {transaction.cardExpiryMonth}/{transaction.cardExpiryYear}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Producto</Text>
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Nombre:</Text>
              <Text style={styles.detailValue}>{transaction.product.name}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Precio:</Text>
              <Text style={styles.detailValue}>${transaction.product.price}</Text>
            </View>
          </View>
        </View>

        {transaction.paymentGatewayTransactionId && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ID de Transacción del Gateway</Text>
            <View style={styles.detailsContainer}>
              <Text style={styles.detailValue}>{transaction.paymentGatewayTransactionId}</Text>
            </View>
          </View>
        )}

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinueShopping}
          >
            <Text style={styles.continueButtonText}>Continuar Comprando</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UI_CONSTANTS.COLORS.BACKGROUND,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: UI_CONSTANTS.COLORS.CARD,
    padding: UI_CONSTANTS.SPACING.LG,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: UI_CONSTANTS.COLORS.BACKGROUND,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: UI_CONSTANTS.COLORS.TEXT,
    marginBottom: UI_CONSTANTS.SPACING.MD,
  },
  statusBadge: {
    paddingVertical: UI_CONSTANTS.SPACING.SM,
    paddingHorizontal: UI_CONSTANTS.SPACING.LG,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS.SM,
  },
  statusText: {
    color: UI_CONSTANTS.COLORS.CARD,
    fontWeight: 'bold',
    fontSize: 16,
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
  detailsContainer: {
    backgroundColor: UI_CONSTANTS.COLORS.BACKGROUND,
    padding: UI_CONSTANTS.SPACING.MD,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS.SM,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: UI_CONSTANTS.SPACING.SM,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: UI_CONSTANTS.COLORS.TEXT,
  },
  detailValue: {
    fontSize: 16,
    color: UI_CONSTANTS.COLORS.TEXT_SECONDARY,
  },
  footer: {
    backgroundColor: UI_CONSTANTS.COLORS.CARD,
    padding: UI_CONSTANTS.SPACING.LG,
    borderTopWidth: 1,
    borderTopColor: UI_CONSTANTS.COLORS.BACKGROUND,
  },
  continueButton: {
    backgroundColor: UI_CONSTANTS.COLORS.PRIMARY,
    paddingVertical: UI_CONSTANTS.SPACING.MD,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS.SM,
    alignItems: 'center',
  },
  continueButtonText: {
    color: UI_CONSTANTS.COLORS.CARD,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default TransactionResultScreen;
