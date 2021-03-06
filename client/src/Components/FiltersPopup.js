import React,{useState} from 'react'
import { Button, Modal, Icon} from 'semantic-ui-react'
import { FaSlidersH } from 'react-icons/fa';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {Divider, FormLabel, FormControlLabel, FormGroup, Grid, Slider, Select, Checkbox,FormControl } from '@material-ui/core';
import { FaShekelSign } from 'react-icons/fa'
import { useMediaQuery } from 'react-responsive'
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';

export default function FiltersPopup({dates,handleDates,handlePriceChange,price,handleDaysChange,days,handleFloorChange,floorAsked,handleOtherParams,otherParams}) {
  
  
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
      label:'500'
    }
  
  ];

  const daysMarks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 7,
      label: 'שבוע',
    },
    {
      value: 30,
      label: 'חודש',
    },
    {
      value: 60,
      label: 'חודשיים',
    },
    {
      value: 90,
      label: "שלושה חודשים"
    },

  ];


  const useStyles = makeStyles({
    root: {
      width: 300,
    }
  });
  
    const classes = useStyles();
  const [state,setState] = useState({ modalOpen: false })

  const handleOpen = () => setState({ modalOpen: true })

  const handleClose = () => setState({ modalOpen: false })

   //responsive design

  const isDesktopOrLaptop = useMediaQuery({minWidth:600})
  
  const isTabletOrMobileDevice = useMediaQuery({maxWidth:600})

  // console.log(state)
  return (
    <div>
    <Modal 
    trigger={<Button onClick={handleOpen}><FaSlidersH size={20}/></Button> }
    open={state.modalOpen}
    size='Large'
    >
    <Modal.Header>מסננים נוספים</Modal.Header> 
    <Modal.Content scrolling image>
    <Grid container justify="center" spacing={2}>

      <Grid item xs={11} >
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-evenly" style={{direction:"rtl"}}>
        <KeyboardDatePicker style={{width:"45%"}}
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

        <KeyboardDatePicker style={{width:"45%"}}
        
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

      <Typography id="range-slider" gutterBottom>
      מחיר ב-₪ ללילה
      </Typography>
      <div style={{display:'block', marginTop:'20px'}}>
      <br/>
      </div>
      <Slider  
      style={{ 
        display:'flex',flex:'1',
        // justifyContent:'center',
        // width:'100vh'
        }}
        orientation="horizontal"
        min={0}
        max={500}
        defaultValue={[price.min,price.max]}
        aria-labelledby="horizontal-slider"
        onChangeCommitted={(event,value)=>handlePriceChange(event,value)}
        marks={marks}
        valueLabelDisplay="on"
        track="normal"
        />
       </Grid>

      <Grid  item xs={11}>
      <Typography id="range-slider" gutterBottom>
        ?כמה ימים
      </Typography>
      
      <div style={{display:'block', marginTop:'20px'}}>
      <br/>
      </div>
    
      <Slider 
        orientation="horizontal"
        min={0}
        max={90}
        defaultValue={[days.min, days.max]}
        aria-labelledby="rangeg-slider"
        onChangeCommitted={(event,value)=>handleDaysChange(event,value)}
        marks={daysMarks}
        valueLabelDisplay="on"
        mae
        />
        
        
      </Grid>
      
       <Grid item xs={12}>
      <Typography id="range-slider" gutterBottom>
     ?קומה
      </Typography>
      <FormControl variant="outlined" className={classes.formControl}>

        <Select style={{direction:'rtl'}}
          native
          value={floorAsked}
          onChange={(event,value)=>handleFloorChange(event,value)}
          inputProps={{
            id: 'outlined-age-native-simple',
          }}
        >
          <option >הכל</option>
          <option value={0}>רק קרקע</option>
          <option value={1}>ראשונה ומטה</option>
          <option value={2}>שנייה ומטה</option>
          <option value={3}>שלישית ומטה</option>
          <option value={4}>רביעית ומטה</option>


        </Select>

      </FormControl>

      </Grid>
        {isTabletOrMobileDevice && 
       <Grid container justify="center" style={{paddingTop:'20px'}} item xs={12} >
       <FormControl container component="fieldset">
      <FormLabel component="legend">:רק דירות עם</FormLabel>
      <Divider/>
      <FormGroup aria-label='position' row >
      
          <FormControlLabel
          checked={otherParams.washMachine}
          value="washMachine"
          control={<Checkbox color="primary" />}
          label="מכונת כביסה"
          labelPlacement="bottom"
          onChange={handleOtherParams('washMachine')}
        />
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

    
        </FormGroup>
        
        <FormGroup aria-label='position' row >

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
      } 
      {isDesktopOrLaptop && 
      <Grid container justify="center" style={{paddingTop:'20px'}} item xs={12} >
       <FormControl container component="fieldset">
      <FormLabel component="legend">:רק דירות עם</FormLabel>
      <Divider/>
      <FormGroup aria-label='position' row >
      
          <FormControlLabel
          checked={otherParams.washMachine}
          value="washMachine"
          control={<Checkbox color="primary" />}
          label="מכונת כביסה"
          labelPlacement="bottom"
          onChange={handleOtherParams('washMachine')}
        />
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
      
      
      </Grid>}
    

    <Modal.Actions>
          <Button style={{marginTop:'30px', marginBottom:'10px'}} color='green' onClick={handleClose} inverted>
           שמור<Icon name='checkmark' />  
          </Button>
    </Modal.Actions>  

  </Grid>

    </Modal.Content>   


  </Modal >
    </div>
  )
}
