import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//async function bootstrap() {
//  const app = await NestFactory.create(AppModule);
//  await app.listen(process.env.PORT ?? 3000);
//}
//bootstrap();

// main.ts en NestJS
//async function bootstrap() {
//  const app = await NestFactory.create(AppModule);
//  app.enableCors(); // habilita CORS
//  await app.listen(4000); // cambia a 4000
//}
//bootstrap();

import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // agregá esta línea
  app.enableCors();
  await app.listen(4000);
}
bootstrap();
