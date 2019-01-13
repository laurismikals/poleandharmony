const mongoose = require('mongoose');

const siteTreeSchema = mongoose.Schema({
  index: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['articles', 'text', 'contacts', 'calendar'],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const SiteTree = mongoose.model('SiteTree', siteTreeSchema, 'sitetree');

module.exports = SiteTree;
