import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from 'src/models';
import { RoomService } from '../Room/room.service';
import { UserService } from '../User/user.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<Message>,
    @Inject(forwardRef(() => RoomService))
    private readonly roomService: RoomService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async createMessage(
    sender: any,
    receiver: any,
    msg: string,
  ): Promise<Message> {
    const room = await this.roomService.create(sender, receiver.username);
    const snd = await this.userService.findOne({ _id: sender }, {});
    return await this.messageModel.create({
      message: msg,
      user: sender,
      room: room,
      username: snd.username,
    });
  }
}
