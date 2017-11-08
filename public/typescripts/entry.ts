import * as $ from 'jquery';
import {Message} from './message';
import {Timer} from './timer';
import * as moment from 'moment'
import {reloadPrivateMessagingList} from './privateMessage'

const typingTimer = new Timer(1000, 3);
const username = $('#username').text();
const socket = io({
  transportOptions: {
    polling: {
      extraHeaders: {
        'username': username
      }
    }
  }
});

// 送信
$('#sendMessage').click(() => {
  const input = $('#inputMessage');
  if (input.val() != "") {
    socket.emit('message to server', {message: input.val(), to: $('#messageTo').val()});
    input.val('');
  }
});

$('#inputMessage').keydown(e => {
  if (e.which == 13) {
    event.preventDefault();
    $('#sendMessage').click();
  }
// now typing..
}).keypress(e => {
  socket.emit('typing to server', '');
});

// メッセージの受信
socket.on('message to client', message => {
  const msg: Message = new Message(message);
  $('#messageList').append(msg.generateLi(username)).find(':last').hide().fadeIn();
  $('#rightPane').animate({scrollTop: $('#rightPane')[0].scrollHeight}, 'fast');
  typingTimer.stop();
});

// userリストの通知 / 変更通知
socket.on('userList', (users) => {
  reloadPrivateMessagingList(users, username);

  const ul = $('#userList');
  ul.empty();

  Object.keys(users).forEach(user => {
    if (user !== username) {
      const li = $(`
      <li>
        <img src="/images/default.png" class="userImage">
        <div class="userName">${user}</div>
      </li>`);

      if (users[user] !== "") li.addClass('login');
      else li.addClass('logout');

      li.click((e) => {
        $('#messageTo').val($(e.target).find('div').text());
      });
      ul.append(li);
    }
  });
});

// now typing..
socket.on('typing', (id: string) => {
  typingTimer.start(id);
});

// 通知
socket.on('notice', (notice: string) => {
  $('#logs')
    .append(`
      <li><div style="float: left; width: 45%;">${notice}</div>
          <div style="float: right; width: 45%">${moment().format("MM/DD HH:mm")}</div>
      </li>`)
    .find(':last').hide().fadeIn();
  $('#logsBox').animate({scrollTop: $('#logsBox')[0].scrollHeight}, 'fast');
});
