export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    uri: process.env.MONGO_URI,
  },
  auth: {
    secretKey: process.env.SECRET_KEY,
    expiresInMin: parseInt(process.env.JWT_EXPIRES_IN_MIN, 10),
  },
  app: {
    title: process.env.APP_TITLE,
    description: process.env.APP_DESCRIPTION,
    version: process.env.APP_VERSION,
    tag: process.env.APP_TAG,
  },
});
