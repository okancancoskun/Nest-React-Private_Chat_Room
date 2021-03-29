import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageService } from 'src/api/Message/message.service';
import { Message, MessageSchema } from 'src/models';
import { RoomModule } from '../Room/room.module';
import { UserModule } from '../User/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Message.name,
        schema: MessageSchema,
      },
    ]),
    forwardRef(() => RoomModule),
    forwardRef(() => UserModule),
  ],
  providers: [MessageService],
})
export class MessageModule {}
