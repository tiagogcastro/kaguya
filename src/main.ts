import * as cookieParser from 'cookie-parser';

import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use(cookieParser());

  // const brokers = [process.env.KAFKA_CLIENT_BROKER_1 || 'localhost:9092'];

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.KAFKA,
  //   options: {
  //     client: {
  //       clientId: process.env.KAFKA_CLIENT_ID,
  //       brokers,
  //     },
  //   },
  // });

  // app.startAllMicroservices().then(() => {
  //   console.log('[Kaguya Suggestion] Microservices started');
  // });

  await app.listen(3334, () => {
    console.log('[Kaguya Suggestion] HTTP started');
  });
}
bootstrap();
