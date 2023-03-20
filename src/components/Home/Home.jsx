import React from "react";
import Navbar from "../Navbar/Navbar";
import poster from "../poster.jpeg";
import './Home.css'
const Home = () => {
  return (
    <div>
      <Navbar />
      <img className="poster" src={poster} alt="Image" />

    </div>
  );
};

export default Home;
