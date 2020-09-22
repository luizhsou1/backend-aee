import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // eslint-disable-next-line class-methods-use-this
  getHello(): string {
    return 'Backend Projeto Special de Pé!!! \u{1F601}';
  }
}
