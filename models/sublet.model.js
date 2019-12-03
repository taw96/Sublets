const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SubletSchema = new Schema({

  userName:{
    type:String
  },
  userID:{
    type:String
  },
  profilePicture:{
    type:String 
  },
 
  address:{
    type:String 
  },

  description:{
    type:String
  },

  floorLevel: {
    type:Number
  },

  dateIn: {
    type: Date
    },

  dateOut: {
    type: Date
    },

  rooms: {
    type:Number},

  availabelBedrooms: {
      type:Number},
  

  rommatesLeft: {
    type:Number},

  cost: {
    type:Number},

  costPerNight:{
    type:Number
  },

  days:{
    type:Number
  },
  details: {
    type:String},

  phone:{
      type:String},
  
  elevator: {
    type:Boolean},

  airCon: {
    type:Boolean},

  balcony: {
    type:Boolean},

  washMachine: {
    type:Boolean},

  wifi: {
    type:Boolean},
  
  tv: {
    type:Boolean},

  streamer: {
    type:Boolean},

  lat: {
    type:Number},

  lng: {
    type:Number},

  mediaUrl:{
    type: Array
  }
    
});


const Sublet = mongoose.model('Sublet', SubletSchema);
module.exports = Sublet;
