import React,{ Fragment , useEffect , useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import SubletPage from './Components/SubletPage'
import SubItem from './Components/subItem'
import SubletForm from './Components/SubletForm';
import HomePage from './Components/HomePage';
import Header from './Components/Layouts/Header'
import About from '../src/Components/About';
import axios from 'axios';


function App(){ 
  const [sublets, setSublets] = useState([])
  useEffect(()=> {
    const fetchData = async () =>{
        const result = await axios.get('http://localhost:5000/sublets/');

     setSublets(result.data);
    }
    fetchData();
    }, [] );

  
  return (
    <Router>
      <div>
        <Route path="/about" render={ props =>(
        <Fragment>
          <Header/>
          <About/>
        </Fragment>
        )}/>
        <Route exact path="/" render ={props => (
          <React.Fragment>
            <Header/>
            <HomePage sublets= {sublets} />
          </React.Fragment>
        )}/>
        <Route path="/addSublet" render={props => (
          <React.Fragment>
            <Header/>
            <SubletForm  />
          </React.Fragment>
        )}/>
        {sublets.map((sub)=>(
          <Route key= {sub._id} path= {`/sub/${sub._id}`} render={props => (
            <React.Fragment>
              <Header/>
              <SubletPage sublet ={sub}/>
            </React.Fragment>
          )}/>
          ))}
          <Route path="/sublets" render={props => (
          <React.Fragment>
            <Header/>
            <div >
              {sublets.map((sub)=>(
            
            <SubItem 
            key = {sub._id}
            sublet = {sub}
            />
              ))}
            </div>
          </React.Fragment>
        )}/>
      </div>
    </Router>
  )
}
  
export default App;


