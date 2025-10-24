import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { addToCart } from '../../store/appSlice';
import { RootStackParamList } from '../../types';
import { Alert } from 'react-native';

type ProductDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProductDetail'>;
type ProductDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

export const useProductDetailScreen = () => {
  const navigation = useNavigation<ProductDetailScreenNavigationProp>();
  const route = useRoute<ProductDetailScreenRouteProp>();
  const dispatch = useDispatch<AppDispatch>();
  const { product } = route.params;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    Alert.alert('Éxito', 'Producto agregado al carrito');
  };

  const handleGoToCart = () => {
    navigation.navigate('Cart');
  };

  return {
    product,
    handleAddToCart,
    handleGoToCart,
  };
};
