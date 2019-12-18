import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import { FaSlidersH } from 'react-icons/fa';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {Divider, FormLabel, FormControlLabel, FormGroup, Grid, Slider, Select, Checkbox,FormControl } from '@material-ui/core';
import { FaShekelSign } from 'react-icons/fa'


export default function FiltersPopup({handlePriceChange,price,handleDaysChange,days,handleFloorChange,floorAsked,handleOtherParams,otherParams}) {
  
  
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
      label:<h5>
      <FaShekelSign/>
      <br/>
      ללילה
      </h5>
    }
  
  ];

  const daysMarks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 5,
      label: '5',
    },
    {
      value: 10,
      label: '10',
    },
    {
      value: 15,
      label: '15',
    },
    {
      value: 20,
      label: '20',
    },
    {
      value: 25,
      label: '25',
    },
    {
      value: 30,
      label: '30',
    },
    {
      value: 40,
      label: '40',
    },
    {
      value: 50,
      label: '50',
    },
    {
      value: 75,
      label: '75',
    },
    {
      value: 100,
      label: '100',
    },
  ];

  const useStyles = makeStyles({
    root: {
      width: 300,
    }
  });
  
    const classes = useStyles();

  return (
    <div>
      <Modal trigger={<Button><FaSlidersH size={20}/></Button>}>
    <Modal.Header>מסננים נוספים</Modal.Header> 
    <Modal.Content>
    <Grid container spacing={3}>

      <Grid item xs={12}>
      <Typography id="range-slider" gutterBottom>
      מחיר ללילה
      </Typography>

      <Slider 
      // style={{ 
        // position:"fixed", bottom:0, 
        // right:15, top:120, height:'70vh'}}
        orientation="horizontal"
        min={0}
        max={500}
        defaultValue={[price.min,400]}
        aria-labelledby="horizontal-slider"
        onChangeCommitted={(event,value)=>handlePriceChange(event,value)}
        marks={marks}
        valueLabelDisplay="on"
        track="normal"
        />
       </Grid>

      <Grid item xs={12}>
      <Typography id="range-slider" gutterBottom>
        ?כמה ימים
      </Typography>
      <Slider 
        orientation="horizontal"
        min={0}
        max={100}
        defaultValue={[days.min, days.max]}
        aria-labelledby="rangeg-slider"
        onChangeCommitted={(event,value)=>handleDaysChange(event,value)}
        marks={daysMarks}
        valueLabelDisplay="on"
        />
        
      </Grid>
      
       <Grid item xs={12}>
      <Typography id="range-slider" gutterBottom>
     ?קומה
      </Typography>
      <FormControl variant="outlined" className={classes.formControl}>
           <div style={{direction:'rtl'}}>

        <Select
          native
          value={floorAsked}
          onChange={(event,value)=>handleFloorChange(event,value)}
          inputProps={{
            id: 'outlined-age-native-simple',
          }}
        >
          <option>הכל</option>
          <option value={0}>רק קרקע</option>
          <option value={1}>ראשונה</option>
          <option value={2}>שנייה</option>
          <option value={3}>שלישית</option>
          <option value={4}>רביעית</option>


        </Select>
              </div>

      </FormControl>
      <Typography>
      ומטה
      </Typography>
      </Grid>

      <Grid container justify="space-evenly" spacing={0}>      
       <FormControl container component="fieldset">
      <FormLabel component="legend">:רק דירות עם</FormLabel>
      <Divider/>
      <FormGroup  aria-label="position" row >
        <FormControlLabel
          checked={otherParams.streamer}
          value="streamer"
          control={<Checkbox color="primary" />}
          label="נטפליקס"
          labelPlacement="bottom"
          onChange={handleOtherParams('streamer')} />

        <FormControlLabel
          checked={otherParams.tv}
          value="tv"
          control={<Checkbox color="primary"/>}
          label="טלוויזיה"
          labelPlacement="bottom"
          onChange={handleOtherParams('tv')}        

        />
        <FormControlLabel
          checked={otherParams.wifi}
          value="wifi"
          control={<Checkbox color="primary" />}
          label="wifi"
          labelPlacement="bottom"
         onChange={handleOtherParams('wifi')}        
         />

        <FormControlLabel
          checked={otherParams.washMachine}
          value="washMachine"
          control={<Checkbox color="primary" />}
          label="מכונת כביסה"
          labelPlacement="bottom"
          onChange={handleOtherParams('washMachine')}
        />
        <FormControlLabel
          checked={otherParams.balcony}
          value="balcony"
          control={<Checkbox color="primary" />}
          label="מרפסת"
          labelPlacement="bottom"
          onChange={handleOtherParams('balcony')}
        />
        <FormControlLabel
          checked={otherParams.airCon}
          value="airCon"
          control={<Checkbox color="primary" />}
          label="מזגן"
          labelPlacement="bottom"
          onChange={handleOtherParams('airCon')}
        />
         <FormControlLabel
          checked={otherParams.elevator}
          value="elevator"
          control={<Checkbox color="primary" />}
          label="מעלית"
          labelPlacement="bottom"
          onChange={handleOtherParams('elevator')}
        />
        <FormControlLabel
          checked={otherParams.parking}
          value="parking"
          control={<Checkbox color="primary" />}
          label="חנייה"
          labelPlacement="bottom"
          onChange={handleOtherParams('parking')}
        />
       </FormGroup>
     </FormControl>
      
      
      </Grid>
    </Grid>

    </Modal.Content>       
  </Modal >
    </div>
  )
}
