import React,{ Fragment , useEffect , useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import SubletPage from './Components/SubletPage'
import SubletForm from './Components/SubletForm';
import MapPage from './Components/Map';
import Header from './Components/Layouts/Header'
import About from '../src/Components/About';
import axios from 'axios';
import HomePage from './Components/HomePage';
import SubletsPage from './Components/SubletsPage';
import moment from 'moment'

function App(){ 

  // State of sublets, price, and dates
  const [sublets, setSublets] = useState([])

  const [price,setPrice] = useState({min:0, max:1001})

  const [selectedDateIn, setDateIn]= useState(null)

  const [selectedDateOut, setDateOut]= useState(null)
  
  const handleDateIn=(selectedDateIn)=> {
    setDateIn(selectedDateIn)
  }
  
  const handleDateOut=(selectedDateOut)=> {
    setDateOut(selectedDateOut)
  }

  const handleChange=(event,value)=>{

    setPrice({min:value[0],max:value[1]})
  }
 
  
  useEffect(()=> {
   
    const fetchData = async () =>{
      const result = await axios.get(`/sublets/cost?min=${price.min}&max=${price.max}`)
     setSublets(result.data);
    }
    fetchData();
    },[price]);
    
    // &selectedDateIn=${selectedDateIn}
    // &selectedDateOut=${selectedDateOut}

    console.log(price)
    
    console.log(selectedDateOut,selectedDateIn)
    
  

  return (
    <Router>
      <div>
      <Route exact path="/" render={ props =>(
        <Fragment>
          <Header/>
          <HomePage/>
        </Fragment>
        )}/>
        <Route exact path="/about" render={ props =>(
        <Fragment>
          <Header/>
          <About/>
        </Fragment>
        )}/>
        <Route exact path="/map" render ={props => (
          <React.Fragment>
            <Header/>
            <MapPage sublets= {sublets} />
          </React.Fragment>
        )}/>
        <Route exact path="/addSublet" render={props => (
          <React.Fragment>
            <Header/>
            <SubletForm  />
          </React.Fragment>
        )}
        />

          <Route exact path= '/sublet/:id' component={SubletPage}
          />

        <Route exact path="/sublets" render={props => (
        <React.Fragment>

         <Header/>
        <SubletsPage 
        sublets={sublets} 
        handleChange={handleChange} 
        handleDateIn ={handleDateIn} 
        handleDateOut={handleDateOut} 
        showIn= {selectedDateIn} 
        showOut={selectedDateOut}/>

          </React.Fragment>
          )}/>
        </div>
      </Router>
  )
}
  
export default App;


