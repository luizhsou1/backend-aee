import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import { winstonConfig } from './core/configs/winston.config';
import { setupCors } from './core/cors/cors.setup';
import { setupSwagger } from './core/swagger/swagger.setup';

async function bootstrap() {
  const logger = WinstonModule.createLogger(winstonConfig);
  const app = await NestFactory.create(AppModule, { logger });
  app.setGlobalPrefix('api/v1');
  setupCors(app);
  setupSwagger(app);

  const configService = app.get(ConfigService);
  await app.listen(configService.get('app.port'));
  Logger.log(`API Projeto AEE is running on: ${(await app.getUrl()).replace('[::1]', 'localhost')}`);
}
bootstrap();
