import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MessageModel } from '../../models/message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
  @Input() messageData: MessageModel;
  @Input() userName: string;
}
