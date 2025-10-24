import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UI_CONSTANTS } from '../../constants';
import { useSplashScreen } from './hooks';
import { styles } from './styles';

const SplashScreen: React.FC = () => {
  useSplashScreen();

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

export default SplashScreen;
