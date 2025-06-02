import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { t, i18n } = useTranslation();

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const closeDropdown = () => setIsDropdownOpen(false);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isRTL = i18n.language === "fa" || i18n.language === "ar";

  return (
    <nav
      className={`navbar navbar-expand-sm navbar-dark bg-dark fixed-top ${
        isRTL ? "text-end" : ""
      }`}
      style={{
        paddingTop: "2px",
        paddingBottom: "2px",
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      <div className="container-fluid">
        {/* Mobile toggle */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleDropdown}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse justify-content-${
            isRTL ? "start" : "end"
          } ${isDropdownOpen ? "show" : ""}`}
        >
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
                style={{ fontSize: "14px" }}
                onClick={closeDropdown}
              >
                {t("User")}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/officer"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
                style={{ fontSize: "14px" }}
                onClick={closeDropdown}
              >
                {t("Officer")}
              </NavLink>
            </li>

            <li className="nav-item dropdown" ref={dropdownRef}>
              <span
                className="nav-link dropdown-toggle"
                role="button"
                style={{ fontSize: "14px", cursor: "pointer" }}
                onClick={toggleDropdown}
              >
                {t("Weapon")}
              </span>
              <ul
                className={`dropdown-menu bg-dark ${
                  isDropdownOpen ? "show" : ""
                }`}
                style={{ textAlign: isRTL ? "right" : "left" }}
              >
                <li>
                  <NavLink
                    to="/inWeapon"
                    className="dropdown-item"
                    onClick={closeDropdown}
                    style={{
                      color: "white",
                      backgroundColor: "transparent",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#343a40")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "transparent")
                    }
                  >
                    {t("Pending Weapons")}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/weaponHistory"
                    className="dropdown-item"
                    onClick={closeDropdown}
                    style={{
                      color: "white",
                      backgroundColor: "transparent",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#343a40")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "transparent")
                    }
                  >
                    {t("Weapon History")}
                  </NavLink>
                </li>
              </ul>
            </li>

            {/* Logo to far side */}
            <li className="nav-item ms-2">
              <Link to="/home" className="navbar-brand">
                <img src="/moi.png" alt="Logo" style={{ height: "60px" }} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
