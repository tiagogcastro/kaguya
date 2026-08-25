import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService
  extends ClientKafka
  implements OnModuleInit, OnModuleDestroy
{
  constructor(configService: ConfigService) {
    super({
      client: {
        clientId: process.env.KAFKA_CLIENT_ID || 'kaguya_suggestion',
        brokers: [configService.get('KAFKA_BROKERS')],
      },
    });
  }

  async onModuleInit() {
    await this.connect();
  }

  async onModuleDestroy() {
    await this.close();
  }
}