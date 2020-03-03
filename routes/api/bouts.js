const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Bout = require('../../models/Bout');

// @route GET api/bouts
// @desc  Get all bouts
// @access Public
router.get('/', async (req, res) => {
  try {
    const bouts = await Bout.find().sort({ event: -1 });
    res.json(bouts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/bouts
// @desc  Get bout by id
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const bout = await Bout.findById(req.params.id);
    res.json(bout);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/boutes
// @desc  Create a bout
// @access Private
router.post('/', auth, async (req, res) => {
  const {
    event,
    red_corner,
    blue_corner,
    red_corner_name,
    blue_corner_name,
    result,
    time,
    referee,
    titles,
    judge0,
    red_corner_points0,
    blue_corner_points0,
    judge1,
    red_corner_points1,
    blue_corner_points1,
    judge2,
    red_corner_points2,
    blue_corner_points2,
    red_power_punches,
    red_jabs,
    blue_power_punches,
    blue_jabs
  } = req.body;

  // Build bout object
  const boutFields = {};
  if (event) boutFields.event = event;
  if (red_corner) boutFields.red_corner = red_corner;
  if (blue_corner) boutFields.blue_corner = blue_corner;
  if (red_corner_name) boutFields.red_corner_name = red_corner_name;
  if (blue_corner_name) boutFields.blue_corner_name = blue_corner_name;
  if (result) boutFields.result = result;
  if (time) boutFields.time = time;
  if (referee) boutFields.referee = referee;
  if (titles) boutFields.titles = titles;

  boutFields.scorecard0 = {};

  if (judge0) boutFields.scorecard0.judge = judge0;
  if (red_corner_points0)
    boutFields.scorecard0.red_corner_points = red_corner_points0;
  if (blue_corner_points0)
    boutFields.scorecard0.blue_corner_points = blue_corner_points0;

  boutFields.scorecard1 = {};

  if (judge1) boutFields.scorecard1.judge = judge1;
  if (red_corner_points1)
    boutFields.scorecard1.red_corner_points = red_corner_points1;
  if (blue_corner_points1)
    boutFields.scorecard1.blue_corner_points = blue_corner_points1;

  boutFields.scorecard2 = {};

  if (judge2) boutFields.scorecard2.judge = judge2;
  if (red_corner_points2)
    boutFields.scorecard2.red_corner_points = red_corner_points2;
  if (blue_corner_points2)
    boutFields.scorecard2.blue_corner_points = blue_corner_points2;

  boutFields.red_corner_punches = {};

  if (red_power_punches)
    boutFields.red_corner_punches.power_punches = parseInt(
      red_power_punches,
      10
    );
  if (red_jabs) boutFields.red_corner_punches.jabs = parseInt(red_jabs, 10);

  boutFields.blue_corner_punches = {};

  if (blue_power_punches)
    boutFields.blue_corner_punches.power_punches = parseInt(
      blue_power_punches,
      10
    );
  if (blue_jabs) boutFields.blue_corner_punches.jabs = parseInt(blue_jabs, 10);

  try {
    var bout = new Bout(boutFields);

    await bout.save();
    res.json(bout);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
