import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'

const Navbar = (props) =>{
  const renderContent=()=>{
    switch(props.user)
    {
      case null:
      return (<li><a href="/">Loading</a></li>)
      case false:
      return (<li><a href="/auth/google">Login</a></li>)
      default:
      return(
           <React.Fragment>
           <li><Link to ="/profile">View Profile</Link></li>
           <li><a href="/api/logout">Logout</a></li>
           </React.Fragment>
        )
    }
  }
  return (
    <div className="App">
    <nav>
    <div class="nav-wrapper">
      <Link to={props.user ? '/profile':'/'} className="brand-logo">App Name</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
      {renderContent()}
      </ul>
    </div>
  </nav>
         </div>
  );
}


const mapStateToProp =(state)=>{
  return{
    user:state.auth
  }
}


export default connect(mapStateToProp)(Navbar);