import { Module } from '@nestjs/common';
import { RollService } from './roll.service';
import { RollController } from './roll.controller';
import { Link, LinkSchema } from '../generate/links.schema';
import { User, UserSchema } from '../users/users.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: Link.name, schema: LinkSchema },
        { name: User.name, schema: UserSchema }
    ]), 
  ],
  providers: [RollService],
  controllers: [RollController]
})
export class RollModule {}


/**
 * Application function responsible for handling clicked links
 */