import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

(async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  const swaggerConfig = new DocumentBuilder()
    .setTitle('telegram_helper')
    .setDescription('The telegram_helper API description')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('documentation', app, document);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000);
})();
