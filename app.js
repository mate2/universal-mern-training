var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// APIs
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/universalmern');

const Books = require('./models/books');

// -->> GET BOOKS <<--
app.get('/books', (req, res) => {
  Books.find((err, books) => {
    if(err) {
      throw err;
    }
    res.json(books);
  });
});

// -->> POST BOOKS <<--
app.post('/books', (req, res) => {
  const book = req.body;

  Books.create(book, (err, books) => {
    if(err) {
      throw err;
    }
    res.json(books);
  });
});

// -->> PUT BOOKS <<--
app.put('/books/:_id', (req, res) => {
  console.log('im here');
  const book = req.body;
  const query = {_id: req.params._id};

  // IF teh field does not exist $set will set a new field
  const update = {
    title: book.title,
    description: book.description,
    image: book.image,
    price: book.price
  };

  // When set to true, returns the updated document
  const options = {new: true};

  Books.findOneAndUpdate(query, update, options, (err, books) => {
    if(err) {
      throw err;
    }
    res.json(books);
  });
});

// -->> DELETE BOOKS <<--
app.delete('/books/:_id', (req, res) => {
  const query = {_id: req.params._id};

  Books.remove(query, (err, books) => {
    if(err) {
      throw err;
    }
    res.json(books);
  });
});

// END APIs

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

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
