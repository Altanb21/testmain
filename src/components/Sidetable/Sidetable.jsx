import React, { useState, useEffect } from "react";
import "./Sidetable.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { auth } from "../../firebase";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
const Sidetable = (pros) => {
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUsername(user.displayName);
      } else setUsername("");
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
        <div className="betss">
          <p>
            Total Bets : <span>0</span>
          </p>
        </div>
        <div className="prev">
          <FontAwesomeIcon className="clock" icon={faClock} />
          <p className="hand">Previous Hand</p>
        </div>
      </div>
      <table className="tab">
        <thead>
          <tr>
            <th>USER</th>
            <th>BET</th>
            <th>MULTIPLIER</th>
            <th>CASH OUT</th>
          </tr>
        </thead>
        <tbody>
    {data.map((row, index) => (
      <tr key={index}>
        <td>{row.username}</td>
        <td>{row.amount}</td>
        <td>{row.multiplier}</td>
        <td>{row.cash}</td>
      </tr>
    ))}
  </tbody>
      </table>
    </div>
  );
};

export default Sidetable;
