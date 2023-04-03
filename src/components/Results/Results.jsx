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
      field: "username",
      headerName: "Username",
      width: 200,
    },
    { field: "amount", headerName: "Amount1", width: 200 },
    // { field: "multiplier", headerName: "MyMultiplier1", width: 120 },
    // { field: "cash", headerName: "Cashout1", width: 120 },
    { field: "amount2", headerName: "Amount2", width: 150 },
    // { field: "multiplier2", headerName: "MyMultiplier2", width: 120 },
    { field: "cash", headerName: "Cashout", width: 150 },
    { field: "cash2", headerName: "Cashout2", width: 150 },
    { field: "point", headerName: "Random multiplier", width: 150 },
    { field: "prize", headerName: "Prize", width: 150 },
    { field: "result", headerName: "Result", width: 150 },

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
