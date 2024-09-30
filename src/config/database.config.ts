export default () => ({
  database: {
    host: process.env.MONGO_HOST,
    dbName: process.env.MONGO_DB_NAME,
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASSWORD,
  },
});
console.log("🚀 ~ process.env.MONGO_HOST:", process.env.MONGO_HOST)
