const User = require('../models/user');
const path = require('path');
const rootDir = require('../utilities/path.js');
const { error } = require('console');

exports.getForm = async(req, res, next) => {
  try{
    const users = await User.findAll();
    res.status(200).json(users);
  }catch(err){
    console.log('Issue in getForm', JSON.stringify(err));
    res.status(500).json({
        error: err
    })
  }

}

exports.postForm = async(req, res, next) => {
  try{

    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const date = req.body.date;
    const time = req.body.time;

    if(!phone){
        throw new error('Phone Number is mandatory');
    }

    if(!email){
        throw new error('Email is mandatory');
    }
     
    const data = await User.create({
        name: name,
        email: email,
        phone:phone,
        date: date,
        time: time
    })
        res.status(201).json(data);
  }catch(err){
    console.log('Issue in postForm', JSON.stringify(err));
    res.status(500).json({
        error: err
    })
  } 
      
}

exports.deleteUser = async (req, res, next) => {
  try{
    const userId = req.params.userId;
    if(userId === 'undefined'){
       console.log('User Id is missing');
       res.status(400).json({
         error: 'User Id is missing'
       })
        throw new error('User not found');
    }
     const deletedUser = await User.destroy({where: {id: userId}});
     res.status(200).json(deletedUser);
    }catch(err){
        console.log('Issue in deleteUser', JSON.stringify(err));
        res.status(500).json({
            error: err
        })
    }

}

