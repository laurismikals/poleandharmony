const mongoose = require('mongoose');

const siteTreeSchema = mongoose.Schema({
  pageId: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const SiteTree = mongoose.model('SiteTree', siteTreeSchema, 'sitetree');

module.exports = SiteTree;
