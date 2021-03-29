import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Role extends Document {
  @Prop({ type: String }) name: string;
}
export const roleSchema = SchemaFactory.createForClass(Role);
