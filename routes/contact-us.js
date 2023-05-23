const path = require('path');
const express = require('express');
const rootDir = require('../utilities/path.js');

const router = express.Router();

router.get('/contact-us',(req,res,next) => {
     res.sendFile(path.join(rootDir, 'views', 'contact-us.html'));
});

router.post('/success',(req,res,next) => {
   console.log(req.body);
    res.redirect('/success');
   
});

router.get('/success',(req,res,next) => {
    res.sendFile(path.join(rootDir, 'views', 'success.html'));
});

module.exports = router;