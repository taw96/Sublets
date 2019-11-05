import React,{ useEffect , useState } from 'react';
import { GoogleMap , withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import axios from 'axios';



const WrappedMap = withScriptjs(withGoogleMap(Map))

export default function HomePage() {

  
  return (
    <div>
    <input style={{width:'100vw'}} type="text" className="form-control" placeholder="search places.." ></input>
    <div style={{width:'100vw',height: '100vh'}} >
      <WrappedMap googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA9kyb_oWZRFpWzs_3ivlhlwicicznMM08"}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
        />
    </div>
    </div>
  )
}

function Map() {
  const [selectedPoint, setSelectedPoint] =useState(null)
  const [sublets, setSublets] = useState([])
  useEffect(()=> {
    const fetchData = async () =>{
        const result = await axios.get('http://localhost:5000/sublets/');

     setSublets(result.data);
    }
    fetchData();
    }, [] );


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
   url:'/house.jpg',
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
      <div>:פרטים נוספים</div>
   </InfoWindow>
 )}

 </GoogleMap>
 

  )
}