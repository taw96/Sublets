import React,{ useState , useContext } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import {Link} from 'react-router-dom';
import FacebookLogin from 'react-facebook-login'
import axios from 'axios';
import {UserContext} from '../../UserContext';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  facebook:{
    border: 'none',
          backgroundColor: 'inherit',
          color: 'white',
          padding: '15px',
          textAlign: 'center',
          display: 'inline-block',
          fontSize: '16px'
  }
}));

export default function Header() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  const [facebookUserDetails,setFacebookUserDetails] = useContext(UserContext)


    async function handleError(data){
     
       setFacebookUserDetails({
        isLoggedIn:false,
        name:"",
        id:"",
        fbProfilePic:"",
        likedSublets:[]

      })

    }
   
   
   function handleLogout() {
        setFacebookUserDetails({
        isLoggedIn:false,
        name:"",
        id:"",
        fbProfilePic:"",
        likedSublets:[]

      })
    }
    async function handleFacebookResponse(data){

        setFacebookUserDetails({
        isLoggedIn:true,
        name:data.name,
        id:data.id,
        email:data.email,
        fbProfilePic:data.picture.data.url,
        likedSublets:[]

      })
            console.log("logging in")


    }
    console.log(facebookUserDetails)

    if(facebookUserDetails.name===""){
      console.log("just a refresh!")
    
    } else {

      axios.post('/users/addUser',{...facebookUserDetails})
    }
    
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >

        <Toolbar>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Sublets
          </Typography>
          <span style={{position:"absolute", right:0,backgroundColor:"blue"}} >
          </span>
         
          <div style={{
            display:"flex",
            flex: '1',
            justifyContent:"flex-end",
            justify:"space-between"

            }}>
            
          <img style={{borderRadius:'15px'}} src={facebookUserDetails.fbProfilePic} alt=""></img>
          
          <FacebookLogin
            appId="411589506442437"
            isMobile={false}
            redirectUri={"https://sublets12.herokuapp.com"}
            fields="name,email,picture"
            callback = {facebookUserDetails.isLoggedIn? handleLogout : handleFacebookResponse}
            onFailure={handleError}

            textButton={facebookUserDetails.isLoggedIn ? "Logout" : "Login"}
            cssClass={classes.facebook}
            />

          </div>
          
        </Toolbar>

      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
        paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        
        <List>
            <ListItem onClick={handleDrawerClose}>
            <Link to="/about"><h3>About</h3></Link>
            </ListItem>

            {/* <ListItem >
              <Link to="/"><h3>Home</h3></Link>
            </ListItem> */}

            <ListItem onClick={handleDrawerClose} >
              <Link to="/"><h3>Map</h3></Link>
            </ListItem>

            <ListItem onClick={handleDrawerClose}>
              <Link to="/addsublet"><h3>Add Sublet</h3></Link>
            </ListItem>

            <ListItem onClick={handleDrawerClose}>
              <Link to="/sublets"><h3>Sublets</h3></Link>
            </ListItem>

            <ListItem onClick={handleDrawerClose}>
              <Link to="/savedSublets"><h3>Saved Sublets</h3></Link>
            </ListItem>

        </List>
      
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        {/* <div className={classes.drawerHeader} /> */}
    
      </main>
    </div>
  );
}
