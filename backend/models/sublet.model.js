const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SubletSchema = new Schema({
 
  address:{
    type:String },

  floorLevel: {
    type:String,},

  dateIn: {
    type: Date,
    },

  dateOut: {
    type: Date,
    },

  rooms: {
    type:String},

  rommatesLeft: {
    type:String},

  cost: {
    type:String},

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
    type:Number}
  //   ,

  // imageName:{
  //   type:String,
  //   default:'none',
  //   required:true
  // },
  // imageData: {
  //   type:String,
  //   required:true
  // }

});


const Sublet = mongoose.model('Sublet', SubletSchema);
module.exports = Sublet;
