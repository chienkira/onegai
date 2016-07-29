var Bookshelf = require('bookshelf');

var config = {
   host: '107.170.162.158',
   user: 'root',
   password: 'pass',
   database: 'databaseQA',
   charset: 'UTF8_GENERAL_CI'
};

var DB = Bookshelf.initialize({
   client: 'mysql',
   connection: config
});

module.exports.DB = DB;
