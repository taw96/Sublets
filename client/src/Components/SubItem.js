
import React,{ useState, useContext,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {Card, CardMedia, CardHeader,CardContent, IconButton, CardActions, Collapse, Typography, Avatar,Button} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom'
import formatDate from '../utills/formatDate'
import {UserContext} from '../UserContext';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {WhatsappShareButton, FacebookShareButton} from 'react-share'
import {FacebookIcon, WhatsappIcon} from 'react-share'
import MoreVertIcon from '@material-ui/icons/MoreVert';



const useStyles = makeStyles(theme => ({

  card: {
    width:'300px',
    maxHeight:'100vh',
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
    borderRadius: '15px'

  }
}))


export default function SubItem({sublet,alLikedSublets}) {

  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);

  };


  const [facebookUserDetails] = useContext(UserContext)

  const [index,setIndex] = useState(0)
  
 
  let initialBoolean = alLikedSublets.includes(sublet._id)

  let [likedSublet, SetLikedSublet]=useState(initialBoolean)
  
  // console.log("initial boolean: "  + initialBoolean)
  // console.log("is liked? " + likedSublet)

    
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

  const url = `https://sublets12.herokuapp.com/sublet/${sublet._id}`

const printIt= ()=>{
  if(navigator.share){
    navigator.share({
      title:'WebShare API Demo',
      url: url
    }).then(()=>{
      console.log('Thanks for sharing!');
    }).catch(console.error)
  } else {
    console.log("It doesn't work!")
  }

}
  return (


    <div 
    >
    <Card className={classes.card} style={{marginTop:"40px"}}>
     

      <CardHeader  className={classes.cardHeader} 

       
        title= {
          // <span>
        /* <Button style={{position:'relative',left:'170px'}} onClick={printIt}>
        <MoreVertIcon/>
        </Button> */

        <Link to={`/sublet/${sublet._id}`}>
        <div style={{direction:'rtl',position:'relative', right:'20px'}}>
       
          {`הדירה של ${sublet.userName} `}
          {<h5>{formatDate(sublet.dateOut)} - {formatDate(sublet.dateIn)}</h5>}

        </div>
        </Link>
      //  </span>

        }
         avatar={ 
        
        <Link to={`/sublet/${sublet._id}`}> 
          <Avatar aria-label="recipe" className={classes.avatar}>
            <img alt="imagealt" src={sublet.profilePicture} />
          </Avatar>
        </Link>

        }
        />

            <Carousel 
             showThumbs={false}
             showStatus={false}
             infiniteLoop={false}              
             >
              {(sublet.mediaUrl).map((item)=>(
              
              <img src={item} height='170' width="250"/>

              ))}
          
            </Carousel>
       <Link to={`/sublet/${sublet._id}`}> 

        <CardContent style={{direction:'rtl'}}>
        <Typography variant="body2" color="textSecondary" component="p">
        {sublet.address}
        </Typography>
         <Typography variant="body1" color="textPrimary" component="p">
        מחיר ללילה:  {sublet.costPerNight} ₪
        </Typography>
         <Typography variant="body1" color="textPrimary" component="p">
        מחיר לתקופה:  {sublet.cost} ₪
        </Typography>
         <Typography variant="body1" color="textPrimary" component="p">
        קומה: {sublet.floorLevel}
        </Typography>
        <Typography variant="body1" color="textPrimary" component="p">
        מעלית: {sublet.elevator ? "יש" : "אין"}
        </Typography>
       
       
        </CardContent>
      </Link> 

        <CardActions disableSpacing>
        <IconButton
        onClick={toggleLike} 
        style={{color:likedSublet?"red":"#313131"}}
        >
        <FavoriteIcon  />
        </IconButton>

        {/* <WhatsappShareButton style={{position:'relative', bottom:'-3px'}} */}
        
        <Button onClick={printIt}>
        {/* url={url} */}
        {/* title={`${sublet.description}`}> */}
        <ShareIcon/>
        </Button>
       
        {/* </WhatsappShareButton> */}

        {/* <FacebookShareButton
        url={url}
        title={`${sublet.description}`}>
        <FacebookIcon
        size={26}
          round/>
        </FacebookShareButton> */}


        <IconButton
          className={clsx(classes.expand, {
          [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          >
          <ExpandMoreIcon />
         </IconButton >

         </CardActions>
         <Collapse in={expanded} timeout="auto"  unmountOnExit>

         <CardContent 
         style={{direction:'rtl'}}
         >
          <Typography paragraph>
            <header>
              <h3>פרטים נוספים:</h3>
            </header>
          {sublet.details}
          
            <h4>ליצירת קשר:</h4>
            {sublet.phone}
          </Typography>
        </CardContent>

      </Collapse>

    </Card>
    </div>
  );
}
