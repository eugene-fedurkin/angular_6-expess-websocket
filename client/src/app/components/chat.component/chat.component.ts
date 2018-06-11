import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChildren, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ScrollToConfigOptions, ScrollToService } from '@nicky-lenaers/ngx-scroll-to';
import { Subscription } from 'rxjs';

import { MessageModel } from '../../models/message.model';
import { UserModel } from '../../models/user.model';
import { SocketService } from '../../services/socket.service';
import { StoreService } from '../../services/store.service';
import { hideMessage } from '../animations/hide-message.animation';
import { DialogComponent } from '../dialog.component/dialog.component';
import { MessageComponent } from '../message.component/message.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  animations: [hideMessage()],
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit {

  public message: string = '';
  public user: UserModel;
  public subscr: Subscription;
  public subscrMesaagesChange: Subscription;
  public subscrUserJoin: Subscription;
  public subscrDeleteMessage: Subscription;
  public subscrEditMessage: Subscription;
  public subscrExitMessage: Subscription;

  @ViewChildren('field') public messages: QueryList<MessageComponent>;
  @HostListener('window:beforeunload')
  public doSomething() {
    this.showNotifyExit();
    return null;
  }

  constructor(
    private readonly socket: SocketService,
    private readonly store: StoreService,
    private readonly router: Router,
    private readonly scrollToService: ScrollToService,
    private readonly dialog: MatDialog,
  ) {}

  public sendMessage(): void {
    if (!this.message) {
      return;
    }

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

  public editMessage(message: MessageModel): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        action: 'editMessage',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.socket.emitEditMessage(message, result);
      }
    });
  }

  public deleteMessage(message: MessageModel): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        question: 'Are you sure that you want to remove the message to all?',
        action: 'removeMessage',
      }
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.socket.emitDeleteMessage(message);
      }
    });
  }

  private scrollBottom(): void {
    const config: ScrollToConfigOptions = {
      target: 'last'
    };

    this.scrollToService.scrollTo(config);
  }

  private showNotifyExit(): void {
    this.socket.emitExitUser(this.user.name);
  }

  private subscriptions(): void {
    this.subscr = this.socket.onMessage()
      .subscribe(messageData => {
        console.log(messageData);
        this.store.addMessage(messageData);
    });

    this.subscrUserJoin = this.socket.onEvent<string>('join')
      .subscribe(name => this.store.addInfoMessage(name, 'join'));

    this.subscrDeleteMessage = this.socket.onEvent<MessageModel>('delete')
      .subscribe(message => this.store.deleteMessage(message));

    this.subscrEditMessage = this.socket.onEvent<{message: MessageModel, newMessage: string}>('edit')
      .subscribe(response => this.store.editMessage(response));

    this.subscrExitMessage = this.socket.onEvent<string>('exitUser')
      .subscribe(userName => this.store.addInfoMessage(userName, 'exitUser'));
  }

  public ngOnInit(): void {
    this.store.state$
    .subscribe(user => {
      if (user) {
        this.user = user;
      } else {
        this.router.navigate(['']);
      }
    });
    this.subscriptions();
  }

  public ngAfterViewInit(): void {
    this.subscrMesaagesChange = this.messages.changes
    .subscribe(() => this.scrollBottom());
  }

  public ngOnDestroy(): void {
      this.subscr.unsubscribe();
      this.subscrDeleteMessage.unsubscribe();
      this.subscrEditMessage.unsubscribe();
      this.subscrExitMessage.unsubscribe();

      this.subscrMesaagesChange.unsubscribe();

      this.subscrUserJoin.unsubscribe();

  }
}
