
import React,{ useState } from 'react';
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
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Gallery, GalleryImage } from 'react-gesture-gallery'
import { Link } from 'react-router-dom'
import formatDate from '../utills/formatDate'



const useStyles = makeStyles(theme => ({

  card: {
    maxWidth:'250px',
    maxHeight:'95vh'
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
    backgroundColor: red[500],
  },
}));

export default function SubItem({sublet}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  
  const [index,setIndex] = useState(0)

  return (


    <div 
    style={{textAlign:"right",marginLeft:'50px'}}
    >
    <Card className={classes.card} style={{marginTop:"40px"}}>
      
      
      <Link to={`/sublet/${sublet._id}`}> 
      <CardHeader
       
        action={
        <IconButton aria-label="settings">
        <MoreVertIcon />
        </IconButton>
        }

        title={sublet.description}
        subheader= {<h5>{formatDate(sublet.dateIn)} - {formatDate(sublet.dateOut)}</h5>}
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

        <Typography variant="body2" color="textSecondary" component="p">{sublet.address}</Typography>
        מחיר ללילה: {sublet.costPerNight}
        </CardContent>

        <CardActions disableSpacing>
        <IconButton 
        aria-label="add to favorites"
        >
        <FavoriteIcon  />
        </IconButton>
        <IconButton aria-label="share">
        <ShareIcon />
        </IconButton>
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
