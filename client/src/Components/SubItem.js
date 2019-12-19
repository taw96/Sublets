
import React,{ useState, useContext,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
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


  return (


    <div 

    style={{textAlign:"right",marginLeft:'50px'}}
    >
    <Card className={classes.card} style={{marginTop:"40px"}}>
      
      
      <Link to={`/sublet/${sublet._id}`}> 
      <CardHeader 
        title= {`${sublet.userName}'s place`}
         
        
        subheader= {<h5>{formatDate(sublet.dateIn)} - {formatDate(sublet.dateOut)}</h5>}
         avatar={ 
          <Avatar aria-label="recipe" className={classes.avatar}>
            <img alt="imagealt" src={sublet.profilePicture} />
          </Avatar>
        }
        />
      </Link> 

          
        <Gallery
          
          index={index}
          onRequestChange = {i=>{
          setIndex(i)
          }} 
          
          >
        {sublet.mediaUrl.map(elem => (
          
        <GalleryImage objectFit="contain" key={elem} src={elem}/>
            
        ))} 

        </Gallery>


        <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        {sublet.address}
        </Typography>
         <Typography variant="body1" color="textPrimary" component="p">
        מחיר ללילה: {sublet.costPerNight}
        </Typography>
         <Typography variant="body1" color="textPrimary" component="p">
        קומה: {sublet.floorLevel}
        </Typography>
        <Typography variant="body1" color="textPrimary" component="p">
        מעלית: {sublet.elevator ? "יש" : "אין"}
        </Typography>
       
       
        </CardContent>

        <CardActions disableSpacing>
        <IconButton
        onClick={toggleLike} 
        style={{color:likedSublet?"red":"#313131"}}
        >
        <FavoriteIcon  />
        </IconButton>
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

         <CardContent>
          <Typography paragraph>
            <header>
              <h3>:פרטים נוספים</h3>
            </header>
          {sublet.details}
          
            <h4>:ליצירת קשר</h4>
            {sublet.phone}
          </Typography>
        </CardContent>

      </Collapse>
    </Card>
    </div>
  );
}
