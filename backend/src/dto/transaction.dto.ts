import {
  IsString,
  IsNumber,
  IsEmail,
  IsPositive,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  @IsPositive()
  productId: number;

  @IsEmail()
  customerEmail: string;

  @IsString()
  @MinLength(1)
  @MaxLength(255)
  customerName: string;

  @IsString()
  @Matches(/^\d{13,19}$/, {
    message: 'Card number must be between 13 and 19 digits',
  })
  cardNumber: string;

  @IsString()
  @Matches(/^(0[1-9]|1[0-2])$/, {
    message: 'Expiry month must be between 01 and 12',
  })
  cardExpiryMonth: string;

  @IsString()
  @Matches(/^(20[2-9][0-9]|2[1-9][0-9][0-9])$/, {
    message: 'Expiry year must be 2024 or later',
  })
  cardExpiryYear: string;

  @IsString()
  @Matches(/^\d{3,4}$/, { message: 'CVV must be 3 or 4 digits' })
  cardCvv: string;
}

export class PaymentResponseDto {
  success: boolean;
  transactionNumber: string;
  message: string;
  wompiTransactionId?: string;
}
