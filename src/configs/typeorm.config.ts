import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'special',
  password: '123',
  database: 'special',
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  synchronize: true,
};
