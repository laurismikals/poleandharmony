const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const reactViews = require('express-react-views');
const fetch = require('node-fetch');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'dist')));

app.engine('jsx', reactViews.createEngine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');

const api = async (url) => {
  const response = await fetch(`http://api.${process.env.DOMAIN}/${url}`);
  return response.json();
};

app.get('/', async (req, res) => {
  try {
    const siteTree = await api('sitetree');
    const articles = await api('articles');
    res.render('Home', { title: 'Articles', siteTree, articles });
  } catch (e) { console.log(e); }
});

app.get('/articles/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const siteTree = await api('sitetree');
    const article = await api(`articles/${id}`);

    res.render('Article', { siteTree, article });
  } catch (e) { console.log(e); }
});

app.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const siteTree = await api('sitetree');
    const { type, name } = await api(`sitetree/${id}`);

    if (type === 'articles') {
      const content = await api(`sitetree/${type}/${id}`);
      res.render('Articles', { title: name, siteTree, articles: content });
    }
  } catch (e) { console.log(e); }
});

exports.app = app;

