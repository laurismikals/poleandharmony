const express = require('express');

const router = express.Router();
const ArticleCategories = require('../models/articleCategories.js');

router.get('/', async (req, res) => {
  try {
    const response = await ArticleCategories.find();
    res.json(response);
  } catch (e) { console.error(e); }
});

router.post('/add', async (req, res) => {
  const { category } = req.body;
  let item = new ArticleCategories({ category });

  try {
    await item.save();
    res.json({ message: 'Add successfully'});
  } catch (e) { console.error(e); }
});

router.post('/edit/:id', async (req, res) => {
  const { category } = req.body;

  const query = { _id: req.params.id };

  try {
    await ArticleCategories.updateOne(query, { category });
    res.json({ message: 'Updated successfully'});
  } catch (e) { console.error(e); }
});

router.post('/delete/:id', async (req, res) => {
  const query = { _id: req.params.id };

  try {
    await ArticleCategories.deleteOne(query);
    res.json({ message: 'Deleted successfully'});
  } catch (e) { console.error(e); }
});

module.exports = router;
