import { MessageModel } from './message.model';
import { InfoMessageModel } from './info-message..model';

export class UserModel {
  constructor(
    public name: string,
    public avatar: string = '',
    public messages: (MessageModel | InfoMessageModel)[] = [],
  ) {}
}
