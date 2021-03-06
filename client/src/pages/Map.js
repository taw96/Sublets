import React,{ useEffect , useState } from 'react';
import { GoogleMap , withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";
import { Link } from 'react-router-dom'
import axios from 'axios';
import { Card, CardMedia, CardContent }  from '@material-ui/core';
import { Gallery, GalleryImage } from 'react-gesture-gallery'
import { FaShekelSign } from 'react-icons/fa'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import formatDate from '../utills/formatDate'



const WrappedMap = withScriptjs(withGoogleMap(Map))

export default function MapPage() {


  return (
    <div>
      
    <div style={{width:'100vw',height: '100vh'}} >
      <WrappedMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA9kyb_oWZRFpWzs_3ivlhlwicicznMM08`}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `550px` }} />}
      mapElement={<div style={{ height: `100vh` }} />}

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
 

  <GoogleMap options={{gestureHandling: 'greedy'}}
 defaultZoom={14} defaultCenter={{ lat:32.0804808 ,lng:34.7805274}}
  >


 {sublets.map((sub)=>(

   <Marker 
   key = {sub._id}
  position={{
   lat: sub.lat,
   lng: sub.lng
 }}
 icon={{
   url:'whitePin.png',
   scaledSize:new window.google.maps.Size(40,40)
 }}
 label={
"₪" + sub.costPerNight.toString()}
//  labelStyle= {color:'red'}



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
    {/* <div> */}
      {/* <div style={{direction:"rtl"}}>

      
       </div> */}

       <Card>

       <CardMedia 
       style={{position:'relative', top:'15px',left:'30px',maxWidth:'210px',maxHeight:'200px'}}
       >

         <Carousel 
         showThumbs={false}
         showStatus={false}
         infiniteLoop={true}
         >
       {(selectedPoint.mediaUrl).map((item)=>(
              
        <img src={item} height='150' width="250"/>

       ))}
    
    </Carousel>
             

       </CardMedia>
       
       <CardContent>
       <div style={{direction:'rtl'}}>
       <Link  to={`/sublet/${selectedPoint._id}`}> 
       {selectedPoint.address}
       <br/>
       {`${formatDate(selectedPoint.dateOut)} - ${formatDate(selectedPoint.dateIn)}`}
       <br/>
       </Link>

       {selectedPoint.details}
       </div>
       </CardContent>
       </Card>
   </InfoWindow>
 )}

 </GoogleMap>
 

  )
}