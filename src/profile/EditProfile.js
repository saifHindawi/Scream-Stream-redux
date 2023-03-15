import React, { useEffect, useState } from 'react';
import './profile.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {Container, Navbar, Nav } from 'react-bootstrap';

import {useDispatch} from 'react-redux'
import {logout} from '../actions/index'

export default function EditProfile() {


    const {id} = useParams();
    const navigate = useNavigate();
    const [inputs , setInputs] = useState("");
    const [file, setFile] = useState(null);
    const [user , setUser] = useState([]);
    const email = JSON.parse(localStorage.getItem('email'));

    
    useEffect(()=>{
        getUser();
    } , [])

    function getUser(){
        axios.get(`http://localhost/redux_project/backend/users.php/${email}`)
        .then(response => {
            console.log(response.data);
            setUser(response.data);
        })
    }
    const handleEditUser = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs( {...inputs , [name]: value})
      }
      const dispatch=useDispatch();
      const handleEditUserSubmit  = async (e) => {
        e.preventDefault();
    
        const formEditData = new FormData();
  
        formEditData.append("name", inputs['name']);
        formEditData.append("phone", inputs['phone']);
        formEditData.append("password", inputs['password']);
        formEditData.append("file", file);
      
        try {
          const response = await axios.post(
            `http://localhost/redux_project/backend/editUserProfile.php/${email}`, formEditData
          );
          console.log(response.data);
          navigate(`/profile`);
        //   window.location.assign(`/profile/${id}`);
        } catch (error) {
          console.error(error);
        }
      };



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

    <div id="landing" style={{paddingTop : '1vw' , height : '88vh'}}>
<div className='profileForm novelsReg'>
    <h1>Edit Your Info</h1>
    <form onSubmit={handleEditUserSubmit}>
    <label htmlFor="">Name</label>
      <input type="text" placeholder="name" name="name" defaultValue={user.name} onChange={handleEditUser} />
    {/* <label htmlFor="">Email</label>
      <input /> */}
    <label htmlFor="">Phone</label>
      <input type="number"  placeholder="phone"  name="phone" defaultValue={user.mobile}  onChange={handleEditUser} />
    <label htmlFor="">Password</label>
      <input  type="password"  placeholder="Email" name="password" defaultValue={user.password} onChange={handleEditUser} />
      <br/>
      <input type="file" style={{border:'none',borderRadius:'0'}}  placeholder="image"   name="file" id="file"onChange={(e) => setFile(e.target.files[0])} hidden/>
      <label style={{marginBottom : '1vw' , marginTop : '-1vw'}} className="label" htmlFor="file">
          <img style={{marginLeft : '0vw'}} id="imgAdd" src={require('../images/1024px-Icons8_flat_add_image.svg-removebg-preview.png')} alt="" />
          <p style={{marginLeft : '6vw' , bottom : '9.5vw'}} id="imgLabel">Add Image To Your Profile</p>
      </label>



      <div id="signInBtn">
        <button type="submit" className="btn btn-primary btn-block mb-4 form-control diver">Submit</button>
      </div>
    </form>
   </div>
   </div>
        
        
    </>
  )
}
