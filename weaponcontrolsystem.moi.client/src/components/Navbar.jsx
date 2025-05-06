import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top" style={{ paddingTop: '2px', paddingBottom: '2px' }}>
      <div className="container-fluid p-0 d-flex justify-content-between align-items-center">
        {/* Left: Nav Links */}
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/officer" style={{ fontSize: '14px' }}>
                Add Officer
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register" style={{ fontSize: '14px' }}>
                Add User
              </Link>
            </li>
          </ul>
        </div>

        {/* Right: Logo */}
        <Link className="ms-auto" to="/" style={{ padding: '0', margin: '0' }}>
          <img
            src="/moi.png"
            alt="Logo"
            className="d-inline-block align-top img-fluid"
            style={{ maxWidth: '25%' }}
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
