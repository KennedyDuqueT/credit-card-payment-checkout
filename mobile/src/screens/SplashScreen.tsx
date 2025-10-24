import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { UI_CONSTANTS } from '../constants';

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>💳</Text>
        </View>
        <Text style={styles.title}>Payment Checkout</Text>
        <Text style={styles.subtitle}>Tu tienda de confianza</Text>
      </View>
      
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={UI_CONSTANTS.COLORS.PRIMARY} />
        <Text style={styles.loadingText}>Cargando productos...</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: UI_CONSTANTS.COLORS.BACKGROUND,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: UI_CONSTANTS.SPACING.XL * 2,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: UI_CONSTANTS.COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: UI_CONSTANTS.SPACING.LG,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  logoText: {
    fontSize: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: UI_CONSTANTS.COLORS.PRIMARY,
    marginBottom: UI_CONSTANTS.SPACING.SM,
  },
  subtitle: {
    fontSize: 18,
    color: UI_CONSTANTS.COLORS.TEXT_SECONDARY,
    fontWeight: '500',
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: UI_CONSTANTS.COLORS.TEXT_SECONDARY,
    marginTop: UI_CONSTANTS.SPACING.MD,
  },
});

export default SplashScreen;
