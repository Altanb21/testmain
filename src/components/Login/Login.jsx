import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Login.css";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = () =>{
     navigate('/play')

  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <form onClick={handleSubmit}>
          <h1 className="log">Login</h1>
          <div className="ui divider"></div>
          <div className="ui form">
            <div className="field">
              <label>Email</label>
              <input type="text" name="email" placeholder="Email" />
            </div>
            <div className="field">
              <label>Password</label>
              <input type="password" name="password" placeholder="Password" />
            </div>

            <button className="fluid ui button blue">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
