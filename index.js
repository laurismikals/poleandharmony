const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const reactViews = require('express-react-views');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/poleandharmony', { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => console.log('Connected to MongoDB...'));
db.on('error', (err) => console.error(err));

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

app.get('/admin/*', async (req, res) => {
  res.sendfile(__dirname + '/dist/admin/index.html');
});


const articles = require('./routes/articles.js');
const articleCategories = require('./routes/articleCategories.js');
const sitetree = require('./routes/sitetree.js');

app.use('/articles', articles);
app.use('/article-categories', articleCategories);
app.use('/sitetree', sitetree);

app.listen(3000, () => console.log('Server is running on port 3000...'));
