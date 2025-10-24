import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { addToCart } from '../store/appSlice';
import { RootStackParamList } from '../types';
import { UI_CONSTANTS } from '../constants';
import { formatCurrency } from '../utils/currency';

type ProductDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProductDetail'>;
type ProductDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

const ProductDetailScreen: React.FC = () => {
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>${formatCurrency(product.price)}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
          <View style={styles.stockInfo}>
            <Text style={styles.stockText}>
              Stock disponible: {product.stock}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddToCart}
              disabled={product.stock === 0}
            >
              <Text style={styles.addButtonText}>
                {product.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cartButton}
              onPress={handleGoToCart}
            >
              <Text style={styles.cartButtonText}>Ver Carrito</Text>
            </TouchableOpacity>
          </View>
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
    flex: 1,
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: UI_CONSTANTS.SPACING.LG,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: UI_CONSTANTS.COLORS.TEXT,
    marginBottom: UI_CONSTANTS.SPACING.SM,
  },
  productPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: UI_CONSTANTS.COLORS.PRIMARY,
    marginBottom: UI_CONSTANTS.SPACING.MD,
  },
  productDescription: {
    fontSize: 16,
    color: UI_CONSTANTS.COLORS.TEXT_SECONDARY,
    lineHeight: 24,
    marginBottom: UI_CONSTANTS.SPACING.LG,
  },
  stockInfo: {
    backgroundColor: UI_CONSTANTS.COLORS.CARD,
    padding: UI_CONSTANTS.SPACING.MD,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS.SM,
    marginBottom: UI_CONSTANTS.SPACING.LG,
  },
  stockText: {
    fontSize: 16,
    color: UI_CONSTANTS.COLORS.TEXT,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButton: {
    flex: 1,
    backgroundColor: UI_CONSTANTS.COLORS.PRIMARY,
    paddingVertical: UI_CONSTANTS.SPACING.MD,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS.SM,
    alignItems: 'center',
    marginRight: UI_CONSTANTS.SPACING.SM,
  },
  addButtonText: {
    color: UI_CONSTANTS.COLORS.CARD,
    fontWeight: 'bold',
    fontSize: 16,
  },
  cartButton: {
    flex: 1,
    backgroundColor: UI_CONSTANTS.COLORS.SECONDARY,
    paddingVertical: UI_CONSTANTS.SPACING.MD,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS.SM,
    alignItems: 'center',
    marginLeft: UI_CONSTANTS.SPACING.SM,
  },
  cartButtonText: {
    color: UI_CONSTANTS.COLORS.CARD,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProductDetailScreen;
