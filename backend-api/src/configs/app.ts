export default {
  env: process.env.NODE_ENV || 'development',
  name: process.env.APP_NAME,
  port: Number(process.env.APP_PORT),
  base: process.env.APP_BASE_URL,
  api: {
    version: 'v1',
    prefix(): string {
      return `/api/${this.version}`;
    },
  },
  origins: process.env.APP_ALLOWED_ORIGINS!.split(','),
};
