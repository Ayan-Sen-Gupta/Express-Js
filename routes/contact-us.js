const express = require('express');
const contactController = require('../controllers/contact.js');

const router = express.Router();

router.get('/contact-us',contactController.getContactUs);

router.post('/success',contactController.postContactUs);

router.get('/success',contactController.getSuccess);

module.exports = router;