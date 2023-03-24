import React, { useState } from "react";
import "./Sidetable.css";
import { faClock, faPlusCircle, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      <div className="totals">
        <div className="betss"><p>Total Bets : <span>0</span></p></div>
      <div className="prev">
      <FontAwesomeIcon className="clock"
                  icon={faClock}
                />
        <p className="hand">Previous Hand</p>
      </div>
      </div>
    </div>
  );
};

export default Sidetable;
