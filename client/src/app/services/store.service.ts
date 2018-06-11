import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { MessageModel } from '../models/message.model';
import { InfoMessageModel } from '../models/info-message..model';

@Injectable()
export class StoreService {

  private user: UserModel;
  public userSubject: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(this.user);
  public get state$(): Observable<UserModel> {
    return this.userSubject.asObservable();
  }

  public saveName(name: string, avatar: string): void {
    if (!this.user) {
      this.user = new UserModel(name, avatar);
    } else {
      this.user.name = name;
    }

    this.userSubject.next(this.user);
  }

  public addMessage(message: MessageModel): void {
    this.user.messages.push(new MessageModel(message));

    this.userSubject.next(this.user);
  }

  public deleteMessage(message: MessageModel): void {
    if (!message) {
      return;
    }
    const index = this.user.messages.findIndex(messageData => {
      const userMessage = messageData instanceof MessageModel
        ? messageData
        : null;
      if (userMessage) {
        return userMessage.message === message.message;
      }
      return false;
    });

    if (index > -1) {
      this.user.messages.splice(index, 1);
      this.userSubject.next(this.user);
    }
  }

  public editMessage(data: {message: MessageModel, newMessage: string}): void {
    const index = this.user.messages.findIndex(dataMessage => {
      const message = dataMessage instanceof MessageModel
        ? dataMessage
        : null;
      if (message) {
        return message.message === data.message.message;
      }
    });
    if (index > -1) {
      const editedMessage = new MessageModel(data.message);
      editedMessage.message = data.newMessage;
      this.user.messages[index] = editedMessage;
      this.userSubject.next(this.user);
    }
  }

  public addInfoMessage(userName: string, event: string): void {
    this.user.messages.push(new InfoMessageModel(userName, event));

    this.userSubject.next(this.user);
  }
}
