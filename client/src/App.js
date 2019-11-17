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

function App(){ 

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
  
  useEffect(()=> {
   
    const fetchData = async () =>{
      const result = await axios.get(`/sublets/cost?min=${price.min}&max=${price.max}&daysMin=${days.min}&daysMax=${days.max}&dateMin=${dates.min}&dateMax=${dates.max}`)
     setSublets(result.data);
    }
    fetchData();
    },[days,price,dates]);

 

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
        handlePriceChange={handlePriceChange} 
        price={price}
        handleDaysChange ={handleDaysChange}
        days={days}
        handleDates={handleDates}
        dates={dates}

        />
                

          </React.Fragment>
          )}/>
        </div>
      </Router>
  )
}
  
export default App;


