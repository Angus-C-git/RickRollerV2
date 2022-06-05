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

  @Prop({ default: 1, required: false })
  rank: number;

  @Prop({ default: 0, required: false })
  previousRank: number; // within 24hours

  @Prop({ default: new Date(), required: false })
  rankUpdated:  Date; 

  @Prop({ default: 0, required: false })
  clicks: number;

  @Prop({ default: 0, required: false })
  previousClicks: number; // within 24hours

  @Prop({ default: new Date(), required: false })
  clicksUpdated: Date;

  @Prop({ default: 0, required: false })
  generatedLinks: number;

  @Prop({ default: [], required: false })
  campaigns: [{
    name: string,
    clicks: number,
    started: Date,
  }];

  /**
   * Temporary storage for clicks
   * history on a monthly basis
   */
  @Prop({ default: [
      {
        month: 'Jan',
        clicks: 0,
      },
      {
        month: 'Feb',
        clicks: 0,
      },
      {
        month: 'Mar',
        clicks: 0,
      },
      {
        month: 'Apr',
        clicks: 0,
      },
      {
        month: 'May',
        clicks: 0,
      },
      {
        month: 'Jun',
        clicks: 0,
      },
      {
        month: 'Jul',
        clicks: 0,
      },
      {
        month: 'Aug',
        clicks: 0,
      },
      {
        month: 'Sep',
        clicks: 0,
      },
      {
        month: 'Oct',
        clicks: 0,
      },
      {
        month: 'Nov',
        clicks: 0,
      },
      {
        month: 'Dec',
        clicks: 0,
      },
  ], required: false })
  clicksHistory: [{
    month: string,
    clicks: number,
  }];

  @Prop({ default: new Date(), required: false })
  createdAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
