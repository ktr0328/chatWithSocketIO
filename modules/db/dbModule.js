const nedb = require('nedb');
const database = new nedb({filename: "./modules/db/userlist.db", autoload: true});

module.exports = {
  insert: (object) => {
    database.insert(object, (err) => {
      console.log(err);
    });
  },
  find: (key) => {
    return new Promise((resolve, reject) => {
      database.find(key, (err, doc) => {
        resolve(doc);
      });
    });
  },
  findAll: () => {
    return new Promise((resolve, reject) => {
      database.find({}, (err, doc) => {
        resolve(doc);
      });
    });
  }
};
