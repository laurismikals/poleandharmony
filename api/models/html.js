const mongoose = require('mongoose');

const htmlSchema = mongoose.Schema({
  siteTreeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

const HTML = mongoose.model('HTML', htmlSchema);

module.exports = HTML;
