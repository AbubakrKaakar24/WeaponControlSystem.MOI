import React, { Component } from "react";
import { Navigate } from "react-router-dom";
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
        errors.email = value.length < 1 ? "Email is required" : !/\S+@\S+\.\S+/.test(value) ? "Email is invalid" : "";
        break;
      case "password":
        errors.password = value.length < 1 ?"Password is required":value.length<6? "Password must be at least 6 characters" : "";
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
  
    if (!email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid";
  
    if (!password) errors.password = "Password is required";
    else if (password.length < 6) errors.password = "Password must be at least 6 characters";
   
    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
    } else {
      this.setState({ email: "", password: "", errors: {}, redirect: true });
      this.props.history.push("/home"); // Redirect to home page
    }
  };
  
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
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
