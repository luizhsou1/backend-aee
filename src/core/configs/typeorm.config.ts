import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs('typeorm', (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5436,
  username: process.env.DB_USERNAME || 'backend_aee',
  password: process.env.DB_PASSWORD || '123',
  database: process.env.DB_DBNAME || 'backend_aee',
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: process.env.DB_LOGGING === 'true',
  entities: [
    `${__dirname}/../../modules/**/*.entity.{js,ts}`,
    `${__dirname}/../../shared/**/*.entity.{js,ts}`,
  ],
}));
