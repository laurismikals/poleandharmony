const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const articles = require('./routes/articles.js');
const articleCategories = require('./routes/articleCategories.js');
const sitetree = require('./routes/sitetree.js');

app.use('/articles', articles);
app.use('/article-categories', articleCategories);
app.use('/sitetree', sitetree);

exports.app = app;

