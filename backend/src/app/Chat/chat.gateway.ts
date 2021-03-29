import { Socket, Server } from 'socket.io';
import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../../api/User/user.service';
import { RoomService } from '../../api/Room/room.service';
import { forwardRef, Inject, Logger } from '@nestjs/common';
import { MessageService } from '../../api/Message/message.service';
import environment from 'src/tools/environment';

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer() server: Server;

  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => RoomService))
    private readonly roomService: RoomService,
    @Inject(forwardRef(() => MessageService))
    private readonly messageService: MessageService,
  ) {}

  private logger: Logger = new Logger('AppGateway');

  async handleConnection(socket: Socket) {
    const token = socket.handshake.query.token;
    const payload: any = jwt.verify(token, environment.token);
    const user = await this.userService.findOne({ _id: payload._id }, {});
    this.roomService.initJoin(user, socket);
    console.log(socket.handshake.query.userId);
    this.logger.log('connected');
  }

  async handleDisconnect(client: Socket): Promise<any> {
    client.disconnect();
  }

  @SubscribeMessage('join')
  async onRoomJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { chatroom: string },
  ): Promise<any> {
    client.join(body.chatroom);
    this.logger.log('user joined');
  }

  @SubscribeMessage('roomMessage')
  async onMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { receiver: string; txt: string; roomId: string },
  ): Promise<void> {
    const receiver = await this.userService.findOne(
      { email: body.receiver },
      {},
    );
    const createdMessage = await this.messageService.createMessage(
      client.handshake.query.userId,
      receiver,
      body.txt,
    );
    const room = await this.roomService.findById(body.roomId);
    await room.updateOne({
      $push: {
        messages: createdMessage,
      },
    });
    this.server.to(room.name).emit('outputMessage', createdMessage);
  }

  afterInit() {
    this.logger.log('init');
  }
}
