const Expense = require('../models/expense');
const path = require('path');
const rootDir = require('../utilities/path.js');
const { error } = require('console');

exports.getForm = async(req, res, next) => {
  try{
    const expenses = await Expense.findAll();
    res.status(200).json(expenses);
  }catch(err){
    console.log('Issue in getForm', JSON.stringify(err));
    res.status(500).json({
        error: err
    })
  }

}

exports.postForm = async(req, res, next) => {
  try{

    const itemName = req.body.itemName;
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;

    if(!itemName){
        throw new error('Item Name is mandatory');
    }

    if(!amount){
        throw new error('Amount is mandatory');
    }

    if(!category){
        throw new error('Category is mandatory');
    }
     
    const data = await Expense.create({
        itemName: itemName,
        expenseAmount: amount,
        description:description,
        category: category
       
    })
        res.status(201).json(data);
  }catch(err){
    console.log('Issue in postForm', JSON.stringify(err));
    res.status(500).json({
        error: err
    })
  } 
      
}

exports.editExpense = async (req, res, next) => {
    try{
      const expenseId = req.params.expenseId;
      if(expenseId === 'undefined'){
         console.log('Expense Id is missing');
         res.status(400).json({
           error: 'Expense Id is missing'
         })
          throw new error('Expense not found');
      }

       const deletedExpense = await Expense.destroy({where: {id: expenseId}});
       res.status(200).json(deletedExpense);
      }catch(err){
          console.log('Issue in editExpense', JSON.stringify(err));
          res.status(500).json({
              error: err
          })
      }
  
  }


exports.deleteExpense = async (req, res, next) => {
  try{
    const expenseId = req.params.expenseId;
    if(expenseId === 'undefined'){
       console.log('Expense Id is missing');
       res.status(400).json({
         error: 'Expense Id is missing'
       })
        throw new error('Expense not found');
    }
     const deletedExpense = await Expense.destroy({where: {id: expenseId}});
     res.status(200).json(deletedExpense);
    }catch(err){
        console.log('Issue in deleteExpense', JSON.stringify(err));
        res.status(500).json({
            error: err
        })
    }

}

