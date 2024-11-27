import "./App.css";
import Events from "./components/Events";
import NavBar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";

function App() {
  return (
    <div className="p-2">
      <NavBar />
      <Routes>
        <Route path="/" element={<Events />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Registration/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
