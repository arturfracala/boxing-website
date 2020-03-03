const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route GET api/users
// @desc  Get all users
// @access Public
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/users
// @desc  Register user
// @access Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please eneter a password with 6 or more characters'
    ).isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { name, email, password } = req.body;
    const status = 'fan';

    try {
      let user = await User.findOne({
        email
      });

      if (user) {
        return res.status(400).json({
          errors: [
            {
              msg: 'User already exists'
            }
          ]
        });
      }

      user = new User({
        name,
        email,
        password,
        status
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route PUT api/users
// @desc  Update user status
// @access Public
router.put(
  '/:id',
  [
    auth,
    check('status', 'Status is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { status } = req.body;

    const userFields = {};
    if (status) userFields.status = status;

    let user = await User.findById(req.user.id);

    if (user === null) {
      return res.status(404).json({ msg: 'User not found ' });
    }

    try {
      user = await User.findOneAndUpdate(
        {
          _id: req.params.id
        },
        {
          $set: userFields
        },
        {
          new: true
        }
      );

      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
