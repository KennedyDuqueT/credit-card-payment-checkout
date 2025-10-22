export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    type: 'sqlite',
    database: process.env.DATABASE_PATH || 'database.sqlite',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: process.env.NODE_ENV !== 'production',
  },
  paymentGateway: {
    baseUrl: process.env.PAYMENT_GATEWAY_BASE_URL,
    publicKey: process.env.PAYMENT_GATEWAY_PUBLIC_KEY,
    privateKey: process.env.PAYMENT_GATEWAY_PRIVATE_KEY,
    integrityKey: process.env.PAYMENT_GATEWAY_INTEGRITY_KEY,
  },
});
