import PlaceAutoComplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import React, { useReducer, useState, useContext } from 'react'
import 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import { MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import axios from 'axios';
import { Form, Message, Input, TextArea, Image, Header, Icon, Button } from 'semantic-ui-react'
import {UserContext} from '../UserContext'
import {useDropzone} from 'react-dropzone'
import {IconButton, GridList, GridListTile} from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { useMediaQuery } from 'react-responsive'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    // overflow: 'hidden',
    // backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },

}));

export default function SubletForm() {

    const classes = useStyles();

     //decalaring initial state of most of the values

const INITIAL_VALUES = {
      description:"",
      floorLevel: "" ,
      rooms:"",
      availableBedrooms:"",
      roomatesLeft:"",
      cost:0,
      details:"",
      phone:"",
      parking:false,
      elevator: false ,
      airCon:false ,
      balcony:false,
      washMachine:false,
      wifi:false,
      tv:false,
      streamer:false,

    }

  const [values, setValues] = useReducer((state, newState) => ({...state,...newState}),INITIAL_VALUES
    );


  //state declaration of sublet upload and success

  const [success, setSuccess]= useState(false)
  const [loading, setLoading] = useState(false)

  //state declaration of Dates 

  const [selectedDateIn, setSelectedDateIn] = useState(null);

  const [selectedDateOut, setSelectedDateOut] = useState(null);

  const [days, setDays] = useState(null)

  const [cost, setCost] = useState(0)

  const [costPerNight, setCostPerNight]= useState(0)

  const handleCost=(e)=>{
    setCost(e.target.value)
  setCostPerNight(Math.ceil(e.target.value/days))

  }

  const handleDateChangeIn = selectedDateIn => {
  setSelectedDateIn(selectedDateIn);
  setDays(Math.ceil((selectedDateOut-selectedDateIn)/86400000))
  setCostPerNight(Math.ceil(cost/Math.ceil((selectedDateOut-selectedDateIn)/86400000)))

  };

  const handleDateChangeOut = (selectedDateOut) => {
  setSelectedDateOut(selectedDateOut);

  setDays(Math.ceil((selectedDateOut-selectedDateIn)/86400000))
  setCostPerNight(Math.ceil(cost/Math.ceil((selectedDateOut-selectedDateIn)/86400000)))

  };

  // console.log(cost)
  // console.log(days)

  // console.log(costPerNight)



  //state declaration of address and coordinates
 
  const [address,setAddress] = useState("")
  const [coordinate,setCoordinate]= useState({
    lat:null,
    lng:null
  })

  //handling google places input
      
    const handleSelect = async (value)=>{
      const results = await geocodeByAddress(value);
      const latlng = await getLatLng(results[0])
      setAddress(value)
      setCoordinate(latlng)
}

 

    //declare currnet user STATE

    const [facebookUserDetails]=useContext(UserContext)

    const userName = facebookUserDetails.name;
    const userID = facebookUserDetails.id;
    const profilePicture = facebookUserDetails.fbProfilePic;


    //handling most of the inputs 

    const handleChange = (e) => {
      const target=e.target;      
      const name = target.name;
      const newValue=
      target.type === "checkbox" ? target.checked : target.value;

      setValues({[name]:newValue})

      // console.log(values)
    }
 
    //submiting the sublet by using the current state values


    async function handleSubmit(){
    setLoading(true)
    const mediaUrl = await handleImageUpload()
    const response = await axios.post('/sublets/add',{userName,userID,profilePicture,address: address,...values,selectedDateIn,selectedDateOut,...coordinate,days,cost,costPerNight,mediaUrl})
    // console.log({response})
    setLoading(false)
    setValues(INITIAL_VALUES)
    setSuccess(true)
  }

  

  const isDesktopOrLaptop = useMediaQuery({minWidth:1224})
  
  const isTabletOrMobileDevice = useMediaQuery({maxWidth:1224})
  
  const [images, setImages] = useState([null])

  const [imagesPreview, setImagesPreview] =useState({media:[null]})

  let fileObj = [];
  let fileArray=[];

  const handleImageChange = (e)=>{
    e.preventDefault()
    setImages(e.target.files)

   
    fileObj.push(e.target.files)
    for(let i=0; i< fileObj[0].length;i++){
      fileArray.push(URL.createObjectURL(fileObj[0][i]))

    }
    setImagesPreview({media:fileArray})
    }
  
  let imageArr=[];
  async function handleImageUpload(){
  for(let i=0;i<=images.length-1;i++){
  let data = new FormData()
  data.append('file',(images[i]))
  data.append('upload_preset','sublets' )
  data.append('cloud_name','tomeramit')
  let response = await axios.post('https://api.cloudinary.com/v1_1/tomeramit/image/upload',data)
  let mediaUrl = response.data.url
  imageArr.push(mediaUrl)
  }
 return imageArr;
  
}

  return (

      <div style={{paddingTop:'15px',direction:"rtl"}}>
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        צור סאבלט חדש
      </Header>
      
 <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
    
       
        
        
        
        <KeyboardDatePicker style={{width:'30%',direction:'ltr'}}
          margin="normal"
          id="date-picker-dialog"
          name= "dateIn"
          label  ="תאריך כניסה" 
          format="dd/MM/yy"
          value={selectedDateIn}
          onChange={handleDateChangeIn}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      

        <h2>עד-</h2>

        <KeyboardDatePicker style={{width:'30%',direction:"ltr"}}
          margin="normal"
          id="date-picker-dialog"
          name= "dateOut"
          label="תאריך יציאה"
          format="dd/MM/yy"
          value={selectedDateOut}
          onChange={handleDateChangeOut}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />

      
      </Grid>
    </MuiPickersUtilsProvider>
      <Form loading={loading} success={success} onSubmit={handleSubmit}>
        <Message
        success
        icon="check"
        header="יאסו!"
        content="הסאבלט נוסף בהצלחה!!"
        />
     

      <br/>

      <PlaceAutoComplete 
      value={address}
      onChange={setAddress} 
      onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) =>( 
           <div>
             <input
              {...getInputProps({placeholder:'מה הכתובת?'})} 
              />

             <div>
               {loading ? <div>...loading</div> : null}

              {suggestions.map((suggestions,)=> {
                const style ={
                  backgroundColor: suggestions.active ? "#614ad3" : "white"
                };
                return (
                <div {...getSuggestionItemProps(suggestions,{style})}>
                {suggestions.description}
                </div>
                )
              })}
             </div>

           </div>
      )}
      </PlaceAutoComplete>
      
      
      <br/>
      <Form.Group widths ='equal' >
      <Form.Field required

      control ={Input}
      type="text" 
      maxLength="20"
      name="description"  
      placeholder="כותרת"  
      value={values.description} 
      onChange= {handleChange}
      />


    <br/>

    <Form.Field
    icon="building"
    control ={Input}
    type="number" 
    name="floorLevel"  
    placeholder="קומה"  
    value={values.floorLevel} 
    onChange= {handleChange}
    />


    <br/>

    <Form.Field
    control ={Input}
    type="number" 
    className="input" 
    name="rooms" 
    placeholder="מספר חדרים "  
    value={values.rooms} 
    onChange= {handleChange}
    />

    
    <br/>

    <Form.Field required
    control ={Input}
    type="number" 
    className="input" 
    name="availableBedrooms" 
    placeholder="כמה חדרי שינה פנויים?" 
    value={values.availableBedrooms}
    onChange= {handleChange}
    />


    <br/>

    <Form.Field 
    icon="users"
    control ={Input}
    type="number" 
    className="input" 
    name="roomatesLeft" 
    placeholder="כמה שותפים נשארים?"  
    value={values.roomatesLeft} 
    onChange= {handleChange}
    />
    </Form.Group>
    <br/>

    <Form.Group widths="equal" >

    <Form.Field 
    control ={Input}
    icon="shekel sign"
    type="number" 
    className="input" 
    name="cost" 
    placeholder="מחיר לתקופה"  
    value={cost} 
    onChange= {handleCost}
    />

    <br/> 
    
    <Form.Field required
    control ={Input}
    icon="phone volume"
    type="number" 
    className="input" 
    name="phone" 
    placeholder="טלפון" 
    value={values.phone} 
    onChange= {handleChange}
    />
   </Form.Group>

    <br/>

  <div>
  
    <div>
    <input
    type="checkbox"
    name="parking" 
    value={values.parking} 
    onChange={handleChange}
    />
    חנייה
    </div>

    <br/>

    <div>
    <input
    type="checkbox"
    name="elevator" 
    value={values.elevator} 
    onChange={handleChange}
    />
    מעלית
    </div>

    <br/>

    <div>
    <input
    type="checkbox"
    name="airCon" 
    value={values.airCon} 
    onChange={handleChange}
    />
    מזגן
    </div>
    

    <br/>

    <div>
    <input
    type="checkbox"
    name="balcony" 
    value={values.balcony} 
    onChange={handleChange}
    />
    מרפסת
    </div>
    
    <br/>

    <div>
    <input
    type="checkbox"
    name="washMachine" 
    value={values.washMachine} 
    onChange={handleChange}
    />
    מכונת כביסה
    </div>
    
     <br/>

    <div>
    <input
    type="checkbox"
    name="wifi" 
    value={values.wifi} 
    onChange={handleChange}
    />
    wifi
    </div>

    <br/>

    <div>
    <input
    type="checkbox"
    name="tv" 
    value={values.tv} 
    onChange={handleChange}
    />
    טלווזיה
    </div>

    <br/>

    <div>
    <input
    type="checkbox"
    name="streamer" 
    value={values.streamer} 
    onChange={handleChange}
    />
    נטפליקס
    </div>
      
  </div>

    <br/>

    <Form.Field
    control ={TextArea}
    className="input" 
    name="details" 
    placeholder="פרטים נוספים?" 
    value={values.details} 
    onChange= {handleChange}
    />

    <br/>
 
    </Form>
  <div>
 <div style={{display:'flex',flex:'1',justifyContent:'center', position:'relative'}}>
 <input accept="image/*"
   style={{display:'none'}} 
   id="icon-button-file"
   name="media"
   type="file" 
   multiple
   onChange={handleImageChange}
   />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
    </div>

    <div 
    className={classes.root}
    >
    {isDesktopOrLaptop &&
      <GridList 
      className={classes.gridList} cols={4}
      > 
        {(imagesPreview.media).map(url => (
          // <GridListTile key={url} >
            <img src={url} alt={url}/>
          /* </GridListTile> */
          ))}
         </GridList>}
    {isTabletOrMobileDevice && 
    <GridList 
      className={classes.gridList} cols={2}
      > 
        {(imagesPreview.media).map(url => (
          // <GridListTile key={url} >
            <img src={url} alt={url}/>
          /* </GridListTile> */
          ))}
         </GridList>}
    
         </div>
          
    </div>
    

    
   <br/>

   <Button.Group >
    <div  style={{direction:"ltr",marginBottom:'20px', marginRight:'20px'}}>
    <Button positive 
    color="blue"
    content=" שלח"
    icon="pencil alternate"
    type="submit"
    onClick={handleSubmit}
    />
    </div>

    </Button.Group> 

    </div>


  );

}

