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
  const { name } = req.body;
  console.log('name', name);
  let item = new ArticleCategories({ name });
  console.log('item', item);
  try {
    await item.save();
    res.json({ message: 'Add successfully'});
  } catch (e) { console.error(e); }
});

const edit = async ({ name, siteTreeId, id }) => {
  const query = { _id: id };
  const item = await ArticleCategories.findById(id);
  return await ArticleCategories.updateOne(
    query,
    {
      name: name || item.name,
      siteTreeId: siteTreeId || item.siteTreeId,
    },
  );
};

router.post('/edit/:id', async (req, res) => {
  const { name, siteTreeId } = req.body;

  try {
    await edit({ name, siteTreeId, id: req.params.id });
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

module.exports = {
  router,
  edit,
};
