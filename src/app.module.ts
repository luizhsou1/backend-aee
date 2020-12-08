import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerInterceptor } from './core/interceptors/logger.interceptor';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { SchoolsModule } from './modules/schools/schools.module';
import { AdressesModule } from './modules/old/adresses/adresses.module';
import { PhonesModule } from './modules/old/phones/phones.module';
import { DeficienciesModule } from './modules/deficiencies/deficiencies.module';
import appConfig from './core/configs/app.config';
import typeormConfig from './core/configs/typeorm.config';
import mailerConfig from './core/configs/mailer.config';
import { winstonConfig } from './core/configs/winston.config';
import { TeachersModule } from './modules/old/teachers/teachers.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, typeormConfig, mailerConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => (config.get('typeorm')),
      inject: [ConfigService],
    }),
    WinstonModule.forRoot(winstonConfig),
    MailerModule.forRootAsync({
      useFactory: (config: ConfigService) => (config.get('mailer')),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    SchoolsModule,
    AdressesModule,
    PhonesModule,
    DeficienciesModule,
    TeachersModule,
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
