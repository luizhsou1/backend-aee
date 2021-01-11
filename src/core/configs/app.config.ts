import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT) || 3060,
  jwtSecret: process.env.JWT_SECRET || 'super-secret',
}));
