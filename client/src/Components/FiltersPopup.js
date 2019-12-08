import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import { FaSlidersH } from 'react-icons/fa';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


import Slider from '@material-ui/core/Slider';



export default function FiltersPopup({handleDaysChange,days}) {
  
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
    <Modal.Header>מסננים</Modal.Header> 
    <Modal.Content>
    <Grid container spacing={3}>
      <Grid item xs={12}>
      <Typography id="range-slider" gutterBottom>
        Days
      </Typography>
      <div>
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
        </div>
      </Grid>
    </Grid>

    </Modal.Content>       
  </Modal >
    </div>
  )
}
