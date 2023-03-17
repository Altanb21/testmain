import React, { useEffect, useState } from "react";
import "./Results.css";
import { DataGrid } from "@mui/x-data-grid";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { auth } from "../../firebase";

const Results = (props) => {
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
  const columns = [
    {
      field: "name",
      headerName: "Username",
      width: 250,
    },
    { field: "value", headerName: "First Bet", width: 250 },
    { field: "value2", headerName: "Second Bet", width: 200 },
    { field: "point", headerName: "Multiplier", width: 200 },
    { field: "cash", headerName: "Cashout", width: 200 },
    { field: "cash2", headerName: "Cashout2", width: 200 },
  ];
  return (
    <div className="results">
      <div className="card-body">
        <div style={{ height: 700, width: "100%" }}>
          <DataGrid
            rows={data}
            columns={columns}
            style={{ color: "black", backgroundColor: "white" }}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
};

export default Results;
