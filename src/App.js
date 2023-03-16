import "./index.css";
import Canvas from "./components/Canvas/Canvas";
import Navbar from "./components/Navbar/Navbar";
import Controls from "./components/Controls/Controls";
import Login from "./components/Login/Login";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path = '/' element={<Login />}/>
        <Route
          path="/play"
          element={
            <>
              <Navbar />
              <Canvas />
              <Controls />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;