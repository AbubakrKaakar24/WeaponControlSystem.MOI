// Sidebar.js
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSignOutAlt,
  faCog,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({
  isOpen,
  onClose,
  handleLogout,
  changeLanguage,
  toggleLangDropdown,
  isLangDropdownOpen,
  isRTL,
}) => {
  return (
    <div
      className={`sidebar bg-dark text-white position-fixed top-0 start-0 h-100 p-4 shadow-lg ${
        isOpen ? "sidebar-open" : "sidebar-closed"
      }`}
      style={{
        width: "260px",
        zIndex: 1050,
        transition: "transform 0.3s ease-in-out",
      }}
    >
      {/* Close Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="mb-0">User Menu</h5>
        <button className="btn btn-outline-light btn-sm" onClick={onClose}>
          ✖
        </button>
      </div>

      {/* Menu Links */}
      <ul className="list-unstyled">
        <li className="mb-3">
          <span
            className="text-white d-flex align-items-center"
            role="button"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
            Logout
          </span>
        </li>
        <li className="mb-3">
          {/* Language Switcher */}
          <div className="nav-item dropdown me-3">
            <span
              className="nav-link dropdown-toggle text-white"
              role="button"
              onClick={toggleLangDropdown}
              style={{ cursor: "pointer" }}
            >
              <FontAwesomeIcon icon={faGlobe} size="lg" />
            </span>
            <ul
              className={`dropdown-menu dropdown-menu-dark ${
                isLangDropdownOpen ? "show" : ""
              }`}
              style={{ textAlign: isRTL ? "right" : "left" }}
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
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => changeLanguage("en")}
                >
                  English
                </button>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
