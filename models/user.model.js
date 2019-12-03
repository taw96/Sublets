const mongoose = require('mongoose');

//Create user Schema

const userSchema = new mongoose.Schema({

  userName:{
    type:String
  },

  facebook_id:{
    type: String
  },
  profilePicture:{
    type:String
  },
  email:{
    type:String
  },
  likedSublets:{
    type:Array
  }

});



module.exports= mongoose.model('User', userSchema)


