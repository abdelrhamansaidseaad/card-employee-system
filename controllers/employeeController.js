const Employee = require('../models/Employee');

exports.createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.processWithdrawal = async (req, res) => {
  try {
    const { cardNumber, amount } = req.body;
    
    const card = await Card.findOne({ cardNumber });
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    if (card.withdraw(amount)) {
      await card.save();
      res.json({ success: true, newBalance: card.balance });
    } else {
      res.status(400).json({ error: 'Withdrawal failed' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};