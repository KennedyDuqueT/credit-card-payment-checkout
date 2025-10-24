import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { UI_CONSTANTS } from '../../constants';
import FloatingCart from '../../components/FloatingCart';
import ProductQuantityButton from '../../components/ProductQuantityButton';
import { formatCurrency } from '../../utils/currency';
import { useHomeScreen } from './hooks';
import { styles } from './styles';

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { products, loading, error, cart, handleAddToCart, handleRetry, handleProductPress } = useHomeScreen();

  const renderProduct = ({ item }: { item: any }) => {
    const cartItem = cart.find(cartItemFind => cartItemFind.product.id === item.id);
    const isInCart = !!cartItem;

    return (
      <TouchableOpacity
        style={styles.productCard}
        onPress={() => handleProductPress(item)}
      >
        <Image 
          source={{ uri: item.imageUrl }} 
          style={styles.productImage}
          resizeMode="cover"
        />
        <View style={styles.productInfo}>
          <View style={styles.productContent}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productDescription} numberOfLines={2}>
              {item.description}
            </Text>
            <Text style={styles.productPrice}>${formatCurrency(item.price)}</Text>
          </View>
          {isInCart ? (
            <ProductQuantityButton 
              product={item} 
              quantity={cartItem.quantity} 
            />
          ) : (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleAddToCart(item)}
            >
              <Text style={styles.addButtonText}>Agregar al Carrito</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={UI_CONSTANTS.COLORS.PRIMARY} />
          <Text style={styles.loadingText}>Cargando productos...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={handleRetry}
          >
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Productos Disponibles</Text>
        <Text style={styles.headerSubtitle}>Encuentra los mejores productos</Text>
      </View>
      
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
      
      <FloatingCart visible={cart.length > 0} />
    </View>
  );
};

export default HomeScreen;
