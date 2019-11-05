import React, { useReducer, useState } from 'react'
import PlaceAutoComplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import { MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import axios from 'axios';


export default function SubletForm() {

  //state declaration of Dates 

  const [selectedDateIn, setSelectedDateIn] = useState(null);

  const handleDateChangeIn = selectedDateIn => {
  setSelectedDateIn(selectedDateIn);
  };

  const [selectedDateOut, setSelectedDateOut] = useState(null);

  const handleDateChangeOut = (selectedDateOut) => {
  setSelectedDateOut(selectedDateOut);
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


  const [values, setValues] = useReducer((state, newState) => ({...state,...newState}),
    {
      
      floorLevel: "" ,
      rooms:"",
      rommatesLeft: "",
      cost:"",
      details: "",
      phone:"",
      elevator: false ,
      airCon:false ,
      balcony:false,
      washMachine:false,
      wifi:false,
      tv:false,
      streamer:false,

    });


    
    //handling most of the inputs 

    const handleSubmit = (e) => {
      const target=e.target;
      const newValue= target.type === "checkbox" ? target.checked : target.value;
      const name= target.name;

      setValues({[name]:newValue})
    }

    //submiting the sublet by using the current state values
    const addIt=() =>{
    axios.post('http://localhost:5000/sublets/add',{address: address,...values,selectedDateIn,selectedDateOut,...coordinate} )
    .then(res =>console.log(res.data))}
      

    function handleImageUpload(){
      const data = new FormData()
      data.append('file',product.media)
      data.append('upload_preset', 'sublets')
      data.append('cloud_name','dumiuaujo')

    }


 



  return (
    <div
    style={{textAlign:"right",marginRight: '20px', direction:"rtl" }}
    >

    <br/>

    <div>
    <input 
    type="file" 
    id='inputGroupFile01'
    >
    </input>

    <button 
    onClick = {uploadHandler}
    
    >Upload!</button>

    </div>

    <br/>

    <div>
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
        
    </div>
        
    <br/>

    <div >
    <input 
    type="text" 
    className="input" 
    name="floorLevel"  
    placeholder="קומה"  
    value={values.floorLevel} 
    onChange= {handleSubmit}>
    </input>
    </div>

    <br/>

    <div>
    <input 
    type="text" 
    className="input" 
    name="rooms" 
    placeholder="כמה חדרים?"  
    value={values.rooms} 
    onChange= {handleSubmit}>
    </input>
    </div>

    <br/>

    <div>
    <input 
    type="text" 
    className="input" 
    name="roomatesLeft" 
    placeholder="כמה שותפים נשארים?"  
    value={values.roomatesLeft} 
    onChange= {handleSubmit}>
    </input>
    </div>

    <br/>

    <div>
    <input 
    type="text" 
    className="input" 
    name="cost" 
    placeholder="כמה עולה?"  
    value={values.cost} 
    onChange= {handleSubmit}>
    </input>
    </div>

    <br/>

    <div>
    <input 
    type="text" 
    className="input" 
    name="details" 
    placeholder="פרטים נוספים?" 
    value={values.details} 
    onChange= {handleSubmit}>
    </input>
    </div>

    <br/>
      
    <div>
    <input 
    type="text" 
    className="input" 
    name="phone" 
    placeholder="טלפון" 
    value={values.phone} 
    onChange= {handleSubmit}>
    </input>
    </div>

    <br/>

    <div>
    <input 
    type="checkbox" 
    className="input" 
    name="elevator"  
    title="e" 
    value={values.elevator} 
    onChange= {handleSubmit}/>מעלית יש?
    </div>

    <br/>

    <div>
    <input 
    type="checkbox" 
    className="input" 
    name="airCon" 
    value={values.airCon} 
    onChange= {handleSubmit}>
    </input>מזגן?
    </div>

    <br/>

    <div>
    <input 
    type="checkbox"
    className="input" 
    name="balcony" 
    value={values.balcony} 
    onChange= {handleSubmit}>
    </input>גזוזטרה?
    </div>

    <br/>

    <div>
    <input 
    type="checkbox"
    className="input" 
    name="washMachine" 
    value={values.washMachine} 
    onChange= {handleSubmit}>
    </input>מכונת כביסה?
    </div>

    <br/>

    <div>
    <input 
    type="checkbox"
    className="input" 
    name="wifi" 
    value={values.wifi} 
    onChange= {handleSubmit}>
    </input>WiFI?
    </div>

    <br/>

    <div>
    <input 
    type="checkbox"
    className="input" 
    name="tv" 
    value={values.tv} 
    onChange= {handleSubmit}>
    </input>טלוויזיה?
    </div>

    <br/>

    <div>
    <input 
    type="checkbox"
    className="input" 
    name="streamer" 
    value={values.streamer} 
    onChange= {handleSubmit}>
    </input>נטפליקס/ממיר יש?
    </div>

    <br/>
    

    <div >

    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
      
        <KeyboardDatePicker
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


       <KeyboardDatePicker
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

    </div>
    
        <br/>

    <div>
    <input 
    type="submit" 
    onClick={addIt}></input>
    </div>

  </div>

  )

}

