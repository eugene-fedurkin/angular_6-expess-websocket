import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { MessageModel } from '../../models/message.model';
import { UserModel } from '../../models/user.model';
import { SocketService } from '../../services/socket.service';
import { StoreService } from '../../services/store.service';
import { MessageComponent } from '../message.component/message.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit {

  public message: string = '';
  public user: UserModel;
  public subscription: Subscription;
  public subscriptionMesaagesChange: Subscription;

  @ViewChild('field') field: ElementRef;
  @ViewChildren('field') messages: QueryList<MessageComponent>;

  constructor(
    private readonly socket: SocketService,
    private readonly store: StoreService,
    private readonly router: Router,
  ) {}

  public sendMessage(): void {
    const date = new Date();
    const message: MessageModel = {
      fromUserName: this.user.name,
      userAvatar: this.user.avatar,
      message: this.message,
      date: `${date.getHours()}:${date.getMinutes()}`,
      isEdited: false,
    };
    this.socket.send(message);

    this.message = '';
  }

  private scrollBottom(): void {
    this.field.nativeElement.scrollTop = this.field.nativeElement.scrollHeight;
  }

  public ngOnInit(): void {
    this.socket.initSocket();

    this.subscription = this.socket.onMessage()
      .subscribe(messageData => {
        console.log(messageData);
        this.user.messages.push(messageData);
      });

    this.store.state$
      .subscribe(user => {
        if (user) {
          this.user = user;
        } else {
          this.router.navigate(['']);
        }
      });
  }

  public ngAfterViewInit(): void {
    this.subscriptionMesaagesChange = this.messages.changes
    .subscribe(() => this.scrollBottom());
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscriptionMesaagesChange.unsubscribe();
  }
}
