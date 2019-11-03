const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();

app.use(cors());

// Bodyparser Middleware
app.use(express.json());


// Connect to Mongo
const uri ='mongodb+srv://tomeramit:taw314875519@reactreserve-shv1o.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true }) 


const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


// Use Routes

const subletsRouter= require('./routes/api/sublets');

app.use('/sublets', subletsRouter);
  
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
