import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GenerateController } from './generate.controller';
import { GenerateService } from './generate.service';
import { Link, LinkSchema } from './links.schema';
import { User, UserSchema } from '../users/users.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Link.name, schema: LinkSchema },
            { name: User.name, schema: UserSchema }
        ]),
        ConfigModule.forRoot(),
    ],
    controllers: [GenerateController],
    providers: [GenerateService],
    exports: [GenerateService]
})
export class GenerateModule {}
