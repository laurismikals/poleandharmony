const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const reactViews = require('express-react-views');
const axios = require('axios');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'dist')));

app.engine('jsx', reactViews.createEngine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');

app.get('/', async (req, res) => {
  try {
    const { data } = await axios(`http://api.${process.env.DOMAIN}/articles`);
    res.render('home', { title: 'Articles', articles: data });
  } catch (e) { console.log(e); }
});

const articles = require('./routes/articles.js');

app.use('/articles', articles);

exports.app = app;

