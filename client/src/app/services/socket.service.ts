import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import * as io from 'socket.io-client';
import { MessageModel } from '../models/message.model';

@Injectable()
export class SocketService {

  private socket;
  private serverUrl = 'http://localhost:4000';

  public initSocket(): void {
    this.socket = io(this.serverUrl);
  }

  public send(message: MessageModel): void {
    this.socket.emit('chat', message);
  }

  public emitJoinEvent(userName: string): void {
    this.socket.emit('join', userName);
  }

  public emitDeleteMessage(message: MessageModel): void {
    this.socket.emit('delete', message);
  }

  public emitEditMessage(message: MessageModel, newMessage: string): void {
    this.socket.emit('edit', message, newMessage);
  }

  public emitExitUser(userName: string): void {
    this.socket.emit('exitUser', userName);
  }

  public onMessage(): Observable<MessageModel> {
    return new Observable<MessageModel>(observer => {
      this.socket.on('chat', (data: MessageModel) => observer.next(data));
    });
  }

  public onEvent<T>(event: string): Observable<T> {
    return new Observable<T>(observer => {
      this.socket.on(event, (name: T) => observer.next(name));
    });
  }
}
