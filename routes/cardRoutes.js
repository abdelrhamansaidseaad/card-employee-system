const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');

router.post('/', cardController.createCard);
router.get('/', cardController.getAllCards);
router.post('/:cardNumber/withdraw', cardController.withdraw);
router.get('/:cardNumber/validate', cardController.validateCard);

module.exports = router;