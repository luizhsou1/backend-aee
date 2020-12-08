import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Documentação AEE')
    .setDescription('Documentação do projeto AEE')
    .setVersion('0.0.1')
    .addTag('application')
    .addTag('auth')
    .addTag('schools')
    .addTag('users')
    .build();
  const doc = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/v1/docs', app, doc);
};
