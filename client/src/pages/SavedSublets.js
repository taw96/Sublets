import React,{useState,useContext,useEffect} from 'react'
import SubItem from '../Components/SubItem'
import { Grid } from '@material-ui/core';

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
    
    console.log(result.data)
    setRerurnedSublets(result.data)
    
    }
    fetchData();
    
    },[savedSublets]); 

    
      return (

        <div>
         <Grid container>

        {returnedSublets.map((sub)=>(
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
