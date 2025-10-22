import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { Transaction } from '@/entities/transaction.entity';
import { ProductsModule } from '@/modules/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    ProductsModule,
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
