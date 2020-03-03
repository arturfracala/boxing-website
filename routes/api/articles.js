const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Article = require('../../models/Article');
//const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route POST api/articles
// @desc  Create an article
// @access Private
router.post(
  '/',
  [
    auth,
    check('text', 'Text is required')
      .not()
      .isEmpty(),
    check('title', 'Title is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newArticle = new Article({
        text: req.body.text,
        title: req.body.title,
        name: user.name,
        user: req.user.id
      });

      const article = await newArticle.save();

      res.json(article);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route GET api/articles
// @desc  Get all articles
// @access Public
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ date: -1 });
    res.json(articles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/articles/:id
// @desc  Get article by ID
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ msg: 'Article not found' });
    }

    res.json(article);
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Article not found' });
    }

    res.status(500).send('Server Error');
  }
});

// @route DELETE api/articles/:id
// @desc  Delete an article
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ msg: 'Article not found' });
    }

    await article.remove();

    res.json({ msg: 'Article removed' });
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Article not found' });
    }

    res.status(500).send('Server Error');
  }
});

// @route PUT api/articles/like/:id
// @desc  Like an article
// @access Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    // Check if the article has already been liked
    if (
      article.likes.filter(like => like.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: 'Article already liked' });
    }

    article.likes.unshift({ user: req.user.id });
    await article.save();

    res.json(article.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route PUT api/articles/unlike/:id
// @desc  Unlike an article
// @access Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    // Check if the article has already been liked
    if (
      article.likes.filter(like => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Article has not yet been liked' });
    }

    // Get remove index
    const removeIndex = article.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    article.likes.splice(removeIndex, 1);

    await article.save();

    res.json(article.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/articles/comment/:id
// @desc  Comment on an article
// @access Private
router.post(
  '/comment/:id',
  [
    auth,
    check('text', 'Text is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const article = await Article.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        user: req.user.id
      };

      article.comments.unshift(newComment);

      await article.save();

      res.json(article.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route DELETE api/articles/comment/:id/:comment_id
// @desc  Delete comment
// @access Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    const comment = article.comments.find(
      comment => comment.id === req.params.comment_id
    );

    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const removeIndex = article.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);

    article.comments.splice(removeIndex, 1);

    await article.save();

    res.json(article.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
