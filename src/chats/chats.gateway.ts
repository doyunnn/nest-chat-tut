import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection, OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import {Socket} from 'socket.io'
import { Logger } from '@nestjs/common';

/*
 Lifecycle events

 1. constructor
 2. OnGatewayInit - afterInit
 3. OnGatewayConnection - handleConnection
 4. OnGatewayDisconnect - handleDisconnect

*/

@WebSocketGateway({namespace: '/chattings'})
export class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

  private logger = new Logger('Chat');

  constructor() {
    // 1
    this.logger.log('constructor');
  }

  afterInit() {
    // 2
    this.logger.log('init');
  }

  handleConnection(client: any, ...args): any {
    // connected
    this.logger.log('conected');
  }

  handleDisconnect(client: any): any {
    // disconnected
    this.logger.log('disconnected');
  }

  @SubscribeMessage('new_user') // 3
  handleNewUser(@MessageBody() username: string, @ConnectedSocket() socket:Socket) {
    // username db에 적재
    socket.broadcast.emit('user_connected', username);
    return username
  }

  @SubscribeMessage('submit_chat') // 3
  handleSubmitChat(@MessageBody() chat: string, @ConnectedSocket() socket:Socket) {
    // username db에 적재
    socket.broadcast.emit('new_chat', {chat, username: socket.id});
  }
}
