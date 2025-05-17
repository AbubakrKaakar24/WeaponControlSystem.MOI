import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Home from "./components/Home";
import OfficerAdd from "./components/OfficerAdd";
import RegisterUser from "./components/auth/RegisterUser";
import WeaponAdd from "./components/WeaponAdd";
import "./App.css";
import InWeapon from "./components/InWeapons";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/officer" element={<OfficerAdd />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/weapon" element={<WeaponAdd />} />
        <Route path="/inWeapon" element={<InWeapon />} />
      </Routes>
    </Router>
  );
}

export default App;
