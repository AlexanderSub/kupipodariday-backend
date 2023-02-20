import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston/dist/winston.constants';
import { AppModule } from './app.module';
import helmet from 'helmet';
import csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  app.use(helmet()); // защита от XSS-атак
  app.use(csurf()); // защита от CSRF-атак

  await app.listen(3000);
}
bootstrap();
