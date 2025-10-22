export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    type: 'sqlite',
    database: process.env.DATABASE_PATH || 'database.sqlite',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: process.env.NODE_ENV !== 'production',
  },
  wompi: {
    baseUrl: process.env.WOMPI_BASE_URL || 'https://api-sandbox.co.uat.wompi.dev/v1',
    publicKey: process.env.WOMPI_PUBLIC_KEY || 'pub_stagtest_g2u0HQd3ZMh05hsSgTS2lUV8t3s4mOt7',
    privateKey: process.env.WOMPI_PRIVATE_KEY || 'prv_stagtest_5i0ZGIGiFcDQifYsXxvsny7Y37tKqFWg',
    integrityKey: process.env.WOMPI_INTEGRITY_KEY || 'stagtest_integrity_nAIBuqayW70XpUqJS4qf4STYiISd89Fp',
  },
});
