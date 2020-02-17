import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'

const Profile = (props)=>{
  const [userdata,setUserData]=useState({
    name:'Loading',
    picture:''
  })
  useEffect(()=>{
    if(props.user)
    {
      setUserData({
        name:props.user.profileName,
        picture:props.user.profilePicture
      })
    }
  },[])
  if(!props.user)
  {
    props.history.push('/')
  }
  return(
    <div className="container">
    <h2>Profile Page</h2>
    <h3>Welcome,{userdata.name}</h3>
      <img src={userdata.picture} className="circle"/>
      </div>
    )
}

const mapStateToProps =(state)=>{
	return{
		user:state.auth
	}
}

export default connect(mapStateToProps)(Profile);