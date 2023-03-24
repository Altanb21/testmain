import React, { useState } from "react";
import "./Sidetable.css";
import { Link } from "react-router-dom";
const Sidetable = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggleChange = () => {
    setToggle(!toggle);
  };

  return (
    <div className="table">
      <div className="custom-tog">
      <div className="head">
      <ul className="nav-menu">
        
        <li>
          <Link to="/signup">All Bets</Link>
        </li>
      <li>
          <Link to="/play">Tops</Link>
        </li>
        <li>
          <Link to="/results">My Bets</Link>
        </li>
        
      </ul>
      
    </div>
      </div>
    </div>
  );
};

export default Sidetable;
