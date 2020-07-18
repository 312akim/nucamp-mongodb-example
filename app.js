var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
//Calling returned function from require function
const FileStore = require('session-file-store')(session);

const passport = require('passport');
const authenticate = require('./authenticate');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const campsiteRouter = require('./routes/campsiteRouter');
const promotionRouter = require('./routes/promotionRouter');
const partnerRouter = require('./routes/partnerRouter');

// ** Establishes connection to MongoDB server
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/nucampsite';
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true, 
    useUnifiedTopology: true
}); //Returns promise

//Handles returned promise
connect.then(() => console.log('Connected correctly to server'), 
//Alternative to catch method, 2nd optional arg to .then method
  err => console.log(err) 
);
// ** End

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Cookie parser conflicts with express sessions
//app.use(cookieParser('12345-67890-12345-12345'));

app.use(session({
  name: 'session-id',
  secret: '12345-67890-12345-12345', //Signs with this string
  saveUninitialized: false, //Ensures new empty sessions are not saved
  resave: false, //Once session is created, updated & saved, it will continue to save on requests, even if no updates. Keeps session active/not deleted
  store: new FileStore() //Create new filestore as an object to save session info to hard drive
}));
//Only need for session based. Check incom requests for existing session
//If yes, loads it into req.user
app.use(passport.initialize());
app.use(passport.session());

// ** Users can access this without authorization as it's before auth call
app.use('/', indexRouter);
app.use('/users', usersRouter);
// ** End

//Custom authentication middleware
function auth(req, res, next) {
  console.log(req.user);

  if (!req.user) {
      const err = new Error('You are not authenticated!');                    
      err.status = 401;
      return next(err);
  } else {
      return next();
  }
}

app.use(auth);

//Users must authenticate before being able to access below
app.use(express.static(path.join(__dirname, 'public')));

app.use('/campsites', campsiteRouter);
app.use('/promotions', promotionRouter);
app.use('/partners', partnerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
