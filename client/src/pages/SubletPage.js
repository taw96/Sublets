import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Components/Layouts/Header'
import { Card,CardHeader,CardMedia, Grid,CardContent, Divider } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { Gallery, GalleryImage } from 'react-gesture-gallery'
import formatDate from '../utills/formatDate'
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from 'react-icons/io'
import { FaSmileWink } from 'react-icons/fa'
import { useMediaQuery } from 'react-responsive'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({

  card: {
    width:'200px',
    maxHeight:'90vh',
    borderRadius: '25px',
    backgroundColor:'#dcdcdc'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    borderRadius: '50px',
    height:'50px',
    width:'50px'
  }
}))

export default function SubletPage({match}) {
  const classes = useStyles();

  const yes = <span style={{color:'green', fontSize:'25px'}}>🗸</span> 

  const no = <span style={{color:'red', fontSize:'20px'}}>✖</span>
  const {params:{id},} =match;

  const [index,setIndex] = useState(0)

  const [sublet, setSublet] = useState({})

  //responsive design

  const isDesktopOrLaptop = useMediaQuery({minWidth:1224})
  
  const isTabletOrMobileDevice = useMediaQuery({maxWidth:1224})
  
  useEffect(()=> {
    const fetchData = async () =>{
        const result = await axios.get(`/sublets/${id}`);

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
    {isTabletOrMobileDevice && <> 
    <Card style={{borderRadius:"30px",'maxWidth':'90%',marginLeft:'30px', marginBottom:"30px",marginTop:'20px'}}>
    <CardMedia>
    <Gallery
          
          index={index}
          onRequestChange = {i=>{
          setIndex(i)
          }} 
          >
   {images}

  </Gallery>
  </CardMedia>
             
      <CardContent style={{direction:'rtl',fontSize:"17px"}}>
         <div style={{
            display:'flex',
            flex:'1',
            justifyContent:'space-between'
          }}>
        <h1>{sublet.description}</h1>
          <div>
          <Avatar aria-label="recipe" className={classes.avatar}
            src={sublet.profilePicture}
          />
          <span style={{fontSize:'13px'}}>{   sublet.userName}</span>
          </div>
        </div>
         

        <h3>  
        <div>
        {sublet.address}
        </div>
        <div>
        תאריכים: <span>{formatDate(sublet.dateOut)} -   {formatDate(sublet.dateIn)}</span>
        </div>
        <div>  
          מחיר ללילה:
         {sublet.costPerNight}  ₪
        </div>
        </h3>

        <br/>
        <div>
          <h4>פירוט:</h4>

          {sublet.details}
        </div>
        <Divider/>
        
        <br/>
        
        <div>
          
        <h4>קצת פרטים יבשים:</h4>
        <div>
        {sublet.parking? yes : no}
        חנייה
        </div>
        <div>
        {sublet.elevator? yes : no}
        מעלית
        </div>
        <div>
        {sublet.airCon? yes : no}
        מזגן
        </div>
        <div>
        {sublet.tv? yes : no}
        טלוויזיה
        </div>
        <div>
        {sublet.balcony? yes : no}
        מרפסת
        </div>
        <div>
        {sublet.washMachine? yes : no}
        מכונת כביסה
        </div>
        <div>
        {sublet.wifi? yes : no}
        wifi
        </div>
        <div>
        {sublet.streamer? yes : no}
        נטפליקס
        </div>
        
        </div>

        <Divider/>

        <br/>

        <div>  
          מחיר לתקופה:
         {sublet.cost}  ₪
        </div>
      
        <div>  
        ליצירת קשר:
        {sublet.phone}
        </div>
      </CardContent>
     
     </Card>
     </>}
    {isDesktopOrLaptop &&  



    <Card style={{borderRadius:"30px",'maxWidth':'90%',marginLeft:'30px', marginBottom:"30px",marginTop:'20px'}}>
    <Grid container spacing={3}>
    <Grid item xs={6}>
    <CardMedia>
    <Gallery
          
          index={index}
          onRequestChange = {i=>{
          setIndex(i)
          }} 
          >
   {images}

  </Gallery>
  </CardMedia>
      
      </Grid>
    <Grid item xs={6}>
             
      <CardContent style={{direction:'rtl', fontSize:"17px"}}>
          <div style={{
            display:'flex',
            flex:'1',
            justifyContent:'space-between'
          }}>
        <h1>{sublet.description}</h1>
          <div>
          <Avatar aria-label="recipe" className={classes.avatar}
            src={sublet.profilePicture}
          />
          <span style={{fontSize:'13px'}}>{sublet.userName}</span>
          </div>
        </div>
         

        <h3>  
        <div>
        {sublet.address}
        </div>
        <div>
        תאריכים: <span>{formatDate(sublet.dateOut)} -   {formatDate(sublet.dateIn)}</span>
        </div>
        <div>  
          מחיר ללילה:
         {sublet.costPerNight}  ₪
        </div>
        </h3>

        <br/>
        <div> 
         <h4>פירוט:</h4>

          {sublet.details}

        </div>
        <Divider/>
        
        <br/>
        
        <div>
          
        <h4>קצת פרטים יבשים:</h4>
        <div>
        {sublet.parking? yes : no}
        חנייה
        </div>
        <div>
        {sublet.elevator? yes : no}
        מעלית
        </div>
        <div>
        {sublet.airCon? yes : no}
        מזגן
        </div>
        <div>
        {sublet.tv? yes : no}
        טלוויזיה
        </div>
        <div>
        {sublet.balcony? yes : no}
        מרפסת
        </div>
        <div>
        {sublet.washMachine? yes : no}
        מכונת כביסה
        </div>
        <div>
        {sublet.wifi? yes : no}
        wifi
        </div>
        <div>
        {sublet.streamer? yes : no}
        נטפליקס
        </div>
        
        </div>

        <Divider/>

        <br/>

        <div>  
          מחיר לתקופה:
         {sublet.cost}  ₪
        </div>
        
      
        <div>  
        ליצירת קשר:
        {sublet.phone}
        </div>
      </CardContent>
      </Grid>
      
    
      </Grid>
     </Card>

     }

  </>
  )
}
