import React from 'react'
import { Grid, Slider } from '@material-ui/core';
import SubItem from '../Components/SubItem'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import FiltersPopup from '../Components/FiltersPopup';
// import { UserContext } from '../UserContext';


export default function SubletsPage({sublets,alreadyLikedSublets,handlePriceChange,price,handleDaysChange, days, handleDates,dates,handleFloorChange,floorAsked,handleOtherParams,otherParams}) {
  
  
  // const [facebookUserDetails,setFacebookUserDetails]=useContext(UserContext)


  return (
    <div style={{paddingTop:'10px'}}>
    <FiltersPopup
    price={price}
    handlePriceChange={handlePriceChange}
    handleDaysChange={handleDaysChange}
    days={days}
    handleFloorChange={handleFloorChange}
    floorAsked={floorAsked}
    handleOtherParams={handleOtherParams}
    otherParams={otherParams}
    />

  <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-evenly" style={{direction:"rtl"}}>
        <KeyboardDatePicker style={{width:"35%"}}
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

        <KeyboardDatePicker style={{width:"35%"}}
        
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

    <Grid container justify={"space-evenly"}  >
        {sublets.map((sub)=>(
        <SubItem 
        key={sub._id}
        sublet = {sub}
        alLikedSublets={alreadyLikedSublets}
         />
        ))}
      

        </Grid>
       
    </div>
  )
}
