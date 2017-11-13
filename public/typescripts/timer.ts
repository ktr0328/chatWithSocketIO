import * as $ from 'jquery';

export class Timer {
  private ms: number;
  private untilSec: number;

  private self: any; // timer
  private until: number; // flag num
  private inputUsers: string[];

  /**
   * now Typingタイマー
   * TODO: もうちょっとなんとかしたい
   * @param {number} ms
   * @param {number} untilSec
   */
  constructor(ms: number, untilSec: number) {
    this.ms = ms;
    this.untilSec = untilSec;
    this.until = untilSec;
    this.self = null;
    this.inputUsers = [];
  };

  start = (username: string): void => {
    if (this.self === null) {
      this.inputUsers.push(username);
      this.until = this.untilSec;

      this.writeTypingListToStatusBar();
      this.self = setInterval(() => {
        this.until--;

        if (this.until <= 0) {
          this.stop();
        } else {
          this.writeTypingListToStatusBar();
        }
      }, this.ms);
    } else {
      if (this.inputUsers.indexOf(username) < 0) this.inputUsers.push(username);
      this.reset();
    }
  };

  stop = (): void => {
    clearInterval(this.self);
    this.self = null;
    this.inputUsers = [];
    $('#statusBar').text("");
  };

  private reset = (): void => {
    this.until = this.untilSec;
  };

  writeTypingListToStatusBar() {
    const users: string = this.inputUsers.join(', ');
    $('#statusBar').text(`${users} is typing..`);
  }
}

