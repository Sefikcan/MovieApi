var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Models
const User = require('../models/User');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.post('/register', (req, res, next) => {
  const {
    username,
    password
  } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    const user = new User({
      username: username,
      password: hash
    });

    const promise = user.save();
    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    });
  });
});

router.post('/authenticate', (req, res) => {
  const {
    username,
    password
  } = req.body;
  User.findOne({
    username: username
  }, (err, data) => {
    if (err)
      throw err;
    if (!data) {
      res.json({
        status: false,
        message: 'authentication failed, user is not found'
      });
    } else {
      bcrypt.compare(password,data.password).then((result)=>{
        if(!result){
          res.json({
            status:false,
            message:'Authentication failed,wrong password'
          });
        }
        else{
          const payload={
            username:username
          };
          
          const token= jwt.sign(payload,req.app.get('api_secret_key'),{
            expiresIn:720 //12 saat
          });

          res.json({
            status:true,
            token:token
          });
        }
      });
    }
  });
});

module.exports = router;