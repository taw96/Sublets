import React,{useState,useContext,useEffect} from 'react'
import SubItem from '../Components/SubItem'
import { Grid } from '@material-ui/core';
import {IoMdHappy} from 'react-icons/io'

import axios from 'axios';
import {UserContext} from '../UserContext'


export default function SavedSublets({alreadyLikedSublets}) {

const [facebookUserDetails]= useContext(UserContext)

const [savedSublets,setSavedSublets]= useState([])

const [returnedSublets,setRerurnedSublets]=useState([])
    useEffect(()=> {

    const fetchData = async()=>{
    
    const result = await axios.get(`/users/getUser/${facebookUserDetails.id}`)
    
    setSavedSublets(JSON.stringify(result.data[0].likedSublets))


    };
    fetchData();
    
    },[facebookUserDetails]);    

    // console.log(facebookUserDetails.id)
    // console.log(savedSublets)


    useEffect(()=> {

    const fetchData = async()=>{
    
    const result = await axios
    .get(`/sublets/getUserSavedSublets?savedSublets=${savedSublets}`)
    
    // console.log(result.data)
    setRerurnedSublets(result.data)
    
    }
    fetchData();
    
    },[savedSublets]); 

    if(facebookUserDetails.isLoggedIn && returnedSublets.length>0){
    
      return (


         <Grid container justify={"space-evenly"}  >

        {returnedSublets.map((sub)=>(
        <SubItem 
        key={sub._id}
        sublet = {sub}
        alLikedSublets={alreadyLikedSublets}
        
         />
        ))}
        </Grid>
    
    )

    }else if(facebookUserDetails.isLoggedIn && returnedSublets.length===0){
       return(
      <div style={{display:'flex',paddingTop: '50px',alignItems:'center',justifyContent:'center'}} >
      <h1 style={{display:'flex',alignItems:'center',textAlign:'center'}}>  🤔 אין כרגע סאבלטים להצגה</h1>
      </div>
      )

    }else{
      return(
      <div style={{display:'flex',paddingTop: '50px',alignItems:'center',justifyContent:'center'}} >
      <h1 style={{display:'flex',alignItems:'center',textAlign:'center'}}> 🙄 עלייך להתחבר באמצעות פייסבוק על מנת לראות את הסאבלטים השמורים </h1>
      </div>
      )}
}
