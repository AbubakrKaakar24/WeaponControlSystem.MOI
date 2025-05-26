import React from "react";
import Navbar from "./Navbar";
import { FaSearch, FaClipboardList, FaIdCard } from "react-icons/fa";
import StatCard from "./StatsCard";
import { useEffect } from "react";
function Home() {
  useEffect(() => {
    // Set body background image when component mounts
    document.body.style.backgroundImage = `
  linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
  url('/moi.jpg')
`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";

    // Optional: clean up on unmount
    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundPosition = "";
      document.body.style.backgroundRepeat = "";
    };
  }, []);
  return (
    <div>
      <Navbar />
      <div className="container my-5">
        <div className="row g-4 justify-content-center">
          {/* Find Officer Card */}
          <div className="col-md-4">
            <div className="card shadow-sm rounded-4 border-success">
              <div className="card-body">
                <h5 className="card-title text-success">
                  <FaSearch className="me-2" />
                  Find Officer
                </h5>
                <input
                  type="search"
                  placeholder="🔍 Search Officer"
                  className="form-control shadow-sm rounded-pill mb-3"
                />
                <div className="d-grid">
                  <button className="btn btn-success rounded-pill">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Weapons Stat Card */}
          <div className="col-md-4">
            <div className="card shadow-sm rounded-4 border-warning">
              <div className="card-body text-center">
                <h5 className="card-title text-warning">
                  <FaClipboardList className="me-2" />
                  Pending Weapons
                </h5>
                <h1 className="text-dark">54</h1>
              </div>
            </div>
          </div>

          {/* Next Card Number */}
          <div className="col-md-4">
            <div className="card shadow-sm rounded-4 border-info">
              <div className="card-body text-center">
                <h5 className="card-title text-info">
                  <FaIdCard className="me-2" />
                  Next Card
                </h5>
                <h1 className="text-dark">42</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
