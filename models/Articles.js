var mongoose = require('mongoose');
var ArticleSchema = new mongoose.Schema({
  title: String,
  body: [String],
  images: [String],
  intro: String,
  date: {day:Number,month:Number,year:Number}
});

mongoose.model('Article', ArticleSchema);
