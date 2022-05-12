import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LinkDocument = Link & Document;

@Schema()
export class Link {
  
    @Prop({ required: true })
    uid: string;
    
    @Prop({ required: false })
    username: string;
    
    @Prop({ required: true })
    name: string;

    @Prop({ required: false })
    url?: string;

    @Prop({ required: true})
    campaign: string;

    @Prop({ required: false })
    tags?: [string];

    @Prop({ default: 0})
    clicks: number;

    @Prop({ required: false })
    msg?: string;

    @Prop({ default: new Date(), required: false })
    createdAt?: Date;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
