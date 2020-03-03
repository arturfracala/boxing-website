const mongoose = require('mongoose');

const BoxerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  alias: {
    type: String
  },
  country: {
    type: String
  },
  ranking: {
    type: Number
  },
  height: {
    type: Number
  },
  reach: {
    type: Number
  },
  weight: {
    type: Number
  },
  association: {
    type: String
  },
  division: {
    type: String
  },
  date_birth: {
    type: Date
  }
});

module.exports = Boxer = mongoose.model('boxer', BoxerSchema);
