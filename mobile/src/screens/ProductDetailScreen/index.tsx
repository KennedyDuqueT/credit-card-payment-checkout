import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatCurrency } from '../../utils/currency';
import { useProductDetailScreen } from './hooks';
import { styles } from './styles';

const ProductDetailScreen: React.FC = () => {
  const { product, handleAddToCart, handleGoToCart } = useProductDetailScreen();

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

export default ProductDetailScreen;
