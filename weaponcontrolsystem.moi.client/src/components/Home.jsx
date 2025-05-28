import React, { use, useState } from "react";
import Navbar from "./Navbar";
import { FaSearch, FaClipboardList, FaIdCard } from "react-icons/fa";
import StatCard from "./StatsCard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Home() {
  const [phoneNo, setphoneNo] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [pendingWeaponsCount, setPendingWeaponsCount] = useState(0);
  useEffect(() => {
    // Set body background image when component mounts
    document.body.style.backgroundImage = `
  linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
  url('/moi.jpg')
`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundPosition = "";
      document.body.style.backgroundRepeat = "";
    };
  }, []);
  const navigate = useNavigate();
  const searchOfficer = async () => {
    if (phoneNo.trim() !== "") {
      var response = await fetch(
        `https://localhost:7211/api/officer/by-Phone/${phoneNo}`
      );
      var data = await response.json();
      console.log(data);
      if (data) {
        navigate("/weapon", {
          state: {
            officer: data.id,
          },
        });
      } else {
        alert("Officer not found");
      }
      // Reset the input field
      setphoneNo("");
    }
  };
  const checkoutWeapon = () => {};
  const pendingWeapons = () => {};
  return (
    <div>
      <Navbar />
      <div className="container my-5">
        <div className="row g-4 justify-content-center">
          {/* Find Officer Card */}
          <div className="col-md-3 d-flex">
            <div className="card shadow-lg rounded-3 w-100 h-100 d-flex flex-column bg-success bg-gradient text-white">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  <FaSearch className="me-2" />
                  Find Officer
                </h5>
                <input
                  type="search"
                  placeholder="🔍 Search Officer"
                  className="form-control shadow-sm rounded-pill mb-3 text-dark"
                  value={phoneNo}
                  onChange={(e) => setphoneNo(e.target.value)}
                />
                <div className="mt-auto">
                  <button
                    className="btn btn-outline-light rounded-pill w-100 fw-bold"
                    onClick={searchOfficer}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Checkout Weapon's Card */}
          <div className="col-md-3 d-flex">
            <div className="card shadow-lg rounded-3 w-100 h-100 d-flex flex-column bg-success bg-gradient text-white">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  <FaSearch className="me-2" />
                  Checkout Weapon
                </h5>
                <input
                  type="search"
                  placeholder="🔍 Search Card No"
                  className="form-control shadow-sm rounded-pill mb-3 text-dark"
                />

                <div className="mt-auto">
                  <button
                    className="btn btn-outline-light rounded-pill w-100 fw-bold"
                    onClick={checkoutWeapon}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Pending Weapons Stat Card */}
          <div className="col-md-3">
            <div className="card shadow-lg border-0 rounded-3 hover-effect bg-secondary bg-gradient">
              <div className="card-body text-center p-4">
                <div className="icon-container bg-white-20 d-inline-flex rounded-circle p-3 mb-3">
                  <FaClipboardList className="fs-2 text-white" />
                </div>
                <h6 className="text-uppercase text-white letter-spacing-1 mb-2">
                  Pending Weapons
                </h6>
                <h1 className="text-white mb-0">54</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
