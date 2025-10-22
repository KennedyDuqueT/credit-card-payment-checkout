import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { Transaction, TransactionStatus } from '@/entities/transaction.entity';
import {
  CreateTransactionDto,
  PaymentResponseDto,
} from '@/dto/transaction.dto';
import { ProductsService } from '@/modules/products/products.service';
import {
  PaymentGatewayConfig,
  PaymentTokenResponse,
  PaymentTransactionResponse,
  PaymentData,
} from '@/interfaces/payment-gateway.interface';

@Injectable()
export class PaymentsService {
  private readonly paymentGatewayConfig: PaymentGatewayConfig;

  constructor(
    private configService: ConfigService,
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
    private productsService: ProductsService,
  ) {
    this.paymentGatewayConfig = this.configService.get<PaymentGatewayConfig>(
      'paymentGateway',
    ) as PaymentGatewayConfig;
  }

  async processPayment(
    createTransactionDto: CreateTransactionDto,
  ): Promise<PaymentResponseDto> {
    try {
      // 1. Verificar que el producto existe y tiene stock
      const product = await this.productsService.findOne(
        createTransactionDto.productId,
      );

      if (product.stock < 1) {
        throw new HttpException('Product out of stock', HttpStatus.BAD_REQUEST);
      }

      // 2. Generar número de transacción único
      const transactionNumber = this.generateTransactionNumber();

      // 3. Crear transacción en estado PENDING
      const transaction = this.transactionsRepository.create({
        ...createTransactionDto,
        transactionNumber,
        amount: product.price,
        status: TransactionStatus.PENDING,
      });

      const savedTransaction =
        await this.transactionsRepository.save(transaction);

      // 4. Llamar a Payment Gateway API
      const paymentResponse = await this.callPaymentGatewayAPI(
        createTransactionDto,
        product.price,
      );

      // 5. Actualizar transacción con respuesta del Payment Gateway
      savedTransaction.wompiTransactionId = paymentResponse.data.id;
      savedTransaction.wompiResponse = JSON.stringify(paymentResponse.data);

      if (paymentResponse.data.status === 'APPROVED') {
        savedTransaction.status = TransactionStatus.APPROVED;
        // Actualizar stock del producto
        await this.productsService.updateStock(product.id, 1);
      } else {
        savedTransaction.status = TransactionStatus.DECLINED;
        savedTransaction.errorMessage =
          paymentResponse.data.status_message || 'Payment declined';
      }

      await this.transactionsRepository.save(savedTransaction);

      return {
        success: savedTransaction.status === TransactionStatus.APPROVED,
        transactionNumber: savedTransaction.transactionNumber,
        message:
          savedTransaction.status === TransactionStatus.APPROVED
            ? 'Payment successful'
            : savedTransaction.errorMessage || 'Payment failed',
        paymentGatewayTransactionId: savedTransaction.wompiTransactionId,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Payment processing failed';
      const errorStatus =
        error instanceof HttpException
          ? error.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

      throw new HttpException(errorMessage, errorStatus);
    }
  }

  private async callPaymentGatewayAPI(
    transactionData: CreateTransactionDto,
    amount: number,
  ): Promise<PaymentTransactionResponse> {
    const paymentData: PaymentData = {
      amount_in_cents: Math.round(amount * 100), // Convertir a centavos
      currency: 'COP',
      customer_email: transactionData.customerEmail,
      payment_method: {
        type: 'CARD',
        installments: 1,
        token: await this.createPaymentToken(transactionData),
      },
      reference: transactionData.productId.toString(),
      payment_source_id: 1,
    };

    const response = await axios.post<PaymentTransactionResponse>(
      `${this.paymentGatewayConfig.baseUrl}/transactions`,
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${this.paymentGatewayConfig.privateKey}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  }

  private async createPaymentToken(
    transactionData: CreateTransactionDto,
  ): Promise<string> {
    const tokenData = {
      number: transactionData.cardNumber,
      cvc: transactionData.cardCvv,
      exp_month: transactionData.cardExpiryMonth,
      exp_year: transactionData.cardExpiryYear,
      card_holder: transactionData.customerName,
    };

    const response = await axios.post<PaymentTokenResponse>(
      `${this.paymentGatewayConfig.baseUrl}/tokens/cards`,
      tokenData,
      {
        headers: {
          Authorization: `Bearer ${this.paymentGatewayConfig.publicKey}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data.data.id;
  }

  private generateTransactionNumber(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `TXN-${timestamp}-${random}`;
  }

  async getTransactionStatus(transactionNumber: string): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findOne({
      where: { transactionNumber },
      relations: ['product'],
    });

    if (!transaction) {
      throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
    }

    return transaction;
  }
}
