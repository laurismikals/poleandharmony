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
    res.render('home', { title: 'Articles', siteTree, articles });
  } catch (e) { console.log(e); }
});

app.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const siteTree = await api('sitetree');
    const { type, name } = await api(`sitetree/${id}`);

    if (type === 'articles') {
      const articles = await api('articles');
      res.render('home', { title: name, siteTree, articles });
    }
  } catch (e) { console.log(e); }
});

exports.app = app;

