const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const reactViews = require('express-react-views');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'dist')));

app.engine('jsx', reactViews.createEngine());
app.set('views', path.join(__dirname, 'frontend/views'));
app.set('view engine', 'jsx');

const Articles = require('./models/articles.js');

app.get('/', async (req, res) => {
  try {
    const articles = await Articles.find();
    res.render('home', { title: 'Articles', articles });
  } catch (e) { console.error(e); }
});

const articles = require('./routes/articles.js');
const articleCategories = require('./routes/articleCategories.js');
const sitetree = require('./routes/sitetree.js');

app.use('/articles', articles);
app.use('/article-categories', articleCategories);
app.use('/sitetree', sitetree);

exports.app = app;

