
import React,{ useState, useContext,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Avatar from '@material-ui/core/Avatar';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Gallery, GalleryImage } from 'react-gesture-gallery'
import { Link } from 'react-router-dom'
import formatDate from '../utills/formatDate'
import {UserContext} from '../UserContext';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {WhatsappShareButton, FacebookShareButton} from 'react-share'
import {FacebookIcon, WhatsappIcon} from 'react-share'



const useStyles = makeStyles(theme => ({

  card: {
    width:'250px',
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

  return (


    <div 
    >
    <Card className={classes.card} style={{marginTop:"40px"}}>
      
      <Link to={`/sublet/${sublet._id}`}> 

      <CardHeader  className={classes.cardHeader} 

        title= {
        <div style={{direction:'rtl'}}>
          {`הדירה של ${sublet.userName}`}
          {<h5>{formatDate(sublet.dateOut)} - {formatDate(sublet.dateIn)}</h5>}

        </div>
        }
         avatar={ 
          <Avatar aria-label="recipe" className={classes.avatar}>
            <img alt="imagealt" src={sublet.profilePicture} />
          </Avatar>
        }
        />
        </Link>

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
        <WhatsappShareButton
        url={url}
        title={`${sublet.description}`}>
        <WhatsappIcon
          size={26}
          round/>
        </WhatsappShareButton>
        <FacebookShareButton
        url={url}
        title={`${sublet.description}`}>
        <FacebookIcon
        size={26}
          round/>
        </FacebookShareButton>
        {/* <IconButton aria-label="share">
        <ShareIcon />
        </IconButton> */}
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
