import React, { useState } from "react";
import "./Sidetable.css";
const Sidetable = () => {
  const [selectedButton, setSelectedButton] = useState("off");

  function handleButtonSelection(buttonName) {
    setSelectedButton(buttonName);
  }

  return (
    <div className="table">

    </div>
  );
};

export default Sidetable;
