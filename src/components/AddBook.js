import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { useDispatch } from 'react-redux'
import { logout } from '../actions/index'
import './novel.css'
import './AddNovel.css'

function AddBook() {

  const current_ID = 1;
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [auther, setAuther] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();
  const [novels, setNovels] = useState([]);

  function getNovels() {

    axios.get(`http://localhost/React/Redux_Novels/backend/novels.php`).then((response) => {
      console.log(response.data)
      setNovels(response.data);
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("auther", auther);
    formData.append("description", description);
    formData.append("user_id", current_ID);
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost/React/Redux_Novels/backend/books.php",
        formData
      );
      console.log(response.data);
      navigate('/home');
    } catch (error) {
      console.error(error);
    }
  };



    const [search, setSearch] = useState("");
  
    useEffect(() => {
      getNovels();
    }, []);
  
    function getNovels() {
      axios.get(`http://localhost/React/Redux_Novels/backend/novels.php`).then((response) => {
        setNovels(response.data);
      })
    }
  
    const deleteBook = (id) => {
      axios.delete(`http://localhost/React/Redux_Novels/backend/books.php/${id}/delete`).then((response) => {
        navigate('/home')
      })
    }
  
    function getSearch(e) {
      e.preventDefault();
      axios.get(`http://localhost/React/Redux_Novels/backend/search.php/${search}`).then((response) => {
  
        setNovels(response.data)
  
      })
  
    }
  
    const handleSearch = (e) => {
      const value = e.target.value;
      setSearch(value)
    }
  
  return (
    <>
      <Navbar id="navBarContainer">
        <Container>
          <img className="logo" src={require(`../images/Pentagrama_Wallpaper-removebg-preview.png`)} />
          <Navbar.Brand>
            <form className="formSearch" onSubmit={getSearch}>
              <input id="search" placeholder="Search Of Your Novel" onChange={handleSearch} type="text" />
              <button type="submit" id="add" ><i class="fa-solid fa-magnifying-glass"></i></button>
            </form>
          </Navbar.Brand>
        </Container>
        <Container id="diverr">
          <Nav >
            <Nav.Link id="logout" href="/Home"><button id="head" className="home">Home</button></Nav.Link>
            <Nav.Link id="logout"><button id="head" className="out" onClick={() => dispatch(logout())} >Logout</button></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div id="landing" className="bak">
        <p style={{ visibility: "hidden" }}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad, nostrum deserunt mollitia animi omnis explicabo laborum harum eos reprehenderit illum magni dolore quasi, vero consequuntur. Accusantium aut vel ab amet.</p>

        <div id="formm">
          <section className="section_form">
        <div id="diver"><h1 className="text-center font-bold text-2xl" id="head">Add Book</h1></div>
      <br/>
      <br/>
      <br/>
      <br/>
            <form id="consultation-form" className="feed-form" onSubmit={handleSubmit}>
              <input name="title" placeholder="Novel Title" type="text" id="text" value={title} onChange={(e) => setTitle(e.target.value)} /><br /><br />
              <input name="title" placeholder="Novel Auther" type="text" id="text" value={auther} onChange={(e) => setAuther(e.target.value)} /><br /><br />
              <input name="description" style={{ height: '6vw' }} placeholder="Novel Description" type="text" id="text" value={description} onChange={(e) => setDescription(e.target.value)} /><br /><br />
              <input type="file" name="img" id="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} hidden />
              <label className="label" htmlFor="file">
                <img id="imgAdd" src={require('../images/JJJ.png')} alt="" />
                <p id="imgLabel">Add Image</p>
              </label>
              <button id="addNovelDB" type="submit"><img src={require('../images/test.png')} alt="" />submit</button>
            </form>
          </section>
        </div>
      </div>

    </>
  )
}

export default AddBook