const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

const Articles = mongoose.model('Article', articleSchema);

module.exports = Articles;
