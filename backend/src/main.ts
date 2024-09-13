import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable cors
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('News Portal API')
    .setDescription('The News Portal API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

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
