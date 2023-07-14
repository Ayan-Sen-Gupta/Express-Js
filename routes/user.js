const path = require('path');

const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/', userController.getForm);

router.post('/', userController.postForm);

router.delete('/delete-user/:userId', userController.deleteUser);

module.exports = router;