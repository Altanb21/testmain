// import React, { useState } from "react";
// import "./Navbar.css";
// import { Link } from "react-router-dom";
// import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// const Navbar = (props) => {
//   const [click, setclick] = useState(false);
//   const handleClick = () => setclick(!click);
//   const handleRefresh = () => {
//     window.Location.reload();
//   };
//   return (
//     <div className="header">
//       <Link to="/">
//         <h1>Aviatorcrash</h1>
//       </Link>
//       <ul className={click ? "nav-menu active" : "nav-menu"}>
//         <li>
//           <Link>{props.name ? `${props.name}` : ""}</Link>
//         </li>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/signup">Signup</Link>
//         </li>
//         {!props.name ? (
//           <li>
//             <Link to="/login">Login</Link>
//           </li>
//         ) : (
//           <li>
//             <Link onClick={props.handleSignOut}>Logout</Link>
//           </li>
//         )}
//         <li>
//           <Link to="/play">Play</Link>
//         </li>
//         <li>
//           <Link to="/results">All Bets</Link>
//         </li>
//       </ul>
//       <div className="hamburger" onClick={handleClick}>
//         {click ? (
//           <FontAwesomeIcon
//             style={{ color: "#fff", fontSize: "20px" }}
//             icon={faTimes}
//           />
//         ) : (
//           <FontAwesomeIcon
//             style={{ color: "#fff", fontSize: "20px" }}
//             icon={faBars}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DrawerComp from "./Drawer";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
const Header = () => {
  const [value, setValue] = useState();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#000000" }}>
        <Toolbar>
          <FlightTakeoffIcon sx={{ transform: "scale(2)" }} />
          {isMatch ? (
            <>
              <Typography sx={{ fontSize: "2rem", paddingLeft: "10%" }}>
                AviatorCrash
              </Typography>
              <DrawerComp />
            </>
          ) : (
            // <>
            //   <Tabs
            //     sx={{ marginLeft: "auto" }}
            //     indicatorColor="secondary"
            //     textColor="inherit"
            //     value={value}
            //     onChange={(e, value) => setValue(value)}
            //   >
            //     <Tab href label="home" />
            //     <Tab label="play" />
            //     <Tab label="all bets" />
            //     <Tab label="Contact" />
            //   </Tabs>
            //   <Button sx={{ marginLeft: "auto" }} variant="outlined">
            //     Login
            //   </Button>
            //   <Button sx={{ marginLeft: "10px" }} variant="outlined">
            //     SignUp
            //   </Button>
            // </>
            <>
          <Tabs
            sx={{ marginLeft: "auto" }}
            indicatorColor="secondary"
            textColor="inherit"
            value={value}
            onChange={(e, value) => setValue(value)}
          >
            <Tab component={Link} to="/" label="home" />
            <Tab component={Link} to="/play" label="play" />
            <Tab component={Link} to="/results" label="all bets" />
          </Tabs>
          <Button
                component={Link}
                to="/login"
                sx={{ marginLeft: "auto" }}
                variant="outlined"
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/signup"
                sx={{ marginLeft: "10px" }}
                variant="outlined"
              >
                SignUp
              </Button>
        </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
