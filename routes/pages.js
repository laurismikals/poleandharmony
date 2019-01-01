const express = require('express');

const router = express.Router();
const Pages = require('../models/pages.js');

router.get('/', async (req, res) => {
  try {
    const response = await Pages.find();
    const pages = response.reduce((acc, { _id, type, name }) => {
      acc[_id] = { type, name };
      return acc;
    }, {});
    res.json(pages);
  } catch (e) { console.error(e); }
});

router.get('/:id', async (req, res) => {
  try {
    const response = await Pages.findById(req.params.id);
    res.json(response);
  } catch (e) { console.error(e); }
});

router.post('/add', async (req, res) => {
  const { type, name } = req.body;
  let item = new Pages({ type, name });

  try {
    await item.save();
    res.json({ message: 'Saved successfully'});
  } catch (e) { console.error(e); }
});

router.post('/edit/:id', async (req, res) => {
  const { type, name } = req.body;

  const query = { _id: req.params.id };

  try {
    await Pages.updateOne(query, { type, name });
    res.json({ message: 'Updated successfully'});
  } catch (e) { console.error(e); }
});

module.exports = router;
