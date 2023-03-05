export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  database: {
    type: process.env.DATABASE_TYPE || 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.USERNAME || 'student',
    password: process.env.PASSWORD || 'student',
    database: process.env.DATABASE_NAME || 'kupipodariday',
  },
  secretKey: process.env.JWT_SECRET || 'secret_key',
  expiresIn: 3600 * 24,
});
