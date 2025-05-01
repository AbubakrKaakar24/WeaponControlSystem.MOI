import React, { Component } from "react";

class Login extends Component {
  state = {};

  render() {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card shadow" style={{ width: "24rem" }}>
          <div className="card-body">
            <h4 className="text-center mb-4">Login</h4>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" placeholder="Enter email" />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" placeholder="Enter password" />
            </div>
            <button className="btn btn-primary w-100" onClick={() => alert("Logged in!")}>
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
