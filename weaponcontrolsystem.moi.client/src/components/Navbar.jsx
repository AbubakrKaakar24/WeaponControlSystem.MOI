import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);

  return (
    <nav
      className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top"
      style={{ paddingTop: "2px", paddingBottom: "2px" }}
    >
      <div className="container-fluid">
        {/* Logo on the left */}
        <Link to="/" className="navbar-brand">
          <img
            src="/moi.png"
            alt="Logo"
            style={{ height: "60px" }} // Fixed height works better
          />
        </Link>

        {/* Mobile toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleDropdown}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation links - pushed to right */}
        <div
          className={`collapse navbar-collapse ${isDropdownOpen ? "show" : ""}`}
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                to="/officer"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
                style={{ fontSize: "14px" }}
                onClick={closeDropdown}
              >
                Officer
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
                style={{ fontSize: "14px" }}
                onClick={closeDropdown}
              >
                User
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/weapon"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
                style={{ fontSize: "14px" }}
                onClick={closeDropdown}
              >
                Weapon
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
