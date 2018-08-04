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

const books = mongoose.model('books', booksSchema);


const speakersSchema = mongoose.Schema({
  title: {type: String, required: true},
  name: {type: String},
  shortname: {type: String},
  summary: {type: String},
  description: {type: String},
  artwork: { type : Array , "default" : [] },
});


speakersSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    title: this.title,
    shortname: this.shortname,
    summary: this.summary,
    description: this.description,
    artwork: this.artwork
  };
}

const speakers = mongoose.model('speakers', speakersSchema);

const socialsSchema = mongoose.Schema({
  shortname: {type: String, required: true},
  img: {type: String},
  url: {type: String}
});

socialsSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    shortname: this.shortname,
    img: this.img,
    url: this.url
  };
}

const socials = mongoose.model('socials', speakersSchema);

module.exports = {books, socials, speakers};