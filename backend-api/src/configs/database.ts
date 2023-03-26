export default {
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  dialect: process.env.DATABASE_DIALECT!,
  username: process.env.DATABASE_USERNAME!,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME!,
};
