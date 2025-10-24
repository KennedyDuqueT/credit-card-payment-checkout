# Payment Checkout App

Una aplicación móvil React Native para procesamiento de pagos con tarjetas de crédito.

## Características

- 🛍️ Catálogo de productos
- 🛒 Carrito de compras
- 💳 Procesamiento de pagos
- 🔒 Validación segura de tarjetas
- 📱 Diseño responsive
- 🔄 Persistencia de datos con Redux

## Tecnologías

- **React Native** 0.82.1
- **TypeScript**
- **Redux Toolkit** con persistencia
- **React Navigation**
- **AsyncStorage**

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Para Android:
```bash
npm run android
```

3. Para iOS:
```bash
npm run ios
```

## Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
├── constants/           # Constantes y configuración
├── navigation/          # Configuración de navegación
├── screens/            # Pantallas de la aplicación
├── services/           # Servicios de API
├── store/              # Redux store y slices
├── types/              # Definiciones de tipos TypeScript
└── utils/              # Utilidades y helpers
```

## Pantallas

1. **Splash Screen** - Pantalla de carga inicial
2. **Home Screen** - Catálogo de productos
3. **Product Detail** - Detalle del producto
4. **Cart Screen** - Carrito de compras
5. **Checkout Screen** - Resumen de compra
6. **Payment Form** - Formulario de pago
7. **Payment Summary** - Resumen de pago
8. **Transaction Result** - Resultado de transacción

## Configuración

La aplicación se conecta al backend API configurado en `src/constants/index.ts`.

Para desarrollo local, asegúrate de que el backend esté ejecutándose en `http://192.168.1.7:3000`.

## Scripts Disponibles

- `npm start` - Inicia Metro bundler
- `npm run android` - Ejecuta en Android
- `npm run ios` - Ejecuta en iOS
- `npm run lint` - Ejecuta ESLint
- `npm test` - Ejecuta tests

## Requisitos

- Node.js >= 20
- React Native CLI
- Android Studio (para Android)
- Xcode (para iOS)