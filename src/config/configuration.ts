export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    uri: process.env.MONGO_URI,
  },
  app: {
    title: process.env.APP_TITLE,
    description: process.env.APP_DESCRIPTION,
    version: process.env.APP_VERSION,
    tag: process.env.APP_TAG,
  },
});
