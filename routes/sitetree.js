const express = require('express');

const router = express.Router();
const SiteTree = require('../models/sitetree.js');

router.get('/', async (req, res) => {
  try {
    const response = await SiteTree.find();
    res.json(response);
  } catch (e) { console.error(e); }
});

router.get('/:id', async (req, res) => {
  try {
    const response = await SiteTree.findById(req.params.id);
    res.json(response);
  } catch (e) { console.error(e); }
});

router.post('/add', async (req, res) => {
  const { pageId } = req.body;

  const lastRecord = await SiteTree.find().sort( { index : -1 } ).limit(1);

  let item = new SiteTree({
    pageId,
    index: lastRecord[0]
    && lastRecord[0].index
    && !isNaN(lastRecord[0].index) ? +lastRecord[0].index + 1 : 1,
  });

  try {
    await item.save();
    res.json({ message: 'Saved successfully'});
  } catch (e) { console.error(e); }
});

router.post('/edit/:id', async (req, res) => {
  const { pageId, index } = req.body;

  const query = { _id: req.params.id };

  try {
    await SiteTree.updateOne(query, { pageId, index });
    res.json({ message: 'Updated successfully'});
  } catch (e) { console.error(e); }
});

router.post('/delete/:id', async (req, res) => {
  const query = { _id: req.params.id };

  try {
    await SiteTree.deleteOne(query);
    res.json({ message: 'Deleted successfully'});
  } catch (e) { console.error(e); }
});

module.exports = router;
