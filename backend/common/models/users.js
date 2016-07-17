module.exports = function(Users) {

  Users.validatesUniquenessOf('email', {message: 'Email already exists'});

  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  Users.validatesFormatOf('email', {with: re, message: 'Must provide a valid email'});
  
};
