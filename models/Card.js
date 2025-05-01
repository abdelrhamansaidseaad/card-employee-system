const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: true,
    unique: true
  },
  holderName: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    required: true,
    default: 0
  },
  expiryDate: {
    type: Date,
    required: true
  }
}, { timestamps: true });

cardSchema.methods.withdraw = function(amount) {
  if (this.balance >= amount) {
    this.balance -= amount;
    return true;
  }
  return false;
};

cardSchema.methods.validateCard = function() {
  return new Date() < this.expiryDate;
};

module.exports = mongoose.model('Card', cardSchema);