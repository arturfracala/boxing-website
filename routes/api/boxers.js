const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Boxer = require('../../models/Boxer');

// @route GET api/boxers
// @desc  Get all boxers
// @access Public
router.get('/', async (req, res) => {
  try {
    const boxers = await Boxer.find();
    res.json(boxers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/boxers/:id
// @desc  Get boxer by id
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const boxer = await Boxer.findById(req.params.id);

    if (!boxer) {
      return res.status(404).json({ msg: 'Boxer not found' });
    }

    res.json(boxer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/boxers
// @desc  Create or update boxer
// @access Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const {
      boxerId,
      name,
      alias,
      country,
      ranking,
      height,
      reach,
      weight,
      association,
      division,
      date_birth
    } = req.body;

    // Build boxer object
    const boxerFields = {};
    if (name) boxerFields.name = name;
    if (alias) boxerFields.alias = alias;
    if (country) boxerFields.country = country;
    if (ranking) boxerFields.ranking = ranking;
    if (height) boxerFields.height = height;
    if (reach) boxerFields.reach = reach;
    if (weight) boxerFields.weight = weight;
    if (association) boxerFields.association = association;
    if (division) boxerFields.division = division;
    if (date_birth) boxerFields.date_birth = date_birth;

    try {
      let boxer = null;
      if (boxerId) {
        boxer = await Boxer.findById(boxerId);
      }

      if (boxer) {
        // Update
        boxer = await Boxer.findOneAndUpdate(
          {
            _id: boxerId
          },
          {
            $set: boxerFields
          },
          {
            new: true
          }
        );

        return res.json(boxer);
      }

      boxer = new Boxer(boxerFields);

      await boxer.save();
      res.json(boxer);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
