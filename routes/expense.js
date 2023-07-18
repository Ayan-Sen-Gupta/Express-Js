const path = require('path');

const express = require('express');

const expenseController = require('../controllers/expense');

const router = express.Router();

router.get('/', expenseController.getForm);

router.post('/', expenseController.postForm);

router.get('/edit-expense/:expenseId', expenseController.editExpense);

router.delete('/delete-expense/:expenseId', expenseController.deleteExpense);

module.exports = router;