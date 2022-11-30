import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Las Rutas existentes son: /products, /users, /auth/login, /auth/register';
  }
}
