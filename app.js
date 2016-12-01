var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
//add reference to the new stories controller
var stories = require('./routes/stories');

var app = express();

// using mongoose to connect  mongodb
var mongoose= require('mongoose');
var config = require('./config/globalVars');
mongoose.connect(config.db);

//references to packages that were installed
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var localStrategy = require ('passport-local').Strategy

//initialize the passport for auth
app.use(flash());
app.use(session({
    secret: config.secret,
    resave: true,
    saveUninitialized: false
}));

//initialize the passport
app.use(passport.initialize());
app.use(passport.session());

//link to account model
var Account = require('./models/account');
passport.use(Account.createStrategy());

//read and write b/w passport and mongodb
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
//let know application to use stories controller for urls
app.use('/stories',stories);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
