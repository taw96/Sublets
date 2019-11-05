const express = require('express');
const bodyParser =require('body-parser')
const path= require('path')
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream');
const crypto = require('crypto')
const app = express();

// Bodyparser Middleware
app.use(bodyParser.json())

app.use(cors());

app.use(express.json());


// Connect to Mongo
const uri ='mongodb+srv://tomeramit:taw314875519@reactreserve-shv1o.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true }) 

const connection = mongoose.connection;

let gfs;

connection.once('open', () => {
  gfs= Grid(connection.db,mongoose.mongo)
  gfs.collection('uploads')
  console.log("MongoDB database connection established successfully");
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

  //Create storage engine 
  const storage = new GridFsStorage({
    url:uri,
    file:(req,file)=>{
      return new Promise((resolve,reject)=>{
        crypto.randomBytes(16,(err,buf)=>{
          if(err){
            return reject(err)
        }
        const filename = file.originalname
        const fileInfo= {
          filename:filename,
          bucketName: 'uploads',

        }
        resolve(fileInfo)
      
      })
    })
  },
})

const upload = multer({storage})

app.post('/',upload.single('img'),(req,res,err)=>{
  if(err) throw err
  res.status(201).send()
})


// Use Routes

const subletsRouter= require('./routes/api/sublets');

app.use('/sublets', subletsRouter);
  
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
