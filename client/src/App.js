import React,{ Fragment , useEffect , useState, useContext } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import SubletPage from './pages/SubletPage'
import SubletForm from './Components/SubletForm';
import MapPage from './pages/Map';
import Header from './Components/Layouts/Header'
import About from '../src/Components/About';
import axios from 'axios';
import HomePage from './pages/HomePage';
import SubletsPage from './pages/SubletsPage';
import SavedSublets from './pages/SavedSublets';
import {UserContext} from './UserContext'

function App(){ 

const [alreadyLikedSublets,SetAlreadyLikedSublets]= useState([])
const [facebookUserDetails,setFacebookUserDetails]=useContext(UserContext)
 

    useEffect(()=> {
      if(facebookUserDetails.isLoggedIn){
    const fetchData= async()=>{
    const result = await axios.get(`/users/getUser/${facebookUserDetails.id}`)
    SetAlreadyLikedSublets(result.data[0].likedSublets)
  
    };
    fetchData();

      } else{
        SetAlreadyLikedSublets([])
      }
    
    },[facebookUserDetails]);  

    // console.log(alreadyLikedSublets)
    
  
  // State of sublets, price, days and dates
  
  const [sublets, setSublets] = useState([]);


  const [price,setPrice] = useState({min:0, max:1001});

  const [days,setDays] = useState({min:0, max:80});
 
  const date = new Date();

  const [dates, setDates]= useState(
    {
      min:new Date(),
      max: date.setMonth(date.getMonth()+1)
    
    })

  
  const handleDates=(dateName,dateValue)=> {  
    let {min,max} =dates;
    if(dateName==='startDate'){
      min=dateValue.toISOString();
    } else {
      max =dateValue.toISOString();
    }
    setDates({
      min:(min),
      max:(max)
    })    
  }

  const handlePriceChange=(event,value)=>{

    setPrice({min:value[0],max:value[1]})
  }
 
  const handleDaysChange=(event,value)=>{
    setDays({min:value[0],max:value[1]})
  }


    const [floorAsked,setFloorAsked]=useState(100)

    const handleFloorChange = event =>{
      setFloorAsked(Number(event.target.value));
    };
  
  const [otherParams,setOtherParams] = useState({
      parking:false,
      elevator:false,
      airCon:false,
      balcony:false,
      washMachine:false,
      wifi:false,
      tv:false,
      streamer:false
    })

    const handleOtherParams= name => event =>{
      setOtherParams({
        ...otherParams,[name]:(event.target.checked)
      })
    }

    console.log(otherParams)
  
  useEffect(()=> {
   
    const fetchData = async () =>{
      const result = await axios.get(`/sublets/cost?min=${price.min}&max=${price.max}
      &daysMin=${days.min}&daysMax=${days.max}
      &dateMin=${dates.min}&dateMax=${dates.max}
      &floorParam=${floorAsked}&parking=${otherParams.parking}&elevator=${otherParams.elevator}&airCon=${otherParams.airCon}&balcony=${otherParams.balcony}&washMachine=${otherParams.washMachine}&wifi=${otherParams.wifi}&tv=${otherParams.tv}&streamer=${otherParams.streamer}
      
      `)
     setSublets(result.data);
    }
    fetchData();
    },[days,price,dates,floorAsked,otherParams]);


  return (
    <Router>
      <Header/>
      <div>
      <Route exact path="/" render={ props =>(
        <Fragment>
          
          <HomePage/>
        </Fragment>
        )}/>
        <Route exact path="/about" render={ props =>(
        <Fragment>
          
          <About/>
        </Fragment>
        )}/>
        <Route exact path="/map" render ={props => (
          <React.Fragment>
            
            <MapPage sublets= {sublets} />
          </React.Fragment>
        )}/>
        <Route exact path="/addSublet" render={props => (
          <React.Fragment>
            
            <SubletForm  />
          </React.Fragment>
        )}
        />

          <Route exact path= '/sublet/:id' component={SubletPage}
          />

        <Route exact path="/sublets" render={props => (
        <React.Fragment>

         
        <SubletsPage 
        sublets={sublets} 
        handlePriceChange={handlePriceChange} 
        price={price}
        handleDaysChange ={handleDaysChange}
        days={days}
        handleDates={handleDates}
        dates={dates}
        handleFloorChange={handleFloorChange}
        floorAsked={floorAsked}
        alreadyLikedSublets={alreadyLikedSublets}
        otherParams={otherParams}
        handleOtherParams={handleOtherParams}
        />
      
          </React.Fragment>
          )}/>
           <Route exact path="/savedSublets" render={props => (
          <React.Fragment>
            
            <SavedSublets
             alreadyLikedSublets={alreadyLikedSublets}

            />
          </React.Fragment>
        )}
        />
        </div>
      </Router>
  )
}
  
export default App;


