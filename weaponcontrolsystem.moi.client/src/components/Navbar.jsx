import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark" style={{ paddingTop: '5px', paddingBottom: '5px' }}>
      {/* Use container-fluid for full width */}
      <div className="container-fluid p-0">
        <Link className="navbar-brand" to="/" style={{ padding: '0', margin: '0' }}>
          {/* Logo */}
          <img
            src="/moi.png"
            alt="Logo"
            className="d-inline-block align-top img-fluid"
            style={{ maxWidth: '25%' }} // Adjust logo size
          />
        </Link>

        {/* Toggler for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Right aligned items */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/home" style={{ fontSize: '14px' }}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" style={{ fontSize: '14px' }}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services" style={{ fontSize: '14px' }}>
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact" style={{ fontSize: '14px' }}>
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-primary text-white" to="/login" style={{ fontSize: '14px' }}>
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
