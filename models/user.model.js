const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create user Schema

const userSchema = new Schema({

  userName:{
    type:String
  },

  profilePicture:{
    type:String
  },
  email:{
    type:String
  }

})


const User =mongoose.model('User',userSchema);

module.exports(User)



})