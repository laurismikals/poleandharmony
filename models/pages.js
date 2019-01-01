const mongoose = require('mongoose');

const pagesSchema = mongoose.Schema({
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

const Pages = mongoose.model('Pages', pagesSchema, 'pages');

module.exports = Pages;
