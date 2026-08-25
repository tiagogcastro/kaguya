import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaService } from '@/shared/database/prisma/prisma.service';

import { SuggestiveRepository } from '@/modules/suggestive/infra/prisma/repositories/suggestive-repository';
import { CreateSuggestiveService } from '@/modules/suggestive/services/create-suggestive.service';
import { KafkaService } from './kafka.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [],
  providers: [CreateSuggestiveService, SuggestiveRepository, PrismaService, KafkaService]
})
export class MessagingModule {}
