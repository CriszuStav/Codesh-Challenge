import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swagger = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('/docs', app, swagger, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationSorter: 'alpha',
    },
  });

  await app.listen(process.env.PORT);
}

bootstrap();
