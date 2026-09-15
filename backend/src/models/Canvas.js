const mongoose = require('mongoose');
const elementSchema = require('./Element');

const canvasSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, default: 'Untitled Canvas' },
    width: { type: Number, default: 1000 },
    height: { type: Number, default: 700 },
    background: { type: String, default: '#ffffff' },
    elements: { type: [elementSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Canvas', canvasSchema);