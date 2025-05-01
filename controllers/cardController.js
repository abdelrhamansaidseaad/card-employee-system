const Card = require('../models/Card');

exports.createCard = async (req, res) => {
  try {
    const card = new Card(req.body);
    await card.save();
    res.status(201).json(card);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.withdraw = async (req, res) => {
  try {
    const card = await Card.findOne({ cardNumber: req.params.cardNumber });
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    const amount = parseFloat(req.body.amount);
    if (card.withdraw(amount)) {
      await card.save();
      res.json({ success: true, newBalance: card.balance });
    } else {
      res.status(400).json({ error: 'Insufficient balance' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.validateCard = async (req, res) => {
  try {
    const card = await Card.findOne({ cardNumber: req.params.cardNumber });
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    res.json({ isValid: card.validateCard() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};