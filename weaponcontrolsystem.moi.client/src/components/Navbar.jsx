import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            <li className="nav-item dropdown" ref={dropdownRef}>
              <span
                className="nav-link dropdown-toggle"
                role="button"
                style={{ fontSize: "14px", cursor: "pointer" }}
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              >
                Weapon
              </span>
              <ul
                className={`dropdown-menu bg-dark ${
                  isDropdownOpen ? "show" : ""
                }`}
              >
                <li>
                  <NavLink
                    to="/inWeapon"
                    className="dropdown-item"
                    onClick={closeDropdown}
                    style={{ color: "white", backgroundColor: "transparent" }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#343a40")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "transparent")
                    }
                  >
                    Pending Weapons
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/weaponHistory"
                    className="dropdown-item"
                    onClick={closeDropdown}
                    style={{ color: "white", backgroundColor: "transparent" }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#343a40")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "transparent")
                    }
                  >
                    Weapon History
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
