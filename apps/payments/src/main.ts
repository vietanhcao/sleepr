import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { Logger } from 'nestjs-pino';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get('TCP_PORT'),
    },
  });

  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();
  // app.use(cookieParser());
  // app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // const configService = app.get(ConfigService);
  // await app.listen(configService.get('HTTP_PORT'));
}
bootstrap();
