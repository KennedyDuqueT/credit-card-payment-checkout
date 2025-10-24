import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { removeFromCart, updateCartQuantity } from '../../store/appSlice';
import { RootStackParamList } from '../../types';
import { Alert } from 'react-native';

type CartScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Cart'>;

export const useCartScreen = () => {
  const navigation = useNavigation<CartScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const { cart } = useSelector((state: RootState) => state.app);

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

  const handleGoToHome = () => {
    navigation.navigate('Home');
  };

  return {
    cart,
    handleRemoveItem,
    handleUpdateQuantity,
    handleCheckout,
    calculateTotal,
    handleGoToHome,
  };
};
