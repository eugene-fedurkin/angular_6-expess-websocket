import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { InfoMessageModel } from '../../models/info-message..model';
import { MessageModel } from '../../models/message.model';
import { showMessage } from '../animations/show-message.animation';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [showMessage()]
})
export class MessageComponent {

  @Input() public set messageData(messageData: InfoMessageModel | MessageModel) {
    this.infoMessage = messageData instanceof InfoMessageModel
      ? messageData
      : null;
    this.message = messageData instanceof MessageModel
      ? messageData
      : null;
  }

  @Input() public userName: string;
  @Output() public delete = new EventEmitter();
  @Output() public edit = new EventEmitter();

  public infoMessage: InfoMessageModel;
  public message: MessageModel;

  public onEdit(): void {
    const message = this.infoMessage
      ? this.infoMessage
      : this.message;
    this.edit.emit(message);
  }

  public onDelete(): void {
    const message = this.infoMessage
      ? this.infoMessage
      : this.message;
    this.delete.emit(message);
  }
}
