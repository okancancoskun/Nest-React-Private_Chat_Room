import { Controller, Get, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { RoomService } from 'src/api/Room/room.service';
import { Room } from 'src/models';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('/create/:receiver')
  async createRoom(
    @Req() req: Request,
    @Param('receiver') receiver: string,
  ): Promise<Room> {
    return await this.roomService.create(req.user._id, receiver);
  }
}
