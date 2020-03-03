const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  place: {
    type: String
  },
  commission: {
    type: String
  },
  promoter: {
    type: String
  },
  matchmaker: {
    type: String
  },
  doctor: {
    type: String
  },
  media: {
    type: String
  },
  inspector: {
    type: String
  },
  date: {
    type: Date
  }
});

module.exports = Event = mongoose.model('event', EventSchema);
