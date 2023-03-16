import React from 'react'
import Navbar from '../Navbar/Navbar' 
import './Login.css'


const Login = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
      <form>
        <h1 className='log'>Login</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <button className="fluid ui button blue">Submit</button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Login
