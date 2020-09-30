import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { mailerConfig } from './core/configs/mailer.config';
import { typeOrmConfig } from './core/configs/typeorm.config';
import { winstonConfig } from './core/configs/winston.config';
import { LoggerInterceptor } from './core/interceptors/logger.interceptor';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { SchoolsModule } from './modules/schools/schools.module';
import { AdressesModule } from './modules/adresses/adresses.module';
import { PhonesModule } from './modules/phones/phones.module';
import { DeficienciesModule } from './modules/deficiencies/deficiencies.module';
import { ResponsibleModule } from './responsible/responsible.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    WinstonModule.forRoot(winstonConfig),
    MailerModule.forRoot(mailerConfig),
    UsersModule,
    AuthModule,
    SchoolsModule,
    AdressesModule,
    PhonesModule,
    DeficienciesModule,
    ResponsibleModule,
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
