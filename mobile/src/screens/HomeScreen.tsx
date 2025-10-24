import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchProducts, addToCart } from '../store/appSlice';
import { Product, RootStackParamList } from '../types';
import { UI_CONSTANTS } from '../constants';
import FloatingCart from '../components/FloatingCart';
import ProductQuantityButton from '../components/ProductQuantityButton';
import { formatCurrency } from '../utils/currency';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error, cart } = useSelector((state: RootState) => state.app);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  const renderProduct = ({ item }: { item: Product }) => {
    const cartItem = cart.find(cartItem => cartItem.product.id === item.id);
    const isInCart = !!cartItem;

    return (
      <TouchableOpacity
        style={styles.productCard}
        onPress={() => navigation.navigate('ProductDetail', { product: item })}
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
            onPress={() => dispatch(fetchProducts())}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UI_CONSTANTS.COLORS.BACKGROUND,
  },
  header: {
    backgroundColor: UI_CONSTANTS.COLORS.CARD,
    padding: UI_CONSTANTS.SPACING.LG,
    borderBottomWidth: 1,
    borderBottomColor: UI_CONSTANTS.COLORS.BORDER,
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
  listContainer: {
    padding: UI_CONSTANTS.SPACING.MD,
  },
  row: {
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: UI_CONSTANTS.COLORS.CARD,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS.MD,
    marginBottom: UI_CONSTANTS.SPACING.MD,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    width: '48%',
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: UI_CONSTANTS.SPACING.MD,
    flex: 1,
    justifyContent: 'space-between',
  },
  productContent: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: UI_CONSTANTS.COLORS.TEXT,
    marginBottom: UI_CONSTANTS.SPACING.SM,
  },
  productDescription: {
    fontSize: 12,
    color: UI_CONSTANTS.COLORS.TEXT_SECONDARY,
    marginBottom: UI_CONSTANTS.SPACING.SM,
    lineHeight: 16,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: UI_CONSTANTS.COLORS.PRIMARY,
    marginBottom: UI_CONSTANTS.SPACING.MD,
  },
  addButton: {
    backgroundColor: UI_CONSTANTS.COLORS.PRIMARY,
    paddingVertical: UI_CONSTANTS.SPACING.SM,
    paddingHorizontal: UI_CONSTANTS.SPACING.MD,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS.SM,
    alignItems: 'center',
  },
  addButtonText: {
    color: UI_CONSTANTS.COLORS.CARD,
    fontWeight: 'bold',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: UI_CONSTANTS.COLORS.BACKGROUND,
  },
  loadingText: {
    marginTop: UI_CONSTANTS.SPACING.MD,
    fontSize: 16,
    color: UI_CONSTANTS.COLORS.TEXT_SECONDARY,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: UI_CONSTANTS.COLORS.BACKGROUND,
    padding: UI_CONSTANTS.SPACING.LG,
  },
  errorText: {
    fontSize: 16,
    color: UI_CONSTANTS.COLORS.ERROR,
    textAlign: 'center',
    marginBottom: UI_CONSTANTS.SPACING.LG,
  },
  retryButton: {
    backgroundColor: UI_CONSTANTS.COLORS.PRIMARY,
    paddingVertical: UI_CONSTANTS.SPACING.SM,
    paddingHorizontal: UI_CONSTANTS.SPACING.LG,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS.SM,
  },
  retryButtonText: {
    color: UI_CONSTANTS.COLORS.CARD,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
