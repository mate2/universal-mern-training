var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// APIs
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/universalmern');

var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error : '));

// -->> SET UP SESSIONS <<--
app.use(session({
  secret: 'mySecretString',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 2 // in milliseconds
  },
  store: new MongoStore({
      mongooseConnection: db,
      ttl: 2 * 24 * 60 * 60
      // ttl: 2 * 86400
    })
}));

// SAVE TO SESSION CART API
app.post('/cart', (req, res) => {
  const cart = req.body;
  req.session.cart = cart;
  req.session.save((err) => {
    if(err) {
      throw err;
    }
    res.json(req.session.cart);
  });
});
// GET SESSION CART API
app.get('/cart', (req, res) => {
  if(typeof req.session.cart !== 'undefined') {
    res.json(req.session.cart);
  }
});
// -->> END SET UP SESSIONS <<--


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

// -->> DELETE BOOKS <<--
app.get('/images', (req, res) => {
  const imgFolder = __dirname + '/public/images/';
  // REQUIRE FILE SYSTEM
  const fs = require('fs');
  // READ ALL FILES IN DIRECTORY
  fs.readdir( imgFolder, (err, files) => {
    if(err) {
      return console.error(err);
    }
    // Create an empty array
    const filesArr = [];
    //  ITERATE ALL IMAGES IN THE DIRECTORY AND ADD TO THE ARRAY
    files.forEach((file) => {
      if(file !== '.gitignore') {
        filesArr.push({name: file});
      }
    });
    // SEND THE JSON RESPONSE WITH THE ARRAY
    res.json(filesArr);
  });
});

// END APIs

app.listen(3001, function(err){
  if(err){
    return console.log(err);
  }
  console.log('API server is listening on http://localhost:3001');
});
