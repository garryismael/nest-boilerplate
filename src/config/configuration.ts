export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: process.env.DB_TYPE as 'postgres' | 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  auth: {
    secretKey: process.env.SECRET_KEY,
    expiresInMin: parseInt(process.env.JWT_EXPIRES_IN_MIN, 10),
  },
});
