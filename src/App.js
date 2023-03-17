import "./index.css";
import Canvas from "./components/Canvas/Canvas";
import Navbar from "./components/Navbar/Navbar";
import Controls from "./components/Controls/Controls";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Results from "./components/Results/Results";
import Sidetable from "./components/Sidetable/Sidetable";
import { Routes, Route } from "react-router-dom";
import { auth } from "./firebase"
import { useEffect, useState } from "react";
function App() {
  const [username,setUsername] = useState("")
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      if(user){
        setUsername(user.displayName)
      }else setUsername("")
    })
  },[])

  const handleSignOut = (e) => {
    e.preventDefault();
    auth.signOut();
    setUsername("");
  };
  return (
    <>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login name={username} />} />
      <Route path="/results" element={<Results />} />
      <Route
        path="/play"
        element={
          <>
            <Navbar handleSignOut={handleSignOut} name={username} />
            <Canvas />
            <Sidetable />
            <Controls name={username} />
          </>
        }
      />
    </Routes>
  </>
  );
}

export default App;