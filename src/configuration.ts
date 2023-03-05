export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  secretKey: process.env.JWT_SECRET || 'secret_key',
  expiresIn: 3600 * 24,
});
