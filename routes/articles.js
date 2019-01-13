const express = require('express');

const router = express.Router();
const Articles = require('../models/articles.js');

router.get('/add', (req, res) => {
  res.render('articles_add', { title: 'Add article' });
});

router.post('/add', async (req, res) => {
  const { title, author, body, category } = req.body;
  let article = new Articles({ title, author, body, category });

  try {
    await article.save();
    res.redirect('/');
  } catch (e) { console.error(e); }
});

router.get('/edit/:id', async (req, res) => {
  try {
    const article = await Articles.findById(req.params.id);
    res.render('articles_edit', { title: 'Edit article', article });
  } catch (e) { console.error(e); }
});

router.post('/edit/:id', async (req, res) => {
  const { title, author, body } = req.body;

  const query = { _id: req.params.id };

  try {
    await Articles.updateOne(query, { title, author, body });
    res.redirect('/');
  } catch (e) { console.error(e); }
});

router.get('/:id', async (req, res) => {
  try {
    const article = await Articles.findById(req.params.id);
    res.render('article', { article });
  } catch (e) { console.error(e); }
});

module.exports = router;
