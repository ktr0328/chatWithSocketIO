const express = require('express');
const router = express.Router();
const db = require('../modules/db/dbModule');

router.post('/', function (req, res, next) {
  const userName = req.body.userName;
  const userPassword = req.body.userPassword;

  if (!userName || !userPassword) {
    res.render('index', {title: 'SocketChat', err: 'fill text boxes'});
    return;
  }

  db.find({username: userName}).then(result => {
    if (req.body.login) {
      if (result.length === 0) return Promise.resolve("MissMatch");

      if (result[0].userpassword === userPassword) {
        return Promise.resolve();
      } else {
        return Promise.reject('MissMatch');
      }
    } else if (req.body.create) {
      if (result.length === 0) {
        db.insert({username: userName, userpassword: userPassword});
        return Promise.resolve();
      } else {
        return Promise.reject('Duplicated');
      }
    }
  }).then(() => {
    req.session.user = {name: userName};
    res.render('chat', {title: 'Chat w/ socket.io', username: userName});
  }).catch((err) => {
    res.render('index', {title: 'SocketChat', err: err});
  });
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'SocketChat'});
});

module.exports = router;
