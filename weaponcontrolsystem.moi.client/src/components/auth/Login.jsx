import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import { withTranslation } from "react-i18next";
import "../../i18n"; // Import your i18n configuration
import { t } from "i18next";
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
  componentDidMount() {
    document.body.style.backgroundImage = `
    linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    url('/moi.jpg')
  `;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
  }

  componentWillUnmount() {
    document.body.style.backgroundImage = "";
    document.body.style.backgroundSize = "";
    document.body.style.backgroundPosition = "";
    document.body.style.backgroundRepeat = "";
  }

  handleBlur = (e) => {
    const { name, value } = e.target;
    let errors = this.state.errors;

    switch (name) {
      case "email":
        errors.email =
          value.length < 1
            ? t("Error email required")
            : !/\S+@\S+\.\S+/.test(value)
            ? t("Error email invalid")
            : "";
        break;
      case "password":
        errors.password =
          value.length < 1
            ? t("Error password required")
            : value.length < 6
            ? t("Password must be at least 6 characters")
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
    const { t } = this.props; // Translation function from withTranslation HOC
    // Manual validation for email and password
    if (!email) errors.email = t("Error email required");
    else if (!/\S+@\S+\.\S+/.test(email))
      errors.email = t("Error email invalid");

    if (!password) errors.password = t("Error password required");
    else if (password.length < 6)
      errors.password = t("Password must be at least 6 characters");

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
    const { t } = this.props; // Translation function from withTranslation HOC
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card shadow" style={{ width: "24rem" }}>
          <div className="card-body">
            <img
              src="/moi.png"
              alt="Logo"
              className="img-fluid mb-3"
              style={{ height: "150px", display: "block", margin: "0 auto" }}
            />
            <h5 className="text-center mb-4">
              {t("Ministry of Internal Affairs")}
            </h5>
            <h4 className="text-center mb-4">{t("Login")}</h4>
            <form onSubmit={this.handleSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder={t("Enter Email")}
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  onBlur={this.handleBlur}
                />
                <div className="text-danger">{this.state.errors.email}</div>
              </div>
              <div className="mb-3 mt-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder={t("Enter Password")}
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  onBlur={this.handleBlur}
                />
                <div className="text-danger">{this.state.errors.password}</div>
              </div>
              <button className="btn btn-primary w-100 mt-2" type="submit">
                {t("Login")}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(Login);
