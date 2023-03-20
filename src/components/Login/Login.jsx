import Navbar from "../Navbar/Navbar";
import "./Login.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = (props) => {
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = () =>{
    if (!values.email || !values.pass) {
      setErrorMsg(" All fields are required!");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        navigate("/");
        toast("Login successfull!");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className='cover'>
          <h1 className="log">Login</h1>
          <div className="uix">
          <h5></h5>

          </div>
          <div className="ui form">
            <div className="field">
              <label>Email</label>
              <input type="text" name="email" placeholder="Email" onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          } />
            </div>
            <div className="field">
              <label>Password</label>
              <input type="password" name="password" placeholder="Password"  onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          } />
            </div>
            <div className="err">
              <b>{errorMsg}</b>
            </div>
            <button disabled={submitButtonDisabled} onClick={handleSubmit} className="fluid ui button blue">Submit</button>
            <div className="forget">
              <p>
                Already have an account?{" "}
                <span>
                  <Link to="/">Sign up</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
