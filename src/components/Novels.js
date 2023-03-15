import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { useDispatch } from 'react-redux'
import { logout } from '../actions/index'
import './novel.css'
import 'bootstrap/dist/css/bootstrap.min.css';





function Novels() {
  const dispatch = useDispatch();
  const [novels, setNovels] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

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
      console.log(response.data)
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
      <div className="backgroundImg">
        <div className="container txt">
          <h1>ScreamStream</h1>
          <p><b>The most enjoyable part of our world is the agony of sleep </b>, <br />If you want to add your own book</p>
          <a href="/addBook"><button id="add" className="btn">Add Book</button></a>

        </div>
      </div>
      <div id="landing">
        <p style={{ visibility: "hidden" }}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad, nostrum deserunt mollitia animi omnis explicabo laborum harum eos reprehenderit illum magni dolore quasi, vero consequuntur. Accusantium aut vel ab amet.</p>
        <div id="diver">
          <h1 className="text-center font-bold text-2xl" id="head">Novels</h1>
        </div>
        <div className="align-item center figureWEB">
          {novels.map((item, index) => {
            return (
              <div style={{ marginBottom: '4vw' }}>
                <img src={require(`../images/${item.image}`)} class="figure-img img-fluid rounded imagees" alt="..." />
                <p class="figure-caption" style={{ width: '18vw', direction: 'ltr', color: '#f9a504' }}>{item['name']} - {item.author}</p>
                <p class="figure-caption" style={{ width: '18vw', direction: 'ltr', color: 'white' }}>{item['description']}</p>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Novels;