
import React, { useState } from 'react'
import './Login.css'
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux';
import { login } from "../actions/index";



function Login() {
  localStorage.clear();
  const dispatch = useDispatch();
  const admin = useSelector(state => state.login.admin);
  const error = useSelector(state => state.login.error);

  if (admin != '') {
    localStorage.setItem('email', JSON.stringify(admin))
    window.location.href = "/Home";
  }


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const LoginFun = (e) => {
    e.preventDefault();
    dispatch(login(email, password))
  }
  return (
    <>



      <div id="landing" style={{ height: '99.5vh' }}>
        <p style={{ visibility: "hidden", height: '15vh' }}></p>
        <h1 className="Register">Welcome to ScreamStream</h1>
        <form style={{ marginLeft: '30vw' }}>
          <div class="form-item">
            <label for="email"></label>
            <input style={{ width: '35vw' }} type="email" name="email" required="required" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)}></input>
          </div>
          <div class="form-item">
            <label for="password"></label>
            <input style={{ width: '35vw' }} type="password" name="password" required="required" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
          </div>
          <div id='Error-div'>
            <span>{error}</span>
          </div>
          <div class="button-panel">
            <input style={{ width: '40vw' }} type="submit" class="button" title="LogIn" value="Login" onClick={(e) => LoginFun(e)}></input>
          </div>
        </form>
        <div class="form-footer">
          <div style={{ fontSize: "16px", color: 'aliceblue' }}>
            You Don't Have Account Yet.{" "}
            <Link to="/register">Sign Up!</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login