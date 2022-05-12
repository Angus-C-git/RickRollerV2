import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthService } from './health/health.service';
import { GenerateService } from './generate/generate.service';
import { HealthController } from './health/health.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { GenerateController } from './generate/generate.controller';
import { GenerateModule } from './generate/generate.module';
import { RollModule } from './roll/roll.module';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule,
    AuthModule,
    GenerateModule,
    RollModule,
    StatsModule,
  ],
  controllers: [HealthController, AppController, GenerateController],
  providers: [HealthService],
})
export class AppModule {}
