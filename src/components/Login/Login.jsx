import Navbar from "../Navbar/Navbar";
import "./Login.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

const Login = (props) => {
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = () => {
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
  };

  return (
    <div>
      <Navbar />
      {/* <div className="container">
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
      </div> */}
      <MDBContainer
        fluid
        className="d-flex align-items-center justify-content-center bg-image"
      >
        <div className="mask gradient-custom-3"></div>
        <MDBCard className="m-5" style={{ maxWidth: "600px" }}>
          <MDBCardBody className="px-5">
            <h2 className="text-uppercase text-center mb-5">Login</h2>
            <MDBInput
              wrapperClass="mb-4"
              label="Email"
              size="lg"
              id="form2"
              type="email"
              onChange={(event) =>
                setValues((prev) => ({ ...prev, email: event.target.value }))
              }
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              size="lg"
              id="form3"
              type="password"
              onChange={(event) =>
                setValues((prev) => ({ ...prev, pass: event.target.value }))
              }
            />
            <div className="err">
              <b>{errorMsg}</b>
            </div>
            <MDBBtn
              disabled={submitButtonDisabled}
              onClick={handleSubmit}
              className="mb-4 w-100 gradient-custom-4"
              size="lg"
            >
              Login
            </MDBBtn>
            <div className="forget">
              <p>
                Already have an account?{" "}
                <span>
                  <Link to="/">Sign up</Link>
                </span>
              </p>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default Login;
