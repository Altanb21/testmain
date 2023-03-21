import React, { useState } from "react";
import "./Sidetable.css";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
const Sidetable = () => {
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <div className="table">
      <div className ='Tog'>
      <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="web">my bets</ToggleButton>
      <ToggleButton value="android">top</ToggleButton>
      <ToggleButton value="ios">All bets</ToggleButton>
    </ToggleButtonGroup>
    </div>
    </div>
  );
};

export default Sidetable;
