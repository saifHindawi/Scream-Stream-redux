import React, { useEffect, useState } from 'react';
import './profile.css';
import axios from 'axios';
import {Container, Navbar, Nav } from 'react-bootstrap';

import {useDispatch} from 'react-redux'
import {logout} from '../actions/index'


export default function Profile() {

    // const current_ID = JSON.parse(localStorage.getItem('id'));
    // const current_ID = 1;
    const email = JSON.parse(localStorage.getItem('email'));

    const [dataUsers,setDataUsers] = useState([]);

    const dispatch=useDispatch();

    useEffect(()=>{
        getDataUsers();
       
    },[]);

      // لعرض  بيانات المستخدم في الموقع
  const getDataUsers = () => {

    axios.get(`http://localhost/redux_project/backend/user.php/users/${email}`)
    .then((respone)=>{
      setDataUsers(respone.data)
        console.log(respone.data);
    })
}

  return (
    <>
<Navbar id="navBarContainer">
    <img id='imgNav' src={require('../images/vector-illustration-search-icon-4099347-removebg-preview.png')} alt="" />
      <Container>
        <Navbar.Brand><form><input id="search" placeholder="Search Of Your Novel"type="text"/><br/><button type="submit" id="add" style={{height : "24px" , fontSize : '16px' , width : '226px'}}>Search</button></form></Navbar.Brand>
      </Container>
      <Container id="diverr">
        <Navbar.Brand><a href="/addBook"><button id="add" style={{marginLeft : '5vw' , height : "4vw" , fontSize : '18px' , width : '125px'}}>Add Book</button></a></Navbar.Brand>
      </Container>
        <Nav >
            <Nav.Link id="logout" href="/Home"><button id="head" className="home">Home</button></Nav.Link>    
            <Nav.Link id="logout" href="/Profile"><button id="head" className="profile">Profile</button></Nav.Link>    
            <Nav.Link id="logout"><button id="head" className="out" onClick={()=>dispatch(logout())} >Logout</button></Nav.Link>     
        </Nav>
    </Navbar>
    {dataUsers.map((users,index)=>{

return <div key={index}>
<div id="landing" style={{paddingTop : '2vw' , height : '88vh'}}>
<div className='parent'>
<div className="wrapper">
        <div className="left">
          <h4>{users.name}</h4>
          { ( users.image == 'a')
          ?
          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="" /> 
         :
          <img src={require(`../images/${users.image}`)} alt="" />
         }
        </div>
        <div className="right profileShow">
          <div className="info">
            <h3>Information</h3>
            <div className="info_data">
              <div className="data">
                <h4>Email</h4>
                <p>{users.email}</p>
              </div>
              <div className="data">
                <h4>Phone</h4>
                <p>{users.mobile}</p>
              </div>
            </div>
          </div>
          <div className="social_media">
            <div id="signInBtn">
                        <button style={{marginLeft : '12vw'}}
                          type="submit"
                          className="btn btn-primary btn-block mb-4 form-control diver"
                        >
                          <a style={{color : 'white' , textDecoration : 'none' , fontSize : '18px'}} href={`/profile/${users.id}/edit`}>Edit</a>
                        </button>
                      </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>
        })}
    </>
  )
}
