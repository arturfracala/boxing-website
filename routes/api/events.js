const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Event = require('../../models/Event');

// @route GET api/events
// @desc  Get all events
// @access Public
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/event
// @desc  Get event by id
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/events
// @desc  Create new event
// @access Public
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
      name,
      place,
      commission,
      promoter,
      matchmaker,
      doctor,
      media,
      inspector,
      date
    } = req.body;

    // Build event object
    const eventFields = {};
    if (name) eventFields.name = name;
    if (place) eventFields.place = place;
    if (commission) eventFields.commission = commission;
    if (promoter) eventFields.promoter = promoter;
    if (matchmaker) eventFields.matchmaker = matchmaker;
    if (doctor) eventFields.doctor = doctor;
    if (media) eventFields.media = media;
    if (inspector) eventFields.inspector = inspector;
    if (date) eventFields.date = date;

    try {
      newEvent = new Event(eventFields);

      const event = await newEvent.save();

      res.json(event);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route PUT api/events
// @desc  Update event
// @access Public
router.put('/:id', [auth], async (req, res) => {
  const {
    name,
    place,
    commission,
    promoter,
    matchmaker,
    doctor,
    media,
    inspector,
    date
  } = req.body;

  // Build event object
  const eventFields = {};
  if (name) eventFields.name = name;
  if (place) eventFields.place = place;
  if (commission) eventFields.commission = commission;
  if (promoter) eventFields.promoter = promoter;
  if (matchmaker) eventFields.matchmaker = matchmaker;
  if (doctor) eventFields.doctor = doctor;
  if (media) eventFields.media = media;
  if (inspector) eventFields.inspector = inspector;
  if (date) eventFields.date = date;

  try {
    var event = null;
    event = await Event.findById(req.params.id);

    if (event) {
      // Update
      event = await Event.findOneAndUpdate(
        {
          _id: req.params.id
        },
        {
          $set: eventFields
        },
        {
          new: true
        }
      );

      return res.json(event);
    } else {
      return res.status(404).json({ msg: 'Event not found' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
