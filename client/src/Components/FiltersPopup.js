import React from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import { FaSlidersH } from 'react-icons/fa';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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
    }
  ];

  const useStyles = makeStyles({
    root: {
      width: 300,
    },
  });
  

 
    const classes = useStyles();


  return (
    <div>
      <Modal trigger={<Button><FaSlidersH size={20}/></Button>}>
    <Modal.Header>מסננים</Modal.Header> 
    <Modal.Content>
      <div>
    <div className={classes.root} style={{alignContent:'center'}}>
      <Typography id="range-slider" gutterBottom>
        ימים
      </Typography>
      <Slider 
        orientation="horizontal"
        min={0}
        max={40}
        defaultValue={[days.min, days.max]}
        aria-labelledby="rangeg-slider"
        onChangeCommitted={(event,value)=>handleDaysChange(event,value)}
        marks={daysMarks}
        valueLabelDisplay="active"

        />
      </div>
      </div>
      
    </Modal.Content>       
  </Modal >
    </div>
  )
}
