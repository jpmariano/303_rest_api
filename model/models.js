const mongoose = require('mongoose');

const booksSchema = mongoose.Schema({
  title: {type: String, required: true},
  author: {type: String},
  content: {type: String}
});


booksSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    title: this.title,
    author: this.author,
    content: this.content
  };
}

const books = mongoose.model('book', booksSchema);

module.exports = {books};