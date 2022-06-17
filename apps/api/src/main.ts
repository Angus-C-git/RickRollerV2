import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // get environment variables from .env file
  const configService = app.get(ConfigService);

  // set origin based on environment
  const env = configService.get('NODE_ENV');
  const origin = env === 'PROD' ? 'PROD_ORIGIN' : 'DEV_ORIGIN';

  app.enableCors({
    origin: configService.get(origin),
    credentials: true
  });
  await app.listen(3000);
}
bootstrap();
