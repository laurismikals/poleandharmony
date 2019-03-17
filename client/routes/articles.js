const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

router.get('/add', (req, res) => {
  res.render('articles_add', { title: 'Add article' });
});

router.get('/edit/:id', async (req, res) => {
  try {
    const { data } = await fetch(`http://api.${process.env.DOMAIN}/articles/${req.params.id}`);
    res.render('articles_edit', { title: 'Edit article', article: data });
  } catch (e) { console.log(e); }
});

router.get('/:id', async (req, res) => {
  try {
    const { data } = await fetch(`http://api.${process.env.DOMAIN}/articles/${req.params.id}`);
    res.render('article', { title: 'Edit article', article: data });
  } catch (e) { console.log(e); }
});

module.exports = router;
