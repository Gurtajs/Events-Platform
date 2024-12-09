import "./App.css";
import Events from "./components/Events";
import NavBar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import {Login} from "./components/UserLogin";
import {Signup} from "./components/UserSignup";
import UserHome from "./components/UserHome"
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <AuthProvider>
    <div className="p-2">
      <NavBar />
      <Routes>
        <Route path="/" element={<Events />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Signup/>}></Route>
        <Route path="/home" element={<UserHome/>}></Route>
      </Routes>
    </div>
    </AuthProvider>
  );
}

export default App;
