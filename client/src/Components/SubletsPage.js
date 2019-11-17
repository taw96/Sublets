import React from 'react'
import { Grid, Slider } from '@material-ui/core';
import SubItem from './SubItem'
import { FaShekelSign } from 'react-icons/fa'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import FiltersPopup from './FiltersPopup'

export default function SubletsPage({sublets,handlePriceChange,price,handleDaysChange, days, handleDateIn,handleDateOut,showIn,showOut}) {

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
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="כניסה"
          // value={showIn}
          // onChange={handleDateIn}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />

        <KeyboardDatePicker
        
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="יציאה"
          // value={showOut}
          // onChange={handleDateOut}
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
         />
        ))}

       
        <Grid item >
        <Slider style={{ 
        position:"fixed", bottom:0, 
        right:10, top:100, height:'70vh'}}
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
