const express = require('express');

const router = express.Router();
const Articles = require('../models/articles.js');

router.get('/', async (req, res) => {
  try {
    const response = await Articles.find();
    res.json(response);
  } catch (e) {
    console.error(e);
    res.json(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const article = await Articles.findById(req.params.id);
    res.json(article);
  } catch (e) {
    console.error(e);
    res.json(e);
  }
});

router.post('/add', async (req, res) => {
  const { title, author, body, category } = req.body;
  let article = new Articles({ title, author, body, category });

  try {
    await article.save();
    res.json({ message: 'Add successfully'});
  } catch (e) {
    console.error(e);
    res.json(e);
  }
});

router.post('/edit/:id', async (req, res) => {
  const { title, author, body } = req.body;

  const query = { _id: req.params.id };

  try {
    await Articles.updateOne(query, { title, author, body });
    res.json({ message: 'Updated successfully'});
  } catch (e) {
    console.error(e);
    res.json(e);
  }
});

router.post('/delete/:id', async (req, res) => {
  const query = { _id: req.params.id };

  try {
    await Articles.deleteOne(query);
    res.json({ message: 'Deleted successfully'});
  } catch (e) {
    console.error(e);
    res.json(e);
  }
});

module.exports = router;
