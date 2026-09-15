const mongoose = require('mongoose');

const elementSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    type: { type: String, required: true, enum: ['rect', 'circle', 'text'] },
    x: { type: Number, required: true, default: 0 },
    y: { type: Number, required: true, default: 0 },
    width: { type: Number, default: 100 },
    height: { type: Number, default: 100 },
    radius: { type: Number, default: 50 },
    rotation: { type: Number, default: 0 },
    fill: { type: String, default: '#5B8DEF' },
    text: { type: String, default: '' },
    fontSize: { type: Number, default: 24 },
    zIndex: { type: Number, default: 0 },
  },
  { _id: false }
);

module.exports = elementSchema;