import React, { useState, useEffect,useContext } from 'react';
import {UserContext} from '../UserContext';
import axios from 'axios';
import Header from '../Components/Layouts/Header'
import { Card,CardHeader,CardMedia, Grid,CardContent, Divider, IconButton } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import formatDate from '../utills/formatDate'
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from 'react-icons/io'
import { FaSmileWink } from 'react-icons/fa'
import { useMediaQuery } from 'react-responsive'
import { makeStyles } from '@material-ui/core/styles';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {WhatsappShareButton, FacebookShareButton} from 'react-share'
import {FacebookIcon, WhatsappIcon} from 'react-share'
import PhoneIcon from '@material-ui/icons/Phone';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useParams } from "react-router-dom";


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

export default function SubletPage({alLikedSublets}) {
  
  const classes = useStyles();

  const yes = <span style={{color:'green', fontSize:'25px'}}>✔</span> 

  const no = <span style={{color:'red', fontSize:'20px'}}>✖</span>
 
  const [index,setIndex] = useState(0)

  const [sublet, setSublet] = useState({})

  //responsive design

  const isDesktopOrLaptop = useMediaQuery({minWidth:1224})
  
  const isTabletOrMobileDevice = useMediaQuery({maxWidth:1224})
  
  //fetching specific Sublet

  let id = useParams()
  
  useEffect(()=> {
    const fetchData = async () =>{
        const result = await axios.get(`/sublets/${id.id}`);

     setSublet(result.data);
    }
    fetchData();
    },[]);

    const img = {...sublet.mediaUrl}

    // conditionl sharing because of web share api available only on mobile 
  const url = `https://sublets12.herokuapp.com/sublet/${sublet._id}`

const share = () =>{
  if(navigator.share){
    console.log("sharing")
      navigator.share({
      title:'נראה לי שהסאבלט הזה בול בשבילך',
      text:`${sublet.description}`,
      url: url
    }).then(()=>{
      console.log('Thanks for sharing!');
    }).catch(console.error)
      }
      else{
        console.log("unable to share")
      }
      
      }


 let sharingOption= (navigator.share) ?

 <IconButton aria-label="share" onClick={share}>   
          <ShareIcon/>
        </IconButton>

        :
   
   <IconButton aria-label="share">
      <WhatsappShareButton style={{position:'relative',top:'2px'}}        
        url={url} 
        title={`${sublet.description}`}>
        <ShareIcon/>
      </WhatsappShareButton> 
      </IconButton>

    //liking sublets system

     const [facebookUserDetails] = useContext(UserContext)

  let initialBoolean = alLikedSublets.includes(id.id)

  let [likedSublet, SetLikedSublet]=useState(initialBoolean)
      
    const toggleLike =()=>{

    SetLikedSublet(state=>!state)
    if(!likedSublet){
    alLikedSublets.push(sublet._id)
    axios.post(`/users/updateUser/${facebookUserDetails.id}`,{alLikedSublets})

    }
    
    else{
        let deletePos = (alLikedSublets
        .indexOf(sublet._id))  

        alLikedSublets.splice(deletePos,1)

        axios.post(`/users/updateUser/${facebookUserDetails.id}`,{alLikedSublets})
    }
  }


      


  return (
    <>
    {isTabletOrMobileDevice && <> 

    <Card style={{borderRadius:"30px",'maxWidth':'90%',marginLeft:'30px', marginBottom:"30px",marginTop:'20px'}}>

     <Carousel 
     showThumbs={false}
     showStatus={false}
     infiniteLoop={true}
     >
       {Object.keys(img).map((key)=>(
              
        <img src={img[key]} height='300' width="250"/>

       ))}
    
    </Carousel>
             
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
        {sublet.days} ימים
        
        </div>
        <div>
        תאריכים: <span>{formatDate(sublet.dateOut)} -   {formatDate(sublet.dateIn)}</span>
        </div>
        <div>  
          מחיר ללילה: {sublet.costPerNight}  ₪
        </div>
        <div>  
          מחיר לתקופה: {sublet.cost}  ₪
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
       <div style={{display:'flex',flex:'1',justifyContent:'space-evenly'}}>
          <div>  <a href={`tel:+972${sublet.phone}`}> 
        <IconButton>
           <PhoneIcon/>
        </IconButton>
          </a>
        </div>

        <div>
          {(sharingOption)}
        </div>
      
        <div>
        <IconButton
        onClick={toggleLike} 
        style={{color:likedSublet?"red":"#313131"}}
        >
        <FavoriteIcon  />
        </IconButton>
        </div>

        </div>
      </CardContent>
     
     </Card>
     </>}

    {isDesktopOrLaptop &&  

    <Card style={{borderRadius:"30px",'maxWidth':'90%',marginLeft:'30px', marginBottom:"30px",marginTop:'20px'}}>
    <Grid container spacing={0}>
    <Grid item xs={6}>
    <CardMedia>
    <Carousel 
     showThumbs={false}
     showStatus={false}
     infiniteLoop={false}   
      >
       {Object.keys(img).map((key)=>(
              
        <img src={img[key]} height='500' width="1000"/>

       ))}
    
    </Carousel>
             
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
        <div style={{display:'flex',flex:'1',justifyContent:'space-evenly'}}>
          <div>  <a href={`tel:+972${sublet.phone}`}> 
        <IconButton>
           <PhoneIcon/>
        </IconButton>
          </a>
        </div>

        <div>
          {(sharingOption)}
        </div>
      
        <div>
        <IconButton
        onClick={toggleLike} 
        style={{color:likedSublet?"red":"#313131"}}
        >
        <FavoriteIcon  />
        </IconButton>
        </div>

        </div>

      </CardContent>
      </Grid>
      
    
      </Grid>
     </Card>

     }

  </>
  )
}
