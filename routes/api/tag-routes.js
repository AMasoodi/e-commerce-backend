const router = require('express').Router();

const { Tag, Product, ProductTag } = require('../../models');


router.get('/', async (req, res) => {
  // find tags
  try {
    const tagData = await Tag.findAll({
      include: [{
        model: Product 
      }]
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tags found!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find tags by `id`
  try {
    const tagData = await Tag.findOne({
      where: {
        id: req.params.id,
      },
    include: [{
      model: Product
    }]});
    if (!tagData) {
      res.status(404).json({ message: 'No tag with that ID found!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post('/', async (req, res) => {
  // add new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag)
  } catch (err) {
    res.status(500).json(err);
  }
});
router.put('/:id', async (req, res) => {
  // update tag
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData[0]) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.delete('/:id', async (req, res) => {
  // delete tags
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;