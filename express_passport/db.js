var Bookshelf = require('bookshelf');

var config = {
   host: 'kira-dev.jp', 
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