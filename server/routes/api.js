const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
const contactController = require('../controllers/contactController');

router.get('/portfolio', portfolioController.getPortfolioData);
router.post('/contact', contactController.submitContactMessage);

module.exports = router;
