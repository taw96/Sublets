const express = require('express')

const router = express.Router()

let User = require('../../models/user.model')


router.route('/').get((req,res)=>{
  User.find()
  .then(User=> res.json(User))
  .catch(err=>res.status(400).json('error'+err))
})

router.route('/add').post((req,res)=>{

  const userName = req.body.userName;
  const profilePicture = req.body.profilePicture;
  const email = req.body.email;
  const savedSublets =req.body.savedSublets;

const newUser  = new User({userName,profilePicture,email,savedSublets});

newUser.save().then(()=> res.json('user added'))
.catch(err=>res.status(400).json('Error: ' + err));

});



