import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { removeFromCart, updateCartQuantity } from '../store/appSlice';
import { CartItem, RootStackParamList } from '../types';
import { UI_CONSTANTS } from '../constants';
import { formatCurrency } from '../utils/currency';

type CartScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Cart'>;

const CartScreen: React.FC = () => {
  const navigation = useNavigation<CartScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const { cart } = useSelector((state: RootState) => state.app);
  const insets = useSafeAreaInsets();
  const handleRemoveItem = (productId: number) => {
    Alert.alert(
      'Eliminar Producto',
      '¿Estás seguro de que quieres eliminar este producto del carrito?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: () => dispatch(removeFromCart(productId)) },
      ]
    );
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
    } else {
      dispatch(updateCartQuantity({ productId, quantity }));
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert('Carrito Vacío', 'Agrega productos al carrito antes de continuar');
      return;
    }
    navigation.navigate('PaymentForm');
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.product.imageUrl }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.product.name}</Text>
        <Text style={styles.itemPrice}>${formatCurrency(item.product.price)}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveItem(item.product.id)}
      >
        <Text style={styles.removeButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  );

  if (cart.length === 0) {
    return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Tu carrito está vacío</Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.shopButtonText}>Continuar Comprando</Text>
          </TouchableOpacity>
        </View>
    );
  }

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>

      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.product.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: ${formatCurrency(calculateTotal())}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={handleCheckout}
          >
            <Text style={styles.checkoutButtonText}>Proceder al Pago</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: UI_CONSTANTS.SPACING.MD,
  },
  cartItem: {
    backgroundColor: UI_CONSTANTS.COLORS.CARD,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS.MD,
    marginBottom: UI_CONSTANTS.SPACING.MD,
    padding: UI_CONSTANTS.SPACING.MD,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  itemImage: {
    width: 80,
    height: 80,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: UI_CONSTANTS.COLORS.PRIMARY,
    marginBottom: UI_CONSTANTS.SPACING.SM,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: UI_CONSTANTS.COLORS.PRIMARY,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: UI_CONSTANTS.COLORS.CARD,
    fontWeight: 'bold',
    fontSize: 18,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: UI_CONSTANTS.COLORS.TEXT,
    marginHorizontal: UI_CONSTANTS.SPACING.MD,
  },
  removeButton: {
    backgroundColor: UI_CONSTANTS.COLORS.ERROR,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: UI_CONSTANTS.COLORS.CARD,
    fontWeight: 'bold',
    fontSize: 20,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: UI_CONSTANTS.COLORS.PRIMARY,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  clearButton: {
    flex: 1,
    backgroundColor: UI_CONSTANTS.COLORS.ERROR,
    paddingVertical: UI_CONSTANTS.SPACING.MD,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS.SM,
    alignItems: 'center',
    marginRight: UI_CONSTANTS.SPACING.SM,
  },
  clearButtonText: {
    color: UI_CONSTANTS.COLORS.CARD,
    fontWeight: 'bold',
    fontSize: 16,
  },
  checkoutButton: {
    flex: 1,
    backgroundColor: UI_CONSTANTS.COLORS.SUCCESS,
    paddingVertical: UI_CONSTANTS.SPACING.MD,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS.SM,
    alignItems: 'center',
    marginLeft: UI_CONSTANTS.SPACING.SM,
  },
  checkoutButtonText: {
    color: UI_CONSTANTS.COLORS.CARD,
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: UI_CONSTANTS.COLORS.BACKGROUND,
    padding: UI_CONSTANTS.SPACING.LG,
  },
  emptyText: {
    fontSize: 20,
    color: UI_CONSTANTS.COLORS.TEXT_SECONDARY,
    marginBottom: UI_CONSTANTS.SPACING.LG,
  },
  shopButton: {
    backgroundColor: UI_CONSTANTS.COLORS.PRIMARY,
    paddingVertical: UI_CONSTANTS.SPACING.MD,
    paddingHorizontal: UI_CONSTANTS.SPACING.LG,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS.SM,
  },
  shopButtonText: {
    color: UI_CONSTANTS.COLORS.CARD,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CartScreen;
