import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // get environment variables from .env file
  const configService = app.get(ConfigService);

  // set origin based on environment
  const env = configService.get('NODE_ENV');
  const origin = env === 'PROD' ? 'PROD_ORIGIN' : 'DEV_ORIGIN';
  
  // app settings
  app.enableCors({
    origin: configService.get(origin),
    credentials: true
  });
  app.use(cookieParser());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
