import React,{ useEffect , useState } from 'react';
import { GoogleMap , withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { CardMedia }  from '@material-ui/core';
import { Gallery, GalleryImage } from 'react-gesture-gallery'
require('dotenv').config()


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
 icon={{
   url:'house.jpg',
   scaledSize:new window.google.maps.Size(40,40)
 }}

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
      <div style={{direction:"rtl"}}>

      <Link  to={`/sublet/${selectedPoint._id}`}> 
       {selectedPoint.address}
       </Link>
       </div>

       <CardMedia style={{maxWidth:'25vw',maxHeight:'25vh'}}>

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

       </CardMedia>
      </div>
   </InfoWindow>
 )}

 </GoogleMap>
 

  )
}