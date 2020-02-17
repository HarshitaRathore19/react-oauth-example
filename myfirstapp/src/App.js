import React,{useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route} from 'react-router-dom'
import Navbar from './MyComponent/navbar';
import Profile from './MyComponent/profile';
import {connect} from 'react-redux'
import {Provider} from 'react-redux'
import {fetchUserAction} from './Actions/FetchUserAction'
import thunk from 'redux-thunk'



const Home =()=>{
  return(
    <h1>This is Home Page</h1>
    )
}



function App(props){
  useEffect(()=>{
    props.fetch_user()
  },[])
  return (
      <BrowserRouter>
    <div className="App">
    <Navbar/>
    </div>
    <Route exact path = "/" component={Home} />
    <Route path="/profile" component={Profile}/>
    </BrowserRouter>
  );
}


const mapDispatchToProps=(dispatch)=>{
  return{
    fetch_user: ()=>dispatch(fetchUserAction())
  }
}

export default connect(null,mapDispatchToProps)(App);
