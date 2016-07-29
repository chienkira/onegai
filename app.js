// Vendor libraries
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
var ejs = require('ejs');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// Custom libraries
var route = require('./route');// routes
var Model = require('./model');// model

// Express app init
var app = express();

// Configuration for Passport
passport.use(new LocalStrategy(function(username, password, done) {
   new Model.User({username: username}).fetch().then(function(data) {
      var user = data;
      if(user === null) {
         return done(null, false, {message: 'Invalid username or password'});
      } else {
         user = data.toJSON();
         if(!bcrypt.compareSync(password, user.passwd)) {
            return done(null, false, {message: 'Invalid username or password'});
         } else {
            return done(null, user);
         }
      }
   });
}));
passport.serializeUser(function(user, done) {
  done(null, user.username);
});
passport.deserializeUser(function(username, done) {
   new Model.User({username: username}).fetch().then(function(user) {
      done(null, user);
   });
});

// Configuration for Express app
app.set('port', process.env.PORT || 80);
app.set('views', path.join(__dirname, 'client'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/client'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: '3jf4512k4j3hg2121lhgOnegai658qw71asf3as214515jh2g14k3j2gQA',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//******************************************************************//
// GET
app.get('/', route.index);

// sign in
// GET
app.get('/signin', route.signIn);
// POST
app.post('/signin', route.signInPost);

// sign up
// GET
app.get('/signup', route.signUp);
// POST
app.post('/signup', route.signUpPost);

// logout
// GET
app.get('/signout', route.signOut);

// 404 not found
app.use(route.notFound404);
//******************************************************************//

// Express app startup
var server = app.listen(app.get('port'), function(err) {
   if(err) throw err;
   var message = 'Server is running @ http://localhost:' + server.address().port;
   console.log(message);
});

