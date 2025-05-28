import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Message extends Document {

  @Prop({ required: true, type: Types.ObjectId, ref: 'Chat' })
  chat_id: Types.ObjectId;
  
  @Prop({ required: true })
  description: string;
  
  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  message: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
