var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

const { Books } = require('../model/models');


router.use(morgan('common'));
router.use(bodyParser.json());
mongoose.Promise = global.Promise;

router.get(['/', '/books'], (req, res) => {
  
  Books.find()
    .then(books => {
        res.send(books);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error occurred retrieving Books."
        });
    });
    
});

router.get('/books/:id', (req, res) => {

  const { id } = req.params
  
  Books.findById(id)
    .then(book => {
        if(!book) {
            return res.status(404).send({
                message: "Book not found"
            });            
        }
        res.send(book);
    }).catch(err => {
        return res.status(500).send({
            message: "Error retrieving book with id " + id
        });
    });
    
});

router.post('/books', (req, res) => {

  if(!req.body.content) {
    return res.status(400).send({
        message: "Book can not be empty"
    });
  }

  const { title, content, author } = req.body

  const book = new Books({
      title: title, 
      content: content,
      author: author
  });

  book.save()
  .then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Error occurred."
      });
  });
});

router.put('/books/:id', (req, res) => {

  if(!req.body.content) {
    return res.status(400).send({
        message: "Book can not be empty"
    });
  }

  const { title, content, author } = req.body

  const { id } = req.params
  
  Books.findByIdAndUpdate(id, {
      title: title,
      content: content,
      author: author
  }, {new: true})
  .then(book => {
      res.send(book);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Book not found with id " + id
          });                
      }
      return res.status(500).send({
          message: "Error updating book with id " + id
      });
  });
});

router.delete('/books/:id', (req, res) => {

  const { id } = req.params
  Books.findByIdAndRemove(id)
  .then(book => {
      if(!book) {
          return res.status(404).send({
              message: "Book not found with id " + id
          });
      }
      res.send({message: "Book deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Book not found."
          });                
      }
      return res.status(500).send({
          message: "Error deleting book."
      });
  });
});

module.exports = router;