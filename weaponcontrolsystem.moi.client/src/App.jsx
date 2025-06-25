import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Home from "./components/common/Home";
import OfficerAdd from "./components/officer/OfficerAdd";
import RegisterUser from "./components/auth/RegisterUser";
import WeaponAdd from "./components/weapon/WeaponAdd";
import "./App.css";
import "./assets/fonts/fonts.css";
import InWeapon from "./components/weapon/InWeapons";
import WeaponHistory from "./components/weapon/WeaponHistory";
import ProtectedRoute from "./components/common/ProtectedRoute";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/officer" element={<OfficerAdd />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/weapon" element={<WeaponAdd />} />
          <Route path="/inWeapon" element={<InWeapon />} />
          <Route path="/weaponHistory" element={<WeaponHistory />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
