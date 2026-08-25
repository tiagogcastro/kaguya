import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { ConfigService } from '@nestjs/config';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService
  extends ClientKafka
  implements OnModuleInit, OnModuleDestroy
{
  private connected = false;

  constructor(configService: ConfigService) {
    super({
      client: {
        clientId: process.env.KAFKA_CLIENT_ID || 'kaguya_suggestion',
        brokers: [configService.get('KAFKA_BROKERS') || 'localhost:29092'],
      },
    });
  }

  async onModuleInit() {
    if (process.env.KAFKA_ENABLED !== 'true') {
      return;
    }

    await this.connect();

    this.connected = true;
  }

  async onModuleDestroy() {
    if (!this.connected) {
      return;
    }

    await this.close();
  }
}
