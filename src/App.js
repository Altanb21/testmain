import "./index.css";
// import Canvas from "./components/Canvas/Canvas";
import Navbar from "./components/Navbar/Navbar";
// import Controls from "./components/Controls/Controls";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Results from "./components/Results/Results";
// import Sidetable from "./components/Sidetable/Sidetable";
import { Routes, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useEffect, useState } from "react";
import Home from "./components/Home/Home";
import Loader from "./components/Loader/Loader";
import React, { lazy, Suspense } from "react";
const Canvas = lazy(() => import("./components/Canvas/Canvas"));
const Sidetable = lazy(() => import("./components/Sidetable/Sidetable"));
const Controls = lazy(() => import("./components/Controls/Controls"));
function App() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUsername(user.displayName);
      } else setUsername("");
    });
  }, []);

  const handleSignOut = (e) => {
    e.preventDefault();
    auth.signOut();
    setUsername("");
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login name={username} />} />
          <Route path="/results" element={<Results name={username} />} />
          <Route
            path="/play"
            element={
              <>
                <Navbar handleSignOut={handleSignOut} name={username} />
                <Suspense fallback={<Loader />}>
                  <Canvas />
                  <Sidetable />
                  <Controls name={username} />
                </Suspense>
              </>
            }
          />
        </Routes>
      )}
    </div>
  );
}


export default App;
