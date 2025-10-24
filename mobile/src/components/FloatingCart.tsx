import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { RootStackParamList } from '../types';
import { UI_CONSTANTS } from '../constants';

type FloatingCartNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface FloatingCartProps {
  visible: boolean;
}

const FloatingCart: React.FC<FloatingCartProps> = ({ visible }) => {
  const navigation = useNavigation<FloatingCartNavigationProp>();
  const { cart } = useSelector((state: RootState) => state.app);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  if (!visible || totalItems === 0) {
    return null;
  }

  const handlePress = () => {
    navigation.navigate('Cart');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.cartIcon}>
        <Text style={styles.cartEmoji}>🛒</Text>
        {totalItems > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{totalItems}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    zIndex: 1000,
  },
  cartIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: UI_CONSTANTS.COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  cartEmoji: {
    fontSize: 24,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: UI_CONSTANTS.COLORS.ERROR,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: UI_CONSTANTS.COLORS.CARD,
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default FloatingCart;
