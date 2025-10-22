import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import {
  CreateTransactionDto,
  PaymentResponseDto,
} from '@/dto/transaction.dto';
import { Transaction } from '@/entities/transaction.entity';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('process')
  async processPayment(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<PaymentResponseDto> {
    return this.paymentsService.processPayment(createTransactionDto);
  }

  @Get('status/:transactionNumber')
  async getTransactionStatus(
    @Param('transactionNumber') transactionNumber: string,
  ): Promise<Transaction> {
    return this.paymentsService.getTransactionStatus(transactionNumber);
  }
}
