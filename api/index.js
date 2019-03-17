const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', `http://admin.${process.env.DOMAIN}`);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', false);
  next();
});

const articles = require('./routes/articles.js');
const articleCategories = require('./routes/articleCategories.js');
const html = require('./routes/html.js');
const sitetree = require('./routes/sitetree.js');

app.use('/articles', articles);
app.use('/article-categories', articleCategories);
app.use('/html', html);
app.use('/sitetree', sitetree);

exports.app = app;

