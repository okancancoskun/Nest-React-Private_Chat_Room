import { forwardRef, Module } from '@nestjs/common';
import { MessageModule } from '../Message/message.module';
import { RoomModule } from '../Room/room.module';
import { UserModule } from '../User/user.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => RoomModule),
    forwardRef(() => MessageModule),
  ],
  providers: [],
})
export class ChatModule {}
