import React,{ useEffect , useState } from 'react';
import { GoogleMap , withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";
import { Link } from 'react-router-dom'
import axios from 'axios';
import { Card, CardMedia }  from '@material-ui/core';
import { Gallery, GalleryImage } from 'react-gesture-gallery'
import { FaShekelSign } from 'react-icons/fa'


const WrappedMap = withScriptjs(withGoogleMap(Map))

export default function MapPage() {


  return (
    <div>
      
    <div style={{width:'100vw',height: '50vh'}} >
      <WrappedMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA9kyb_oWZRFpWzs_3ivlhlwicicznMM08`}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      
        />
    </div>
    </div>
  )
}

function Map() {

  const [sublets, setSublets] = useState([])

  useEffect(()=> {
   
    const fetchData = async () =>{
      const result = await axios.get(`/sublets/map`)

     setSublets(result.data);
    }
    fetchData();
    },[]);

  const [index,setIndex] = useState(0)

  const [selectedPoint, setSelectedPoint] =useState(null)

  return (
 
  <GoogleMap defaultZoom={14} defaultCenter={{ lat:32.0804808 ,lng:34.7805274}}
  >

 {sublets.map((sub)=>(

   <Marker 
   key = {sub._id}
  position={{
   lat: sub.lat,
   lng: sub.lng
 }}
//  label={sub.costPerNight.toString()}
//  labelStyle= {color:'red'}
//  icon={'none'}



  onClick = {()=>{
    setSelectedPoint(sub)
  }}
 />
  
 ))}
 {selectedPoint && (
   <InfoWindow 
   position={{
    lat: selectedPoint.lat,
    lng: selectedPoint.lng
  }}

  onCloseClick={()=>{
    setSelectedPoint(null)
  }}
  >
          <div>

          <div  style={{
            display:'flex',
            flex:'1',
            justifyContent:'center',
            maxWidth:'25vw',
            maxHeight:'35vh',
            borderRadius: '25px',
            backgroundColor:'#dcdcdc'}}>
          <Gallery 
          
          index={index}
          onRequestChange = {i=>{
          setIndex(i)
          }} 
          >
          {Object.keys(selectedPoint.mediaUrl).map((img)=>(
              <div>
          <GalleryImage key={selectedPoint.mediaUrl[img]} src={selectedPoint.mediaUrl[img]}/>
              </div>
          ))}

          </Gallery>
          </div>

          <br/>


      
      <div style={{direction:"rtl"}}>

      <Link  to={`/sublet/${selectedPoint._id}`}> 
       {selectedPoint.address}
       </Link>
       <br/>
       {selectedPoint.details}
       </div>
      </div>
   </InfoWindow>
 )}

 </GoogleMap>
 

  )
}