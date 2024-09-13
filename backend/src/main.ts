import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove properties that do not have a matching DTO property
      forbidNonWhitelisted: true, // If a property is not in the DTO, throw an error
      transform: true, // Transform the incoming data to the DTO type
    }),
  );

  app.setGlobalPrefix('api');
  await app.listen(4000);
}
bootstrap();
