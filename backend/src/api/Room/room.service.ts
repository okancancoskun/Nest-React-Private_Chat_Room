import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, User } from 'src/models';
import { UserService } from '../User/user.service';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<Room>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  public initJoin(user: User, client) {
    let roomsToJoin = [];
    user.rooms.forEach((room) => {
      return roomsToJoin.push(room.name);
    });
    client.join(roomsToJoin);
  }
  async create(sender: any, receiver: string): Promise<Room> {
    const Receiver = await this.userService.findOne({ username: receiver }, {});
    const Sender = await this.userService.findOne({ _id: sender }, {});

    const room = await this.checkRoomExist(Sender, Receiver);
    if (!room) {
      const newRoom = new this.roomModel();
      newRoom.users = [Sender._id, Receiver._id];
      newRoom.name = this.generateRoomName(Sender, Receiver);
      return newRoom
        .save()
        .then((room) =>
          room.populate({ path: 'users messages', populate: { path: 'user' } }),
        );
    } else {
      return room;
    }
  }
  async checkRoomExist(sender: User, receiver: User): Promise<Room> {
    return await this.roomModel
      .findOne({ name: this.generateRoomName(sender, receiver) })
      .populate({ path: 'users messages', populate: 'user' });
  }

  async findById(id: string): Promise<Room> {
    return await this.roomModel.findById(id);
  }

  private generateRoomName(sender: User, receiver: User) {
    if (sender.username.localeCompare(receiver.username) === -1) {
      return sender.username + '-' + receiver.username;
    } else if (sender.username.localeCompare(receiver.username) === 1) {
      return receiver.username + '-' + sender.username;
    } else {
      throw new HttpException('Hata', HttpStatus.FORBIDDEN);
    }
  }
}
