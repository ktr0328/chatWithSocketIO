const db = require('./db/dbModule');
const moment = require('moment');

const userList = {};

exports.init = function (io) {

  io.on('connection', async (socket) => {
    const dbData = await db.findAll();
    dbData.forEach(e => {
      if (!userList[e.username])
        userList[e.username] = "";
    });

    const username = socket.handshake.headers['username'];
    userList[username] = [socket.id];
    io.emit('userList', userList);
    socket.broadcast.emit('notice', `${username} connected`);
    socketInit(socket);

    socket.on('message to server', (container) => {
      // 連投チェック TODO: socketプロパティではなくserverで保存するべき
      const MULTIPLE_LIMIT = 5;
      let isNotMultiple = (() => {
        if (socket.lastMessage === container.message) {
          socket.count++;
          return socket.count <= MULTIPLE_LIMIT;
        } else {
          socket.lastMessage = container.message;
          socket.count = 1;

          return true;
        }
      })();

      if (isNotMultiple) {
        const msg = {
          "message": container.message,
          "date": moment().format("HH:mm:ss"),
          "from": username,
          "isPrivate": false
        };

        const sendTo = container.to !== null ? container.to.replace("to", "") : "All";
        if (sendTo === "All") {
          io.emit('message to client', msg);
        } else {
          msg.isPrivate = true;
          socket.emit('message to client', msg);
          socket.to(userList[sendTo]).emit('message to client', msg);
        }
      } else {
        socket.emit('notice', "Multiple Post")
      }
    });

    socket.on('typing to server', sendTo => {
      if (sendTo === "All") socket.broadcast.emit('typing', username);
      else socket.to(userList[sendTo]).emit('typing', username);
    });

    socket.on('disconnect', () => {
      socket.broadcast.emit('notice', `${username} disconnected`);
      userList[username] = "";
      io.emit('userList', userList);
    });
  });
};

function socketInit(socket) {
  socket.lastMessage = "";
  socket.count = 0;
}
