import React,{ useState,useEffect,useContext } from 'react'
import { Grid, Slider } from '@material-ui/core';
import SubItem from '../Components/SubItem'
import { FaShekelSign } from 'react-icons/fa'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import FiltersPopup from '../Components/FiltersPopup';
import axios from 'axios';
import { UserContext } from '../UserContext';


export default function SubletsPage({sublets,handlePriceChange,price,handleDaysChange, days, handleDates,dates}) {


  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 100,
      label: '100',
    },
    {
      value: 200,
      label: '200',
    },
    {
      value: 300,
      label: '300',
    },
    {
      value: 400,
      label: '400',
    },
    {
      value: 500,
      label:<FaShekelSign><h1>750</h1></FaShekelSign>,
    }
  
  ];

const [alreadyLikedSublets,SetAlreadyLikedSublets]= useState([])
const [facebookUserDetails,setFacebookUserDetails]=useContext(UserContext)

  

    useEffect(()=> {
    const fetchData= async()=>{
    
    const result = await axios.get(`/users/getUser/${facebookUserDetails.id}`)
    
    SetAlreadyLikedSublets(result.data[0].likedSublets)
    };

    fetchData();
    
    },[facebookUserDetails]);  


    

  return (
    <>
    <div>
    <FiltersPopup
    handleDaysChange={handleDaysChange}
    days={days}
    />
    </div>

  <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around" style={{direction:"rtl"}}>
        <KeyboardDatePicker style={{width:"30%"}}
          disableToolbar
          name="startDate"
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="כניסה"
          value={dates.min}
          onChange={(date)=>handleDates('startDate',date)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />

        <KeyboardDatePicker style={{width:"30%"}}
        
          disableToolbar
          name="endDate"
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="יציאה"
          value={dates.max}
          onChange={(date)=>handleDates('endDate',date)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>

    <Grid container>

        {sublets.map((sub)=>(
        <SubItem 
        key={sub._id}
        sublet = {sub}
        alLikedSublets={alreadyLikedSublets}
        
         />
        ))}

       
        <Grid item >
        <Slider style={{ 
        position:"fixed", bottom:0, 
        right:10, top:120, height:'70vh'}}
        orientation="vertical"
        min={0}
        max={500}
        defaultValue={[price.min,price.max]}
        aria-labelledby="vertical-slider"
        onChangeCommitted={(event,value)=>handlePriceChange(event,value)}
        marks={marks}
        valueLabelDisplay="on"
        track="normal"
        />
        </Grid>
        </Grid>
       
    </>
  )
}