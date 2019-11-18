const express = require('express');
const bodyParser =require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const path = require('path')

require('dotenv').config()

// Bodyparser Middleware
app.use(bodyParser.json())

app.use(cors());

app.use(express.json());


// Connect to Mongo
const uri = process.env.ATLAS_URI

mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true }) 

const connection = mongoose.connection;


connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));



// Use Routes

const subletsRouter= require('./routes/api/sublets');

app.use('/sublets', subletsRouter);

// const usersRouter = require('./routes/api/users');

// app.use('/users', usersRouter)

// Serve static assets if in production

if(process.env.NODE_ENV=== 'production'){

  //set static folder

  app.use(express.static('client/build'));

  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname, 'client','build','index.html'));
  });
}
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
