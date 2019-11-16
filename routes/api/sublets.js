const express = require('express');
const router = express.Router();


let Sublet = require('../../models/sublet.model')

router.route('/').get((req,res)=> {
    Sublet.find()
  .then(Sublet => res.json(Sublet))
  .catch(err=> res.status(400).json('Error: ' + err));
})

router.route('/cost').get((req,res)=> {
  const min = req.query.min;
  const max =req.query.max;

  Sublet.find({
    $and:[
    {costPerNight:{$gt:min}},
    {costPerNight:{$lt:max}}
        ]})
  .then(Sublet => res.json(Sublet))
  .catch(err=> res.status(400).json('Error: ' + err));
})



router.route('/add').post((req, res) => {
  const address = req.body.address;
  const description= req.body.description;
  const floorLevel = req.body.floorLevel;
  const rooms = req.body.rooms;
  const roomatesLeft = req.body.roomatesLeft;
  const cost = req.body.cost;
  const costPerNight = req.body.costPerNight;
  const days = req.body.days;
  const details = req.body.details;
  const phone = req.body.phone;
  const elevator = req.body.elevator;
  const airCon=req.body.airCon;
  const balcony=req.body.balcony;
  const washMachine=req.body.washMachine;
  const wifi=req.body.wifi;
  const tv=req.body.tv;
  const streamer=req.body.streamer;
  const dateIn = req.body.selectedDateIn;
  const dateOut = req.body.selectedDateOut;
  const lat = req.body.lat;
  const lng = req.body.lng;
  const mediaUrl = req.body.mediaUrl;
  


  const newSublet = new Sublet ({address,description, floorLevel,rooms,roomatesLeft,cost,costPerNight,days,details,
  phone, elevator,airCon,balcony,washMachine,wifi,tv,streamer,dateIn,dateOut,lat,lng,mediaUrl});

  newSublet.save()
    .then(() => res.json('sublet added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req,res)=>{
  Sublet.findById(req.params.id)
  .then(resopnse=>res.json(resopnse))
  .catch(err=>res.status(400).json('error: ' + err));

});

router.route('/:id').delete((req,res)=>{
  Sublet.findByIdAndDelete(req.params.id)
  .then(()=>res.json('const deleted.'))
  .catch(err=>res.status(400).json('error: ' + err));

});

router.route('/update/:id').post((req,res)=>{
  Sublet.findById(req.params.id)
  .then(Sublet =>{
  Sublet.address = req.body.address
  Sublet.name = req.body.name
  Sublet.floorLevel = req.body.floorLevel 
  Sublet.howManyRommates = req.body.howManyRommates
  Sublet.Price = req.body.Price
  Sublet.textAndExtras = req.body.textAndExtras
  Sublet.phone = req.body.phone
  Sublet.elevator = req.body.elevator
  Sublet.airCon = req.body.airCon
  Sublet.balcony = req.body.balcony
  Sublet.image1 = req.body.selectedImages
  Sublet.dateIn = req.body.selectedDateIn
  Sublet.dateOut = req.body.selectedDateOut

Sublet.save()
.then(()=> res.json('sublet updated!'))
.catch(err=>res.status(400).json('Error: ' + err));
})
.catch(err=>res.status(400).json('error: ' + err));
});

module.exports = router;
