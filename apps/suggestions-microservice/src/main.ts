import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();

  const port = Number(process.env.PORT) || 3333;

  await app.listen(port, () => {
    console.log(`[Kaguya Suggestion] HTTP started on port ${port}`);
  });
}
bootstrap();
