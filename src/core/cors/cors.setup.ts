import { INestApplication } from '@nestjs/common';

export const setupCors = (app: INestApplication) => {
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });
};
