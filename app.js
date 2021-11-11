var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const connectionString = process.env.MONGO_CON 
mongoose = require('mongoose'); 
mongoose.connect(connectionString,{useNewUrlParser: true, useUnifiedTopology: true}); 

//Get the default connection 
var db = mongoose.connection; 
 
//Bind connection to error event  
db.on('error', console.error.bind(console, 'MongoDB connection error:')); 
db.once("open", function(){ 
 console.log("Connection to DB succeeded")
 recreateDB();
}); 

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var earphoneRouter = require('./routes/earphone');
var addmodsRouter = require('./routes/addmods');
var selectorRouter = require('./routes/selector');
const Costume = require("./models/costume");
const resoureRouter = require('./routes/resource');
var costumeRouter = require('./routes/costume');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/earphone', earphoneRouter);
app.use('/addmods', addmodsRouter);
app.use('/selector', selectorRouter);
app.use('/resource', resoureRouter);
app.use('/costumes', costumeRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

async function recreateDB(){ 
  // Delete everything 
  await Costume.deleteMany(); 
 
  let instance1 = new Costume({costume_type:"ghost",  size:'large', cost:25.4}); 
  let instance2 = new Costume({costume_type:"Bahubali",  size:'Medium', cost:36.4}); 
  let instance3 = new Costume({costume_type:"BlackWidow",  size:'small', cost:42.6}); 

  instance1.save( function(err,doc) { 
      if(err) return console.error(err); 
      console.log("First object saved") 
  });
  instance2.save( function(err,doc) { 
    if(err) return console.error(err); 
    console.log("second object saved") 
  });
  instance3.save( function(err,doc) { 
    if(err) return console.error(err); 
    console.log("third object saved") 
  });
  // let reseed = true; 
  // if (reseed) { recreateDB();}  
} 
module.exports = app;
