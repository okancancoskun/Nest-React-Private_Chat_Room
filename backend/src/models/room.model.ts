import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as Sch } from 'mongoose';
import { Message } from './message.model';
import { User } from './user.model';

@Schema()
export class Room extends Document {
  @Prop({ type: String })
  name: string;
  @Prop({ type: [{ type: Sch.Types.ObjectId, ref: User.name }] })
  users: User[];
  @Prop({ type: [{ type: Sch.Types.ObjectId, ref: Message.name }] })
  messages: Message[];
}

export const roomSchema = SchemaFactory.createForClass(Room);
