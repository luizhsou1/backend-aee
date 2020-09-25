import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import { winstonConfig } from './core/configs/winston.config';
import { setupSwagger } from './core/swagger/swagger.setup';

async function bootstrap() {
  const logger = WinstonModule.createLogger(winstonConfig);
  const app = await NestFactory.create(AppModule, { logger });
  app.setGlobalPrefix('api/v1');
  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();
