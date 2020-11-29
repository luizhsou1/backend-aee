import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import * as path from 'path';

import { registerAs } from '@nestjs/config';

export default registerAs('mailer', () => ({
  template: {
    dir: path.resolve(__dirname, '..', '..', '..', 'templates'),
    adapter: new HandlebarsAdapter(),
    options: {
      extName: '.hbs',
      layoutsDir: path.resolve(__dirname, '..', '..', '..', 'templates'),
    },
  },
  transport: process.env.URL_TRANSPORT,
}));
