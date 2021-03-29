import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document, Schema as Sch } from 'mongoose';
import { Room } from './room.model';
import { User } from './user.model';

@Schema()
export class Message extends Document {
  @Prop({ type: String })
  message: string;
  @Prop({ type: Sch.Types.ObjectId, ref: User.name })
  user: User;
  @Prop({ type: Sch.Types.ObjectId, ref: Room.name })
  room: Room;
  @Prop({ type: String })
  username: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
