const express = require('express');

const router = express.Router();
const HTML = require('../models/html.js');

router.get('/', async (req, res) => {
  try {
    const response = await HTML.find();
    res.json(response);
  } catch (e) {
    console.error('/html', e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await HTML.findById(req.params.id);
    res.json(item);
  } catch (e) {
    console.error('/html/:id', e);
  }
});

router.post('/add', async (req, res) => {
  const { title, body, siteTreeId } = req.body;
  const item = new HTML({ title, body, siteTreeId });

  try {
    await item.save();
    res.json({ message: 'Add successfully'});
  } catch (e) {
    console.error('/html/add', e);
  }
});

router.post('/edit/:id', async (req, res) => {
  const { title, author, body } = req.body;

  const query = { _id: req.params.id };

  try {
    await HTML.updateOne(query, { title, author, body });
    res.json({ message: 'Updated successfully'});
  } catch (e) {
    console.error('/html/edit/:id', e);
  }
});

router.post('/delete/:id', async (req, res) => {
  const query = { _id: req.params.id };

  try {
    await HTML.deleteOne(query);
    res.json({ message: 'Deleted successfully'});
  } catch (e) {
    console.error('/html/delete/:id', e);
  }
});

module.exports = router;
