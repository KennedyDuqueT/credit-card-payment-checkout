# Payment Checkout Backend API

Una API REST desarrollada con **NestJS** y **TypeScript** para procesar pagos con tarjetas de crédito, integrada con el Payment Gateway API (Wompi UAT).

## 🚀 Características

- **Framework**: NestJS con TypeScript
- **Base de Datos**: SQLite con TypeORM
- **Integración**: Payment Gateway API (Wompi UAT)
- **Validación**: DTOs con class-validator
- **Arquitectura**: Modular con separación de responsabilidades
- **Testing**: Jest con cobertura >80%

## 📋 Requisitos

- Node.js >= 20
- npm o yarn
- Git

## 🛠️ Instalación

1. **Clonar el repositorio**:
```bash
git clone <repository-url>
cd app-wompi/backend
```

2. **Instalar dependencias**:
```bash
npm install
```

3. **Configurar variables de entorno**:
```bash
cp env.example .env
```

Editar el archivo `.env` con tus credenciales:
```env
# Database Configuration
DATABASE_PATH=database.sqlite
NODE_ENV=development

# Server Configuration
PORT=3001

# Payment Gateway API Configuration (Sandbox)
PAYMENT_GATEWAY_BASE_URL=https://api-sandbox.co.uat.wompi.dev/v1
PAYMENT_GATEWAY_PUBLIC_KEY=pub_stagtest_g2u0HQd3ZMh05hsSgTS2lUV8t3s4mOt7
PAYMENT_GATEWAY_PRIVATE_KEY=prv_stagtest_5i0ZGIGiFcDQifYsXxvsny7Y37tKqFWg
PAYMENT_GATEWAY_INTEGRITY_KEY=stagtest_integrity_nAIBuqayW70XpUqJS4qf4STYiISd89Fp
```

4. **Inicializar la base de datos**:
```bash
npm run seed
```

## 🚀 Uso

### Desarrollo
```bash
npm run start:dev
```

### Producción
```bash
npm run build
npm run start:prod
```

### Testing
```bash
# Tests unitarios
npm run test

# Tests con cobertura
npm run test:cov

# Tests e2e
npm run test:e2e
```

## 📚 API Endpoints

### Productos

#### GET /products
Obtiene todos los productos disponibles.

**Respuesta**:
```json
[
  {
    "id": 1,
    "name": "iPhone 15 Pro",
    "description": "El iPhone más avanzado con chip A17 Pro y cámara de 48MP",
    "price": 4500000,
    "imageUrl": "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop&crop=center",
    "stock": 10,
    "isActive": true,
    "createdAt": "2025-10-24T02:40:39.000Z",
    "updatedAt": "2025-10-24T02:40:39.000Z"
  }
]
```

#### GET /products/:id
Obtiene un producto específico por ID.

#### POST /products
Crea un nuevo producto (requiere autenticación).

#### PATCH /products/:id
Actualiza un producto existente (requiere autenticación).

#### DELETE /products/:id
Elimina un producto (requiere autenticación).

### Pagos

#### POST /payments/process
Procesa un pago con tarjeta de crédito.

**Request Body**:
```json
{
  "productId": 1,
  "customerEmail": "test@example.com",
  "customerName": "Test User",
  "cardNumber": "4111111111111111",
  "cardExpiryMonth": "12",
  "cardExpiryYear": "2025",
  "cardCvv": "123"
}
```

**Respuesta Exitosa**:
```json
{
  "success": true,
  "transactionNumber": "TXN-1737651234567-123",
  "message": "Payment successful",
  "paymentGatewayTransactionId": "12345678-1234-1234-1234-123456789012"
}
```

**Respuesta de Error**:
```json
{
  "success": false,
  "transactionNumber": "TXN-1737651234567-123",
  "message": "Payment declined",
  "paymentGatewayTransactionId": "12345678-1234-1234-1234-123456789012"
}
```

#### GET /payments/status/:transactionNumber
Obtiene el estado de una transacción específica.

**Respuesta**:
```json
{
  "id": 1,
  "transactionNumber": "TXN-1737651234567-123",
  "status": "APPROVED",
  "amount": 4500000,
  "customerEmail": "test@example.com",
  "customerName": "Test User",
  "cardNumber": "4111111111111111",
  "cardExpiryMonth": "12",
  "cardExpiryYear": "2025",
  "cardCvv": "123",
  "paymentGatewayTransactionId": "12345678-1234-1234-1234-123456789012",
  "product": {
    "id": 1,
    "name": "iPhone 15 Pro",
    "price": 4500000
  },
  "createdAt": "2025-10-24T02:40:39.000Z",
  "updatedAt": "2025-10-24T02:40:39.000Z"
}
```

## 🏗️ Arquitectura

### Estructura del Proyecto
```
src/
├── config/           # Configuración de la aplicación
├── dto/             # Data Transfer Objects
├── entities/        # Entidades de base de datos
├── interfaces/      # Interfaces TypeScript
├── modules/         # Módulos de la aplicación
│   ├── products/   # Módulo de productos
│   └── payments/   # Módulo de pagos
└── main.ts         # Punto de entrada
```

### Módulos

#### ProductsModule
- **ProductsController**: Maneja las rutas HTTP para productos
- **ProductsService**: Lógica de negocio para productos
- **Product Entity**: Modelo de datos para productos

#### PaymentsModule
- **PaymentsController**: Maneja las rutas HTTP para pagos
- **PaymentsService**: Lógica de negocio para pagos
- **Transaction Entity**: Modelo de datos para transacciones

### Entidades

#### Product
```typescript
{
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Transaction
```typescript
{
  id: number;
  transactionNumber: string;
  status: 'PENDING' | 'APPROVED' | 'DECLINED' | 'FAILED';
  amount: number;
  customerEmail: string;
  customerName: string;
  cardNumber: string;
  cardExpiryMonth: string;
  cardExpiryYear: string;
  cardCvv: string;
  paymentGatewayTransactionId: string;
  paymentGatewayResponse: string;
  errorMessage: string;
  product: Product;
  productId: number;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🔧 Integración con Payment Gateway

### Flujo de Pago

1. **Validación**: Se valida que el producto existe y tiene stock
2. **Creación de Transacción**: Se crea una transacción en estado PENDING
3. **Tokenización**: Se crea un token de tarjeta con el Payment Gateway
4. **Procesamiento**: Se envía la transacción al Payment Gateway
5. **Actualización**: Se actualiza el estado de la transacción según la respuesta
6. **Stock**: Se actualiza el stock del producto si el pago es exitoso

## 📝 Scripts Disponibles

- `npm run start` - Inicia la aplicación
- `npm run start:dev` - Inicia en modo desarrollo con hot reload
- `npm run start:debug` - Inicia en modo debug
- `npm run build` - Compila la aplicación
- `npm run test` - Ejecuta tests unitarios
- `npm run test:cov` - Ejecuta tests con cobertura
- `npm run test:e2e` - Ejecuta tests e2e
- `npm run lint` - Ejecuta ESLint
- `npm run seed` - Pobla la base de datos con datos de prueba
- `npm run db:reset` - Resetea y repobla la base de datos

## 🔒 Seguridad

- Validación de entrada con DTOs
- Sanitización de datos
- Manejo seguro de errores
- Logs de auditoría
- Variables de entorno para credenciales

## 📊 Monitoreo

- Logs estructurados
- Métricas de transacciones
- Alertas de errores
- Monitoreo de rendimiento