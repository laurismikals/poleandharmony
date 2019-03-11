const mongoose = require('mongoose');

const articleCategoriesSchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique : true,
  },
});

const ArticleCategories = mongoose.model('ArticleCategories', articleCategoriesSchema);

module.exports = ArticleCategories;
