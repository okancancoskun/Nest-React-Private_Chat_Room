import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as Sch } from 'mongoose';
import { Category } from './category.model';
import { User } from './user.model';

@Schema({ timestamps: true })
export class Post extends Document {
  @Prop({ type: String, required: true })
  title: string;
  @Prop({ type: String, required: true })
  content: string;
  @Prop({ type: Sch.Types.ObjectId, ref: Category.name })
  categoryId: Category;
  @Prop({ type: Sch.Types.ObjectId, ref: User.name })
  authorId: User;
}
export const postSchema = SchemaFactory.createForClass(Post);
