import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Home from "./components/Home";
import OfficerAdd from "./components/OfficerAdd";
import RegisterUser from "./components/auth/RegisterUser";
import WeaponAdd from "./components/WeaponAdd";
import "./App.css";
import InWeapon from "./components/InWeapons";
import WeaponHistory from "./components/WeaponHistory";
import ProtectedRoute from "./components/ProtectedRoute";
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
