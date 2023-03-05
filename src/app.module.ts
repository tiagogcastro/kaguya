import { DatabaseModule } from './shared/database/database.module';
import { HttpModule } from '@shared/http/http.module';
import { MessagingModule } from '@shared/messaging/messaging.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [DatabaseModule, HttpModule, MessagingModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
