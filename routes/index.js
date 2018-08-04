var express = require('express');
var router = express.Router();
var appdata = require('../data.json');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

var models = require('../model/models');
var speaker = models.speakers;
var book = models.books;
var social = models.socials;


router.use(morgan('common'));
router.use(bodyParser.json());
mongoose.Promise = global.Promise;


router.get('/books', (req, res) => {
  book
    .find()
    .then(books => {
      //res.json(books.map(book => book.apiRepr()));
      var allBooks = res.json(books.map(book => book.apiRepr())); 
      if(books === undefined || books.length == 0){
        res.json({test: "testing"});
      } else {
        res.json(books.map(book => book.apiRepr()));
      }
      //console.log(res);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    }); 
});

router.get('/allspeakers', (req, res) => {
  speaker
    .find()
    .then(speakers => {
      res.json(speakers.map(speaker => speaker.apiRepr()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    }); 
});

/* GET home page. */
router.get('/', function(req, res) {
  var myArtwork = [];
  this.myArtists = [];


  speaker
    .find()
    .then(speakers => {
       set_myArtists(speakers.map(speaker => speaker.apiRepr()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    }); 
    

  function set_myArtists(artist){
    this.myArtists = artist;
    //console.log(artist);
  }  
  
//myArtists = appdata.speakers;

  myArtists.forEach(function(item) {
    myArtwork = myArtwork.concat(item.artwork);
  });
 
  res.render('index', {
    title: 'Home',
    artwork: myArtwork,
    artists: myArtists,
    page: 'home'
  });
});

/* GET speakers page. */
router.get('/speakers', function(req, res) {
  var myArtwork = [];
  var myArtists = [];
  myArtists = appdata.speakers;

  appdata.speakers.forEach(function(item) {
    myArtwork = myArtwork.concat(item.artwork);
  });
  res.render('speakers', {
    title: 'Speakers',
    artwork: myArtwork,
    artists: myArtists,
    page: 'artistList'
  });
});


/* GET speakers detail page */
router.get('/speakers/:speakerid', function(req, res) {
  var myArtwork = [];
  var myArtists = [];

  appdata.speakers.forEach(function(item) {
    if (item.shortname == req.params.speakerid) {
      myArtists.push(item);
      myArtwork = myArtwork.concat(item.artwork);
    }
  });
  res.render('speakers', {
    title: 'Speakers',
    artwork: myArtwork,
    artists: myArtists,
    page: 'artistDetail'
  });
});




module.exports = router;