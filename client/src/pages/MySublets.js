import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../UserContext'
import axios from 'axios'
import { Grid } from '@material-ui/core';
import SubItem from '../Components/SubItem'




export default function MySublets({alreadyLikedSublets}) {

const [facebookUserDetails]= useContext(UserContext)

const [MySublets,setMySublets]=useState([])

useEffect(()=> {

    const fetchData = async()=>{
    
    const result = await axios.get(`/sublets/getUserSublets/${facebookUserDetails.id}`)
    
    setMySublets(result.data)

    };

    fetchData();

    },[facebookUserDetails]);    
    
    console.log(MySublets)

  if(facebookUserDetails.isLoggedIn && MySublets.length>0){
    
      return (


         <Grid container justify={"space-evenly"}  >

        {MySublets.map((sub)=>(
        <SubItem 
        key={sub._id}
        sublet = {sub}
        alLikedSublets={alreadyLikedSublets}
        deleteAbility={true}

         />
        ))}
        </Grid>
    
    )

    }else if(facebookUserDetails.isLoggedIn && MySublets.length===0){
       return(
      <div>
      <div style={{display:'flex',paddingTop: '50px',alignItems:'center',justifyContent:'center'}} >
      <h1 style={{display:'flex',alignItems:'center',textAlign:'center'}}> אין כרגע סאבלטים להצגה</h1>
      </div>
      <div style={{textAlign:'center'}}>
      <h1>🤔</h1>
      </div>
      </div>

      )

    }else{
      return(
      <div>
      <div style={{display:'flex',paddingTop: '50px',alignItems:'center',justifyContent:'center'}} >
      <h1 style={{display:'flex',alignItems:'center',textAlign:'center'}}> עלייך להתחבר באמצעות פייסבוק על מנת לראות את הסאבלטים שלך</h1>
      </div>
      <div style={{textAlign:'center'}}>
      <h1 >🙄</h1>
      </div>
      </div>

      )
      }
}
