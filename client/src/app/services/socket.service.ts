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

  public onMessage(): Observable<MessageModel> {
    return new Observable<MessageModel>(observer => {
      this.socket.on('chat', (data: MessageModel) => observer.next(data));
    });
  }
}
