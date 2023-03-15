import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";

function Register() {

  const [input, setInputs] = useState([]);

  function sendData(e) {
    e.preventDefault();
    axios
      .post("http://localhost/React/Redux_Novels/backend/register.php/", input)
      .then(function (response) {
        console.log(response)
        if (response.data == "\r\n\r\nYour Email is Already Exist") {
          document.getElementById("email-repeat").style.display = "block";
        } else {
          console.log(response.data)
          localStorage.setItem("name", JSON.stringify(response.data.first_name));
          localStorage.setItem("id", JSON.stringify(response.data.id));
          localStorage.setItem("email", JSON.stringify(response.data.email));
          window.location.assign("/home")
        }
      })

  }

  var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name == "name") {
      if (/\d/.test(value)) {
        document.getElementById("username-warining").style.display = "block";
        document.getElementById("username-accept").style.display = "none";
      } else if (value.match(format) || value.length <= 0) {
        document.getElementById("username-warining").style.display = "block";
        document.getElementById("username-accept").style.display = "none";
      } else {
        document.getElementById("username-accept").style.display = "block";
        document.getElementById("username-warining").style.display = "none";
        setInputs({ ...input, [name]: value });
      }
    }

    if (name == "last_name") {
      if (/\d/.test(value)) {
        document.getElementById("last-warining").style.display = "block";
        document.getElementById("last-accept").style.display = "none";
      } else if (value.match(format) || value.length <= 0) {
        document.getElementById("last-warining").style.display = "block";
        document.getElementById("last-accept").style.display = "none";
      } else {
        document.getElementById("last-accept").style.display = "block";
        document.getElementById("last-warining").style.display = "none";
        setInputs({ ...input, [name]: value });
      }
    }
  };

  const handleEmail = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (value.match(/\w+@[a-zA-Z0-9]+.[a-zA-Z]{2,4}$/)) {
      document.getElementById("warning").style.display = "none";
      setInputs({ ...input, [name]: value });
    } else {
      document.getElementById("warning").style.display = "block";
    }
  };
  const handlePass = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (value.length >= 8 && value.match(passw) && value.match(format)) {
      document.getElementById("password-warining").style.display = "none";
      document.getElementById("password-accept").style.display = "block";
    } else {
      document.getElementById("password-warining").style.display = "block";
      document.getElementById("password-accept").style.display = "none";
    }
  };
  const handleConfirmPass = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (value == document.getElementById("password").value) {
      document.getElementById("repassword-warining").style.display = "none";
      document.getElementById("repassword-accept").style.display = "block";
      if (value == document.getElementById("password").value) {
        setInputs({ ...input, [name]: value });
      }
    } else {
      document.getElementById("repassword-warining").style.display = "block";
      document.getElementById("repassword-accept").style.display = "none";
    }
  };

  return (
    <div id="landing">
      <div>
        <section className="background-radial-gradient overflow-hidden">
          <div className="container hack px-4 py-5 px-md-5 text-center text-lg-start my-5">
            <div className="row gx-lg-5 align-items-center mb-5">
              
              <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                <div
                  id="radius-shape-1"
                  className="position-absolute rounded-circle shadow-5-strong"
                />
                <div
                  id="radius-shape-2"
                  className="position-absolute shadow-5-strong"
                />
                <div className="card bg-glass novelsReg">
                  <div className="card-body px-4 py-5 px-md-5">
                    <form onSubmit={sendData}>
                      <h1 className="Register">Register</h1>
                      <br/>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              placeholder="First name"
                              type="text"
                              id="firstName"
                              onChange={handleChange}
                              name="name"
                              className="form-control"
                            />
                          </div>
                          <div
                            id="username-warining"
                            style={{
                              display: "none",
                              color: "red",
                              fontSize: "15px",
                            }}
                          >
                            Please don't use numbers or Char. And don't let it
                            empty.
                          </div>
                          <div
                            id="username-accept"
                            style={{
                              display: "none",
                              color: "green",
                              fontSize: "15px",
                            }}
                          >
                            Username is okay.
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline mb-4">
                            <input
                              placeholder="Last name"
                              type="text"
                              id="lastName"
                              onChange={handleChange}
                              name="last_name"
                              className="form-control"
                            />
                            <div
                              id="last-warining"
                              style={{
                                display: "none",
                                color: "red",
                                fontSize: "15px",
                              }}
                            >
                              Please don't use numbers or Char. And don't let it
                              empty.
                            </div>
                            <div
                              id="last-accept"
                              style={{
                                display: "none",
                                color: "green",
                                fontSize: "15px",
                              }}
                            >
                              Username is okay.
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          placeholder="Email address"
                          type="email"
                          id="email"
                          onChange={handleEmail}
                          name="email"
                          className="form-control"
                        />
                        <p
                          id="warning"
                          style={{ color: "red", display: "none" }}
                        >
                          Invalid Email
                        </p>
                        <div
                          id="email-repeat"
                          style={{ color: "red", display: "none" }}
                        >
                          Your email is repeated.Please use another one.
                        </div>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          placeholder="Password"
                          type="password"
                          id="password"
                          onBlur={handlePass}
                          className="form-control"
                        />
                        <div
                          id="password-warining"
                          style={{
                            display: "none",
                            color: "red",
                            fontSize: "15px",
                          }}
                        >
                          Please use capital and small letters, numbers and
                          special Char in your password.
                        </div>
                        <div
                          id="password-accept"
                          style={{
                            display: "none",
                            color: "green",
                            fontSize: "15px",
                          }}
                        >
                          Password is okay.
                        </div>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          placeholder="Confirm Password"
                          type="password"
                          id="confirmPassword"
                          onBlur={handleConfirmPass}
                          name="password"
                          className="form-control"
                        />
                        <div
                          id="repassword-warining"
                          style={{
                            display: "none",
                            color: "red",
                            fontSize: "15px",
                          }}
                        >
                          Your password does not match.
                        </div>
                        <div
                          id="repassword-accept"
                          style={{
                            display: "none",
                            color: "green",
                            fontSize: "15px",
                          }}
                        >
                          Password Matched.
                        </div>
                      </div>
                      <div id="signInBtn">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block mb-4 form-control diver"
                        >
                          Sign up
                        </button>
                      </div>
                      <div>
                        <br />
                        <br />
                        <br />
                        <div style={{ fontSize: "16px", color: 'aliceblue' }}>
                          Already have an account.{" "}
                          <Link to="/" className="Login">Login!</Link>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Register;
