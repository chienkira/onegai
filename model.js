var DB = require('./db').DB;

var User = DB.Model.extend({
   tableName: 'users',
   idAttribute: 'id',
});

module.exports = {
   User: User
};