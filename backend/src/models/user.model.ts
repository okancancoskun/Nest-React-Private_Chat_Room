import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HookNextFunction, Schema as Sch } from 'mongoose';
import { Role, roleSchema } from './role.model';
import { hash } from 'bcrypt';
import { Room } from './room.model';

@Schema()
export class User extends Document {
  @Prop({ type: String, required: true })
  email: string;
  @Prop({ type: String, required: true })
  username: string;
  @Prop({ type: String, required: true })
  password: string;
  @Prop({ type: String, ref: Role.name })
  roleId: Role;
  @Prop({ type: [{ type: Sch.Types.ObjectId, ref: 'Room' }] }) rooms: Room[];
}
export const userSchema = SchemaFactory.createForClass(User);

userSchema.pre('save', async function (next: HookNextFunction): Promise<void> {
  (this as User).password = await hash((this as User).password, 8);
  next();
});

userSchema.pre(
  'findOneAndUpdate',
  async function (next: HookNextFunction): Promise<void> {
    if ((this as any)._update.password) {
      (this as any)._update.password = await hash(
        (this as any)._update.password,
        8,
      );
      next();
    } else {
      next();
    }
  },
);
