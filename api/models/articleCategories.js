const mongoose = require('mongoose');

const articleCategoriesSchema = mongoose.Schema({
  siteTreeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    unique : false,
  },
  name: {
    type: String,
    required: true,
    unique : true,
  },
});

const ArticleCategories = mongoose.model('ArticleCategories', articleCategoriesSchema);

module.exports = ArticleCategories;
