import React, { useState } from "react";
import "./Sidetable.css";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
const Sidetable = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggleChange = () => {
    setToggle(!toggle);
  };

  return (
    <div className="table">
      <div className="custom-tog">
      <div className="custom-slider-container">
              <label className="slid">
                <div className="slid-label le">Off</div>
                <input
                  type="checkbox"
                  checked={toggle}
                  onChange={handleToggleChange}
                />
                <div className="slid-button">
                  <div className="slid-button-label onn">All Bet</div>
                  <div className="slid-button-label offf">My Bet</div>
                  <div className="slid-button-label med">Tops</div>
                </div>
              </label>
            </div>
      </div>
    </div>
  );
};

export default Sidetable;
