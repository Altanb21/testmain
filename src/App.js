import "./index.css";
import Canvas from "./components/Canvas/Canvas";
import Navbar from "./components/Navbar/Navbar";
import Controls from "./components/Controls/Controls";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Results from "./components/Results/Results";
import { Routes, Route, BrowserRouter } from "react-router-dom";
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/results" element={<Results />} />
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