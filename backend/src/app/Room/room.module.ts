import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomService } from 'src/api/Room/room.service';
import { Room, roomSchema } from 'src/models';
import { UserModule } from '../User/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: roomSchema }]),
    forwardRef(() => UserModule),
  ],
  providers: [RoomService],
  exports: [RoomService],
})
export class RoomModule {}
