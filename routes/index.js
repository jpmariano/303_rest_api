var express = require('express');
var router = express.Router();
var appdata = require('../data.json');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

var models = require('../model/models');
var book = models.books;
//console.log(book);


router.use(morgan('common'));
router.use(bodyParser.json());
mongoose.Promise = global.Promise;

//Get All
router.get('/books', (req, res) => {
  
    book
    .find()
    .then(books => {
      if(books.length < 1 || books == undefined ){
        books = appdata.books;
        res.json(books);
      } else {
        res.json(books.map(book => book.apiRepr()));
      }
      
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
  
});


/* GET speakers detail page */
router.get('/books/:bookid', function(req, res) {
  
  res.render('book', {
    title: appdata.books[req.params.bookid].title,
    author: appdata.books[req.params.bookid].author,
    content: appdata.books[req.params.bookid].content
  });
  
});



/* GET home page. */
router.get('/', function(req, res) {

  book
  .find()
  .then(books => {
    //console.log(mongoose.models.book);
    //res.json(books.map(book => book.apiRepr()));
    
    if(books.length < 1 || books == undefined ){
      books = appdata.books;
      res.json(books);
      
    } else {
      res.json(books.map(book => book.apiRepr()));
    } 
    
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({error: 'something went terribly wrong'});
  });
});



module.exports = router;