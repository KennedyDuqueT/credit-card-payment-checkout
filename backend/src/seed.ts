import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProductsService } from '@/modules/products/products.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const productsService = app.get(ProductsService);

  // Crear productos de ejemplo
  const sampleProducts = [
    {
      name: 'iPhone 15 Pro',
      description: 'El iPhone más avanzado con chip A17 Pro y cámara de 48MP',
      price: 4500000,
      imageUrl: 'https://via.placeholder.com/300x300?text=iPhone+15+Pro',
      stock: 10,
    },
    {
      name: 'Samsung Galaxy S24 Ultra',
      description: 'Smartphone premium con S Pen y cámara de 200MP',
      price: 4200000,
      imageUrl: 'https://via.placeholder.com/300x300?text=Galaxy+S24+Ultra',
      stock: 8,
    },
    {
      name: 'MacBook Air M3',
      description: 'Laptop ultradelgada con chip M3 y pantalla Liquid Retina',
      price: 6500000,
      imageUrl: 'https://via.placeholder.com/300x300?text=MacBook+Air+M3',
      stock: 5,
    },
    {
      name: 'AirPods Pro 2',
      description: 'Auriculares inalámbricos con cancelación de ruido activa',
      price: 1200000,
      imageUrl: 'https://via.placeholder.com/300x300?text=AirPods+Pro+2',
      stock: 15,
    },
    {
      name: 'Apple Watch Series 9',
      description: 'Reloj inteligente con GPS y monitor de salud avanzado',
      price: 2800000,
      imageUrl: 'https://via.placeholder.com/300x300?text=Apple+Watch+9',
      stock: 12,
    },
  ];

  console.log('🌱 Seeding database with sample products...');

  for (const productData of sampleProducts) {
    try {
      await productsService.create(productData);
      console.log(`✅ Created product: ${productData.name}`);
    } catch (error) {
      console.log(`❌ Error creating product ${productData.name}:`, error.message);
    }
  }

  console.log('🎉 Database seeding completed!');
  await app.close();
}

bootstrap();
