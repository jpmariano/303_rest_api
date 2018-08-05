const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const booksSchema = new Schema({
  title: {
    type: String, 
    required: true
  },
  author: {
    type: String
  },
  content: {
    type: String
  }
});

const Books = mongoose.model('Books', booksSchema, 'book');

module.exports = {
  Books
};