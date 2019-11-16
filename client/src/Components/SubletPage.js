import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Layouts/Header'
import { Card, Grid,CardContent, Divider } from '@material-ui/core';
import { Gallery, GalleryImage } from 'react-gesture-gallery'
import formatDate from '../utills/formatDate'
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from 'react-icons/io'
import { FaSmileWink } from 'react-icons/fa'


export default function SubletPage({match}) {


  const {params:{id},} =match;

  const [index,setIndex] = useState(0)

  const [sublet, setSublet] = useState({})

  useEffect(()=> {
    const fetchData = async () =>{
        const result = await axios.get(`http://localhost:5000/sublets/${id}`);

     setSublet(result.data);
    }
    fetchData();
    },[id]);



    let img = {...sublet.mediaUrl}

    const images = Object.keys(img).map((key)=>(
      
      <div key={img[key]} 
      >

      <GalleryImage 
      objectFit="contain" 
      src={img[key]}
      />
 
     </div>
    ))

  return (
    <>
    <Header/>
    <Grid container >
  
    <Grid >
    <Card style={{'maxWidth':'90%',marginLeft:'30px', marginBottom:"30px"}}>
    <Gallery
          
          index={index}
          onRequestChange = {i=>{
          setIndex(i)
          }} 
          >

   {images}

  </Gallery>
   </Card>
   </Grid>
   <Grid >
     <Card dir='rtl' style={{marginRight:'20px',marginBottom:'20px'}}>
       
      <h1>{sublet.description}</h1>
      
      <CardContent>
        <div>  
        {sublet.address}
        </div>
        תאריכים: <span>{formatDate(sublet.dateOut)} -   {formatDate(sublet.dateIn)}</span>
   
        <div> 
          פירוט: 

          לפרומי בלוף קינץ תתיח לרעח. לת צשחמי צש בליא, מנסוטו צמלח לביקו ננבי, צמוקו בלוקריה שיצמה ברורק. סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט - לפתיעם ברשג - ולתיעם גדדיש. קוויז דומור ליאמום בלינך רוגצה. לפמעט מוסן מנת. 
        </div>
        <Divider/>
        
        <br/>
        
        <div>
          
        <h4>קצת פרטים יבשים:</h4>
        <div>
        מעלית: 
        {sublet.elevator? <IoMdCheckmarkCircleOutline /> : <IoMdCloseCircleOutline   />}
        </div>
        <div>
        מזגן:
        {sublet.airCon? <IoMdCheckmarkCircleOutline /> : <IoMdCloseCircleOutline />}
        </div>
        <div>
        טלוויזיה:
        {sublet.tv? <IoMdCheckmarkCircleOutline /> : <IoMdCloseCircleOutline />}
        </div>
        <div>
        מרפסת:
        {sublet.balcony? <IoMdCheckmarkCircleOutline /> : <IoMdCloseCircleOutline />}
        </div>
        <div>
        מכונת כביסה:
        {sublet.washMachine? <IoMdCheckmarkCircleOutline/> : <IoMdCloseCircleOutline/>}
        </div>
        <div>
        wifi:
        {sublet.wifi? <IoMdCheckmarkCircleOutline /> : <IoMdCloseCircleOutline/>}
        </div>
        <div>
        נטפליקס:
        {sublet.streamer? <div> <FaSmileWink/> בדוק שיש </div> : <IoMdCloseCircleOutline/>}
        </div>
        
        </div>

        <Divider/>

        <br/>

        <div>  
          מחיר לתקופה:
         {sublet.cost}  ש"ח
        </div>
      
        <div>  
        ליצירת קשר:
        {sublet.phone}
        </div>
      </CardContent>
     </Card>
    </Grid>
   </Grid>

  </>
  )
}
