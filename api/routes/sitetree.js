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
  const {  ...rest } = req.body;
  console.log('req', req);

  const lastRecord = await SiteTree.find().sort( { index : -1 } ).limit(1);

  let item = new SiteTree({
    index: lastRecord[0]
    && lastRecord[0].index
    && !isNaN(lastRecord[0].index) ? +lastRecord[0].index + 1 : 1,
    ...rest
  });

  try {
    await item.save();
    res.json({ message: 'Add successfully'});
  } catch (e) { console.error(e); }
});

router.post('/edit/:id', async (req, res) => {
  const { index, type, name } = req.body;

  const query = { _id: req.params.id };

  try {
    await SiteTree.updateOne(query, { index, type, name });
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
