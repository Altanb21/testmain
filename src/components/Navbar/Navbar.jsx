import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const [click, setclick] = useState(false);
  const handleClick = () => setclick(!click);
  const handleRefresh = () =>{
    window.Location.reload()
  }
  return (
    <div className="header">
      <Link to="/">
        <h1>Aviatorcrash</h1>
      </Link>
      <ul className={click ? "nav-menu active" : "nav-menu"}>
      <li>
          <Link to="/play">Play</Link>
        </li>
        <li>
          <Link to="/results">All Bets</Link>
        </li>
        <li>
          <Link to="/">Top Bets</Link>
        </li>
        <li>
          <Link to="/">Tops</Link>
        </li>
        <li>
          <Link onClick={handleRefresh} to="/play">Refresh</Link>
        </li>
      </ul>
      <div className="hamburger" onClick={handleClick}>
        {click ? (
          <FontAwesomeIcon  style={{ color: "#fff",fontSize:'20px' }} icon={faTimes} />
        ) : (
          <FontAwesomeIcon  style={{ color: "#fff",fontSize:'20px' }} icon={faBars} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
