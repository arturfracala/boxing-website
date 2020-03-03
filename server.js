const express = require('express');
const connectDB = require('./config/db');
const user = require('./routes/api/user');
const auth = require('./routes/api/auth');
const profile = require('./routes/api/profile');
const articles = require('./routes/api/articles');
const posts = require('./routes/api/posts');
const boxers = require('./routes/api/boxers');
const bouts = require('./routes/api/bouts');
const events = require('./routes/api/events');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(
  express.json({
    extended: false
  })
);

// Use routes
app.use('/api/users', user);
app.use('/api/auth', auth);
app.use('/api/profile', profile);
app.use('/api/articles', articles);
app.use('/api/posts', posts);
app.use('/api/boxers', boxers);
app.use('/api/bouts', bouts);
app.use('/api/events', events);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
