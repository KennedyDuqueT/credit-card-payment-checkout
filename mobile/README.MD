# Payment Checkout Mobile App

Una aplicación móvil desarrollada con **React Native** y **TypeScript** para procesar pagos con tarjetas de crédito. Incluye un flujo completo de checkout con carrito de compras, validación de tarjetas y procesamiento de pagos.

## 🚀 Características

- **Framework**: React Native 0.82 con TypeScript
- **Estado**: Redux Toolkit con Redux Persist
- **Navegación**: React Navigation v7
- **Validación**: Validación completa de tarjetas de crédito
- **UI/UX**: Diseño moderno y responsivo
- **Arquitectura**: Flux Architecture con separación de responsabilidades

## 📱 Pantallas

### 1. SplashScreen
- Pantalla de carga inicial
- Logo y branding de la aplicación
- Navegación automática al Home

### 2. HomeScreen
- Lista de productos disponibles
- Vista de grid responsiva (2 columnas)
- Carrito flotante con contador
- Botones de cantidad dinámicos
- Formato de precios con separadores

### 3. ProductDetailScreen
- Detalle completo del producto
- Información de stock
- Botones de acción (Agregar al carrito, Ver carrito)
- Imagen del producto en alta resolución

### 4. CartScreen
- Lista de productos en el carrito
- Controles de cantidad (+/-)
- Botón de eliminar producto
- Cálculo automático del total
- Botón de proceder al pago

### 5. PaymentFormScreen
- Formulario de información personal
- Formulario de tarjeta de crédito
- Validación en tiempo real
- Manejo inteligente del teclado
- Formato automático de número de tarjeta

### 6. PaymentSummaryScreen
- Resumen de productos
- Información de pago
- Detalles de la tarjeta (enmascarados)
- Botón de confirmar pago
- Indicador de carga

### 7. TransactionResultScreen
- Resultado de la transacción
- Detalles completos del pago
- Información del producto
- Botón para continuar comprando

## 📋 Requisitos

- Node.js >= 20
- React Native CLI
- Android Studio (para Android)
- Xcode (para iOS)
- Dispositivo Android/iOS o emulador

## 🛠️ Instalación

1. **Clonar el repositorio**:
```bash
git clone <repository-url>
cd app-wompi/mobile
```

2. **Instalar dependencias**:
```bash
npm install
```

3. **Configurar variables de entorno**:
```bash
cp env.example .env
```

Editar el archivo `.env`:
```env
# API Configuration
API_BASE_URL=http://192.168.1.7:3001
```

4. **Configurar Android**:
```bash
# Asegúrate de que Android Studio esté instalado
# Configura el SDK de Android
# Conecta un dispositivo Android o inicia un emulador
```

## 🚀 Uso

### Desarrollo

#### Android
```bash
# Iniciar Metro bundler
npm start

# En otra terminal, ejecutar en Android
npm run android
```

### Producción

#### Android APK
```bash
cd android
./gradlew assembleRelease
```

## 🏗️ Arquitectura

### Estructura del Proyecto
```
src/
├── components/      # Componentes reutilizables
│   ├── FloatingCart.tsx
│   └── ProductQuantityButton.tsx
├── constants/       # Constantes y configuración
├── navigation/      # Configuración de navegación
├── screens/         # Pantallas de la aplicación
│   ├── SplashScreen/
│   ├── HomeScreen/
│   ├── ProductDetailScreen/
│   ├── CartScreen/
│   ├── PaymentFormScreen/
│   ├── PaymentSummaryScreen/
│   └── TransactionResultScreen/
├── services/        # Servicios de API
├── store/          # Redux store y slices
├── types/          # Tipos TypeScript
├── utils/          # Utilidades
└── App.tsx         # Componente principal
```

### Arquitectura Flux

#### Store (Redux)
```typescript
interface AppState {
  products: Product[];
  cart: CartItem[];
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
}
```

#### Actions
- `fetchProducts()` - Obtiene productos del backend
- `addToCart(product)` - Agrega producto al carrito
- `removeFromCart(productId)` - Elimina producto del carrito
- `updateCartQuantity({productId, quantity})` - Actualiza cantidad
- `decreaseCartQuantity(product)` - Decrementa cantidad
- `processPayment(paymentData)` - Procesa pago
- `setCurrentTransaction(transaction)` - Establece transacción actual

#### Reducers
- `productsSlice` - Maneja estado de productos
- `cartSlice` - Maneja estado del carrito
- `transactionsSlice` - Maneja estado de transacciones

### Componentes

#### FloatingCart
- Carrito flotante que aparece cuando hay productos
- Muestra contador de items
- Navega a CartScreen al tocar

#### ProductQuantityButton
- Botones de cantidad para productos en el carrito
- Incrementa/decrementa cantidad
- Elimina producto si cantidad llega a 0

## 🔧 Funcionalidades

### Validación de Tarjetas
- **Número de tarjeta**: Validación Luhn y formato
- **CVV**: 3-4 dígitos según tipo de tarjeta
- **Fecha de expiración**: Validación de mes/año
- **Tipo de tarjeta**: Detección automática (Visa, Mastercard, Amex)

### Formato Automático
- **Número de tarjeta**: Espacios cada 4 dígitos
- **Mes**: Agrega 0 inicial si es necesario
- **Precios**: Separadores de miles

### Manejo del Teclado
- **KeyboardAvoidingView**: Ajuste automático por plataforma
- **ScrollView**: Navegación fluida por formularios
- **TouchableWithoutFeedback**: Cerrar teclado tocando fuera

### Persistencia
- **Redux Persist**: Estado persistente entre sesiones
- **AsyncStorage**: Almacenamiento local seguro

## 🎨 UI/UX

### Diseño
- **Colores**: Paleta profesional y moderna
- **Tipografía**: Jerarquía clara y legible
- **Espaciado**: Sistema de espaciado consistente
- **Bordes**: Radio de bordes uniforme

### Responsividad
- **Grid**: 2 columnas en pantallas grandes
- **SafeArea**: Manejo correcto de áreas seguras
- **Scroll**: Scroll suave y natural

### Interacciones
- **Feedback**: Respuesta visual a interacciones
- **Animaciones**: Transiciones suaves
- **Estados**: Loading, error, success states

## 📝 Scripts Disponibles

- `npm start` - Inicia Metro bundler
- `npm run android` - Ejecuta en Android
- `npm run ios` - Ejecuta en iOS
- `npm run lint` - Ejecuta ESLint
- `npm run build:android` - Build para Android
- `npm run build:ios` - Build para iOS