const express = require('express')

const router = express.Router()

let User = require('../../models/user.model')


router.route('/addUser').post((req,res)=>{
  const userName= req.body.name;
  const facebook_id=req.body.id;
  const profilePicture= req.body.profilePic;
  const email = req.body.email;
  const likedSublets = req.body.likedSublets;

  User.countDocuments({facebook_id:facebook_id},(err,count) =>{
    if(count>0){
      res.json("user alrady exists")
    } else{

      const newUser = new User(
        {userName,facebook_id,profilePicture,email});
    
    newUser.save()
    .then(()=>res.json('user added!'))
    .catch(err=>res.status(400).json('Error: ' + err));
    }
    
})})

router.route('/getUsers').get(async(req,res)=>{
  User.find()
  .then(User=> res.json(User))
  .catch((err=> err +"there is an error" + err))
  
})

router.route('/getUser/:id').get(async(req,res)=>{
  User.find({
    facebook_id:req.params.id
  })
  .then(User=> res.json(User))
  .catch((err=> err +"there is an error" + err))
  
})


router.route('/updateUser/:id').post((req,res)=>{

const updatedLikedSublets= req.body.alLikedSublets

  User.updateOne({facebook_id:req.params.id},
  {$set:{likedSublets:updatedLikedSublets}},
  function(err){
    if(err){
      console.log(err);
      return;
    } else{
      res.redirect('/')
    }
  })
})
  
module.exports = router;


