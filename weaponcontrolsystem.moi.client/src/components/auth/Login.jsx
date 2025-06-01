import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {
      email: "",
      password: "",
    },
    redirect: false,
  };

  handleBlur = (e) => {
    const { name, value } = e.target;
    let errors = this.state.errors;

    switch (name) {
      case "email":
        errors.email =
          value.length < 1
            ? "Email is required"
            : !/\S+@\S+\.\S+/.test(value)
            ? "Email is invalid"
            : "";
        break;
      case "password":
        errors.password =
          value.length < 1
            ? "Password is required"
            : value.length < 6
            ? "Password must be at least 6 characters"
            : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const errors = {};

    // Manual validation for email and password
    if (!email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid";

    if (!password) errors.password = "Password is required";
    else if (password.length < 6)
      errors.password = "Password must be at least 6 characters";

    // If errors exist, set them in state
    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
    } else {
      // Clear form and set redirect flag to true
      const { email, password } = this.state;
      const LoginInfo = {
        Email: email,
        Pass: password,
      };
      try {
        const response = await fetch("https://localhost:7211/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(LoginInfo),
        });
        if (response.ok) {
          const data = await response.json();
          const token = data.accessToken;
          localStorage.setItem("token", token);
          localStorage.setItem("userName", data.username);
          console.log("Login successful:", data);
          this.setState({
            email: "",
            password: "",
            errors: {},
            redirect: true,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: "Invalid email or password",
            timer: 3000,
          });
        }
      } catch (error) {
        console.error("Error during login:", error);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
          timer: 3000,
        });
      }
    }
  };
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    // If redirect is true, navigate to /home
    if (this.state.redirect) {
      return <Navigate to="/home" />;
    }

    return (
      <div
        style={{ backgroundImage: "url('/moi.jpg')", backgroundSize: "cover" }}
        className="d-flex justify-content-center align-items-center vh-100"
      >
        <div className="card shadow" style={{ width: "24rem" }}>
          <div className="card-body">
            <h4 className="text-center mb-4">Login</h4>
            <form onSubmit={this.handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  onBlur={this.handleBlur}
                />
                <div className="text-danger">{this.state.errors.email}</div>
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  onBlur={this.handleBlur}
                />
                <div className="text-danger">{this.state.errors.password}</div>
              </div>
              <button className="btn btn-primary w-100" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
