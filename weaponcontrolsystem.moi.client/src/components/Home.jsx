import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
function Home() {
  return (
    <React.Fragment>
    <Navbar />
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-gradient">
      <div className="text-center p-5 bg-white shadow rounded-lg w-100 w-md-50">
        <h1 className="display-4 mb-4 text-primary">Welcome to the Home Page</h1>
        <p className="lead mb-5 text-muted">
          This is a simple app to demonstrate React Router. Navigate to the Login page using the button below!
        </p>
        <Link to="/login" className="btn btn-primary btn-lg">Go to Login</Link>
      </div>
    </div>
    </React.Fragment>
  );
}

export default Home;
