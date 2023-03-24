import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import "./Signup.css";
import { auth } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = () => {
    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("All fields are required");
      return;
    }
    setErrorMsg("");
    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async(res) => {
        toast("Signup Successfull")
        setSubmitButtonDisabled(false);
        const user = res.user
        console.log(user)
        await updateProfile(user,{
          displayName:values.name
        })
        navigate('/login')
      })
      .catch((err) => {
        setSubmitButtonDisabled(false)
        setErrorMsg(err.message)
      })
  };
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="cover">
          <h1 className="log">Signup</h1>
          <div className="ui divider"></div>
          <div className="ui form">
            <div className="field">
              <label>Email<span className="required"> *</span></label>
              <input
              className="form-control"
                type="text"
                name="email"
                placeholder="Email"
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, email: event.target.value }))
                }
              />
            </div>
            <div className="field">
              <label>Username<span className="required"> *</span></label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, name: event.target.value }))
                }
              />
            </div>
            <div className="field">
              <label>Password<span className="required"> *</span></label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(event) =>
                  setValues((prev) => ({ ...prev, pass: event.target.value }))
                }
              />
            </div>
            <div className="err">
              <b>{errorMsg}</b>
            </div>
            <button style={{backgroundColor:'#00ced1'}}
              onClick={handleSubmit}
              disabled={submitButtonDisabled}
              className="fluid ui button blue"
            >
              Submit
            </button>
            <div className="forget">
              <p>
                Already have an account?{" "}
                <span>
                  <Link to="/login">Login</Link>
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

export default Signup;
