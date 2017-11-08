import * as $ from 'jquery';

export class Message {
  message: string;
  from: string;
  date: string;
  isPrivate: boolean;

  constructor(message) {
    this.message = message.message;
    this.from = message.from;
    this.date = message.date;
    this.isPrivate = message.isPrivate;
  }

  generateLi(id: string) {
    const messageBox: JQuery = $(`
      <div class="message">
        <div class="title">
          <div class="from">${this.from}</div>
          <div class="date">${this.date}</div>
        </div>
        <div class="mainMessage">${this.message}</div>
      </div>
    `);

    if (id === this.from) messageBox.addClass('login own');
    else messageBox.addClass('logout');

    if (this.isPrivate) messageBox.addClass('private');

    return $("<li>").append(messageBox);
  }
}
