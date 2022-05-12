import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: 0, required: false })
  rank: number;

  @Prop({ default: 0, required: false })
  previousRank: number; // within 24hours

  @Prop({ default: new Date(), required: false })
  rankUpdated:  Date; 

  @Prop({ default: 0, required: false })
  clicks: number;

//   @Prop({ default: 0, required: false })
//   netCampaigns: number;

  @Prop({ default: 0, required: false })
  generatedLinks: number;

  @Prop({ default: [], required: false })
  campaigns: [{
    name: string,
    clicks: number,
    started: Date,
  }];

  @Prop({ default: [], required: false })
  clicksHistory: [{
    date: Date,
    clicks: number,
  }];

  @Prop({ default: new Date(), required: false })
  createdAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
