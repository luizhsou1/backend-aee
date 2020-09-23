import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './core/configs/typeorm.config';
import { winstonConfig } from './core/configs/winston.config';
import { LoggerInterceptor } from './core/interceptors/logger.interceptor';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    WinstonModule.forRoot(winstonConfig),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule { }

// @Module({
//   imports: [
//     TypeOrmModule.forRoot(typeOrmConfig),
//     WinstonModule.forRoot(winstonConfig),
//     UsersModule,
//     AuthModule,
//   ],
//   controllers: [AppController],
//   providers: [
//     AppService,
//     {
//       provide: APP_INTERCEPTOR,
//       useClass: LoggerInterceptor,
//     },
//   ],
// })
// export class AppModule { }
