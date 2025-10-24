import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';

export enum TransactionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED',
  FAILED = 'FAILED',
}

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  transactionNumber: string;

  @Column({ type: 'varchar', length: 20, default: TransactionStatus.PENDING })
  status: TransactionStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'varchar', length: 255 })
  customerEmail: string;

  @Column({ type: 'varchar', length: 255 })
  customerName: string;

  @Column({ type: 'varchar', length: 19 })
  cardNumber: string;

  @Column({ type: 'varchar', length: 4 })
  cardExpiryMonth: string;

  @Column({ type: 'varchar', length: 4 })
  cardExpiryYear: string;

  @Column({ type: 'varchar', length: 3 })
  cardCvv: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  paymentGatewayTransactionId: string;

  @Column({ type: 'text', nullable: true })
  paymentGatewayResponse: string;

  @Column({ type: 'text', nullable: true })
  errorMessage: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  productId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
