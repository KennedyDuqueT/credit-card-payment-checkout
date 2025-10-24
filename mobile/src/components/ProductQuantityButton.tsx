import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { addToCart, decreaseCartQuantity } from '../store/appSlice';
import { Product } from '../types';
import { UI_CONSTANTS } from '../constants';

interface ProductQuantityButtonProps {
  product: Product;
  quantity: number;
}

const ProductQuantityButton: React.FC<ProductQuantityButtonProps> = ({ product, quantity }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAdd = () => {
    dispatch(addToCart(product));
  };

  const handleRemove = () => {
    dispatch(decreaseCartQuantity(product.id));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleRemove}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityText}>{quantity}</Text>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  button: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: UI_CONSTANTS.COLORS.SECONDARY,
    borderRadius: UI_CONSTANTS.BORDER_RADIUS.SM,
  },
  buttonText: {
    color: UI_CONSTANTS.COLORS.CARD,
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityContainer: {
    minWidth: 40,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    color: UI_CONSTANTS.COLORS.TEXT,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductQuantityButton;
