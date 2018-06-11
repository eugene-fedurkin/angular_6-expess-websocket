export class MessageModel {
  public fromUserName: string;
  public userAvatar: string;
  public message: string;
  public date: string;
  public isEdited: boolean;

  constructor(message: MessageModel) {
    if (message) {
      this.fromUserName = message.fromUserName;
      this.userAvatar = message.userAvatar;
      this.message = message.message;
      this.date = message.date;
      this.isEdited = message.isEdited;
    }
  }
}
