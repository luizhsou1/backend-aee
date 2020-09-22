import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'backend_special',
  password: '123',
  database: 'backend_special',
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  synchronize: true,
};
