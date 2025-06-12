import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faSignOutAlt } from "@fortawesome/free-solid-svg-icons"; // free solid icons
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const languageRef = useRef(null);
  const { t, i18n } = useTranslation();
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const closeDropdown = () => setIsDropdownOpen(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const toggleLangDropdown = () => {
    setIsLangDropdownOpen((prev) => !prev);
  };

  const changeLanguage = (langCode) => {
    console.log(`Changing language to ${langCode}`);
    i18n.changeLanguage(langCode);
    setIsLangDropdownOpen(false);
    console.log(`Language changed to ${i18n.language}`);
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    const result = Swal.fire({
      title: t("Are you sure?"),
      text: t("You will be logged out"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: t("Cancel"),
      confirmButtonText: t("Yes, logout"),
    });
    result.then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        navigate("/login");
        console.log("User logged out");
      }
    });
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  var isRTL = i18n.language === "fa" || i18n.language === "ps";
  isRTL = false;
  return (
    <nav
      className={`navbar navbar-expand-sm navbar-dark bg-dark fixed-top ${
        isRTL ? "text-end" : "text-start"
      }`}
      style={{
        paddingTop: "2px",
        paddingBottom: "2px",
        direction: isRTL ? "rtl" : "ltr",
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* LEFT SIDE ICONS */}
        <div className="d-flex align-items-center">
          {/* Logout Icon */}
          <div className="nav-item me-3">
            <span
              className="nav-link text-white"
              role="button"
              onClick={handleLogout}
              style={{ cursor: "pointer" }}
            >
              <FontAwesomeIcon
                icon={faSignOutAlt}
                size="2x"
                style={{ transform: "scaleX(-1)" }}
              />
            </span>
          </div>

          {/* Language Dropdown */}
          <div className="nav-item dropdown me-3">
            <span
              className="nav-link dropdown-toggle text-white"
              role="button"
              onClick={toggleLangDropdown}
              style={{ cursor: "pointer" }}
            >
              <FontAwesomeIcon icon={faGlobe} size="2x" />
            </span>
            <ul
              className={`dropdown-menu dropdown-menu-dark ${
                isLangDropdownOpen ? "show" : ""
              }`}
              style={{ textAlign: isRTL ? "right" : "left" }}
              ref={languageRef}
            >
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => changeLanguage("fa")}
                >
                  Dari
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => changeLanguage("ps")}
                >
                  Pashto
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT SIDE: NAVBAR LINKS + COLLAPSE */}
        <div className="d-flex align-items-center">
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
                  style={{ fontSize: "20px" }}
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
                  style={{ fontSize: "20px" }}
                  onClick={closeDropdown}
                >
                  {t("Officer")}
                </NavLink>
              </li>

              {/* Weapon Dropdown */}
              <li className="nav-item dropdown" ref={dropdownRef}>
                <span
                  className="nav-link dropdown-toggle"
                  role="button"
                  style={{ fontSize: "20px", cursor: "pointer" }}
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

              {/* Logo */}
              <li className="nav-item ms-2">
                <Link to="/home" className="navbar-brand">
                  <img src="/moi.png" alt="Logo" style={{ height: "80px" }} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
