const mongoose = require('mongoose');

const BoutSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'event'
  },
  red_corner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'boxer'
  },
  blue_corner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'boxer'
  },
  red_corner_name: {
    type: String
  },
  blue_corner_name: {
    type: String
  },
  result: {
    type: String
  },
  time: {
    type: String
  },
  referee: {
    type: String
  },
  titles: {
    type: String
  },
  scorecard0: {
    judge: {
      type: String
    },
    red_corner_points: {
      type: Number
    },
    blue_corner_points: {
      type: Number
    }
  },
  scorecard1: {
    judge: {
      type: String
    },
    red_corner_points: {
      type: Number
    },
    blue_corner_points: {
      type: Number
    }
  },
  scorecard2: {
    judge: {
      type: String
    },
    red_corner_points: {
      type: Number
    },
    blue_corner_points: {
      type: Number
    }
  },
  red_corner_punches: {
    power_punches: {
      type: Number
    },
    jabs: {
      type: Number
    }
  },
  blue_corner_punches: {
    power_punches: {
      type: Number
    },
    jabs: {
      type: Number
    }
  }
});

module.exports = Bout = mongoose.model('bout', BoutSchema);
