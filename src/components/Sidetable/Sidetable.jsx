import React, { useState, useEffect } from "react";
import "./Sidetable.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { auth } from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faUser,
  faCoins,
  faSackDollar,
} from "@fortawesome/free-solid-svg-icons";
const Sidetable = (props) => {
  const {  } = props;
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState([]);
  const [username, setUsername] = useState("")
  const [loggedInCount, setLoggedInCount] = useState(0); // Initialize the count to 0
  ;

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUsername(user.displayName);
        setLoggedInCount((count) => count + 1); // Increment the count when a user logs in
      } else {
        setUsername("");
        setLoggedInCount(0); // Decrement the count when a user logs out
      }
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const postsRef = collection(db, "posts");
      const querySnapshot = await getDocs(postsRef);
      const documents = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      setData(documents);
    };

    fetchData();
  }, []);

  const handleToggleChange = () => {
    setToggle(!toggle);
  };
  return (
    <div className="table">
      <div className="custom-tog">
        <div className="head">
          <ul className="nav-menu-main">
            <li>
              <Link to="/signup">Number of players</Link>
            </li>
            <li>
              <Link to="/play">Total bets</Link>
            </li>
            <li>
              <Link to="/results">Total winnings</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="back">
        <div className="user">
        <FontAwesomeIcon icon={faUser} />
        {loggedInCount}
        </div>
        <div className="user">
        <FontAwesomeIcon icon={faCoins}/>
        </div>
        <div className="user">
        <FontAwesomeIcon icon={faSackDollar} />
        </div>
      </div>
      <div className="betting">
        
      </div>
      <table className="tab">
        <thead>
          <tr>
            <th>USER</th>
            <th>AMOUNT</th>
            <th>MULTIPLIER</th>
            <th>CASH OUT</th>
          </tr>
        </thead>
        <tbody>
          {data
            .slice()
            .reverse()
            .map((row, index) => (
              <tr key={index}>
                <td>{row.username}</td>
                <td>{row.amount}</td>
                <td>{row.point}</td>
                <td>{row.cash}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Sidetable;
