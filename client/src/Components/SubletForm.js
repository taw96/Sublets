import PlaceAutoComplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import React, { useReducer, useState, useContext } from 'react'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import { MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import axios from 'axios';
import { Form, Message, Input, TextArea, Image, Header, Icon, Button } from 'semantic-ui-react'
import {UserContext} from '../UserContext'

export default function SubletForm() {

  //state declaration of sublet upload and success

  const [success, setSuccess]= useState(false)
  const [loading, setLoading] = useState(false)

  //state declaration of Dates 

  const [selectedDateIn, setSelectedDateIn] = useState(null);

  const [selectedDateOut, setSelectedDateOut] = useState(null);

  const [days, setDays] = useState(null)

  const [costPerNight, setCostPerNight]= useState(null)



  const handleDateChangeIn = selectedDateIn => {
  setSelectedDateIn(selectedDateIn);
  };

  const handleDateChangeOut = (selectedDateOut) => {
  setSelectedDateOut(selectedDateOut);

  setDays(Math.ceil((selectedDateOut-selectedDateIn)/86400000))
  
  setCostPerNight(Math.ceil((values.cost)/( (selectedDateOut-selectedDateIn)/86400000)))
  };

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

  //decalaring initial state of most of the values

const INITIAL_VALUES = {
      description:"",
      floorLevel: "" ,
      rooms:"",
      availableBedrooms:"",
      roomatesLeft:"",
      cost:0,
      details: "",
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
      console.log(values)
    }
 

    //submiting the sublet by using the current state values


    async function handleSubmit(){
    setLoading(true)
    const mediaUrl = await handleImageUpload()
    const response = await axios.post('/sublets/add',{userName,userID,profilePicture,address: address,...values,selectedDateIn,selectedDateOut,...coordinate,days,costPerNight,mediaUrl})
    console.log({response})
    setLoading(false)
    setValues(INITIAL_VALUES)
    setSuccess(true)
  }

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
  let response = await axios.post('https://api.cloudinary.com/v1_1/tomeramit/image/upload'
  ,data)
  let mediaUrl = response.data.url
  imageArr.push(mediaUrl)
  }
 return imageArr;
  
}

  return (

      
      <div style={{direction:"rtl"}}>
      <Header as="h2" block>
        <Icon name="add" color="orange" />
        צור סאבלט חדש
      </Header>
      

      <Form loading={loading} success={success} onSubmit={handleSubmit}>
        <Message
        success
        icon="check"
        header="יאסו!"
        content="הסאבלט נוסף בהצלחה!!"
        />

    

    <Form.Field 
      control={Input}
      icon="image"
      name="media"
      type="file"
      multiple
      label="תמונות (שיהיו רוחביות בבקשה)"
      content="תעלו תמונות רוחביות בבקשה"
      onChange={handleImageChange}
      />

    <Image.Group size={"small"} >
    {(imagesPreview.media).map((url)=>(
    <Image key={`${url}`} src={url} rounded centered/>
    ))}

    </Image.Group>

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
      <Form.Field

      control ={Input}
      type="text" 
      name="description"  
      placeholder="תיאור"  
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
    placeholder="כמה חדרים בדירה?"  
    value={values.rooms} 
    onChange= {handleChange}
    />

    
    <br/>

    <Form.Field
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
    placeholder="כמה עולה?"  
    value={values.cost} 
    onChange= {handleChange}
    />

    <br/> 
    
    <Form.Field
    control ={Input}
    icon="phone volume"
    type="text" 
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
    חנייה?
    </div>

    <br/>

    <div>
    <input
    type="checkbox"
    name="elevator" 
    value={values.elevator} 
    onChange={handleChange}
    />
    מעלית?
    </div>

    <br/>

    <div>
    <input
    type="checkbox"
    name="airCon" 
    value={values.airCon} 
    onChange={handleChange}
    />
    מזגן?
    </div>
    

    <br/>

    <div>
    <input
    type="checkbox"
    name="balcony" 
    value={values.balcony} 
    onChange={handleChange}
    />
    מרפסת?
    </div>
    
    <br/>

    <div>
    <input
    type="checkbox"
    name="washMachine" 
    value={values.washMachine} 
    onChange={handleChange}
    />
    מכונת כביסה?
    </div>
    
     <br/>

    <div>
    <input
    type="checkbox"
    name="wifi" 
    value={values.wifi} 
    onChange={handleChange}
    />
    wifi?
    </div>

    <br/>

    <div>
    <input
    type="checkbox"
    name="tv" 
    value={values.tv} 
    onChange={handleChange}
    />
    טלווזיה?
    </div>

    <br/>

    <div>
    <input
    type="checkbox"
    name="streamer" 
    value={values.streamer} 
    onChange={handleChange}
    />
    נטפליקס?
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

    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
    
       
        
        

        <KeyboardDatePicker style={{width:'30%'}}
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

        <KeyboardDatePicker style={{width:'30%'}}
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

