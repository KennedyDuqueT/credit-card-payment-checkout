# Payment Checkout Application

Una aplicación completa de checkout de pagos que incluye un backend API desarrollado con **NestJS** y una aplicación móvil desarrollada con **React Native**. El sistema permite procesar pagos con tarjetas de crédito integrado con el Payment Gateway API (Wompi UAT).

## 🏗️ Arquitectura del Sistema

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Mobile App    │    │   Backend API   │    │ Payment Gateway │
│   (React Native)│◄──►│    (NestJS)     │◄──►│    (UAT)  │
│                 │    │                 │    │                 │
│ • Redux Store   │    │ • REST API      │    │ • Tokenization  │
│ • Navigation    │    │ • SQLite DB     │    │ • Transactions │
│ • Validation    │    │ • TypeORM       │    │ • Integrity     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📁 Estructura del Proyecto

```
app/
├── backend/                 # Backend API (NestJS)
│   ├── src/
│   │   ├── config/         # Configuración
│   │   ├── dto/           # Data Transfer Objects
│   │   ├── entities/      # Entidades de base de datos
│   │   ├── interfaces/     # Interfaces TypeScript
│   │   ├── modules/      # Módulos de la aplicación
│   │   └── main.ts       # Punto de entrada
│   ├── package.json
│   ├── .env
│   └── README.md
├── mobile/                 # Aplicación móvil (React Native)
│   ├── src/
│   │   ├── components/    # Componentes reutilizables
│   │   ├── constants/    # Constantes y configuración
│   │   ├── navigation/   # Configuración de navegación
│   │   ├── screens/      # Pantallas de la aplicación
│   │   ├── services/     # Servicios de API
│   │   ├── store/        # Redux store y slices
│   │   ├── types/        # Tipos TypeScript
│   │   ├── utils/        # Utilidades
│   │   └── App.tsx       # Componente principal
│   ├── package.json
│   ├── .env
│   └── README.md
└── README.md              # Este archivo
```

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js >= 20
- npm o yarn
- Android Studio (para Android)
- Xcode (para iOS, solo macOS)
- Git

### 1. Clonar el Repositorio
```bash
git clone <repository-url>
cd app-wompi
```

### 2. Configurar el Backend
```bash
cd backend
npm install
cp env.example .env
# Editar .env con tus credenciales
npm run seed
npm run start:dev
```

### 3. Configurar la Aplicación Móvil
```bash
cd mobile
npm install
cp env.example .env
# Editar .env con la URL del backend
npm start
```

### 4. Ejecutar en Dispositivo
```bash
# Android
npm run android

# iOS (solo macOS)
npm run ios
```

## 📱 Flujo de la Aplicación

### 1. **SplashScreen** → Pantalla de carga inicial
### 2. **HomeScreen** → Lista de productos disponibles
### 3. **ProductDetailScreen** → Detalle del producto seleccionado
### 4. **CartScreen** → Carrito de compras
### 5. **PaymentFormScreen** → Formulario de información de pago
### 6. **PaymentSummaryScreen** → Resumen antes de confirmar
### 7. **TransactionResultScreen** → Resultado de la transacción

## 🔧 Características Principales

### Backend API
- ✅ **REST API** con NestJS y TypeScript
- ✅ **Base de datos** SQLite con TypeORM
- ✅ **Validación** de datos con DTOs
- ✅ **Integración** con Payment Gateway API
- ✅ **Seguridad** con Integrity Signature
- ✅ **Testing** con Jest (>80% cobertura)

### Aplicación Móvil
- ✅ **React Native** 0.82 con TypeScript
- ✅ **Redux** con arquitectura Flux
- ✅ **Navegación** con React Navigation
- ✅ **Validación** completa de tarjetas
- ✅ **UI/UX** moderna y responsiva
- ✅ **Persistencia** con Redux Persist
- ✅ **Testing** con Jest (>80% cobertura)

## 🔒 Seguridad

### Backend
- Validación de entrada con DTOs
- Sanitización de datos
- Manejo seguro de errores
- Variables de entorno para credenciales
- Integrity Signature para transacciones

### Mobile
- Validación completa de entrada
- Enmascaramiento de datos sensibles
- Almacenamiento seguro con AsyncStorage
- Comunicación HTTPS con API

## 📊 API Endpoints

### Productos
- `GET /products` - Lista todos los productos
- `GET /products/:id` - Obtiene un producto específico
- `POST /products` - Crea un nuevo producto
- `PATCH /products/:id` - Actualiza un producto
- `DELETE /products/:id` - Elimina un producto

### Pagos
- `POST /payments/process` - Procesa un pago
- `GET /payments/status/:transactionNumber` - Estado de transacción
