const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  permissions: {
    type: [String],
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);