import React, { Component } from "react";
import AddUserModal from "../AddUserModel"; // Adjust the path if needed
import ministryData from "../../assets/ministryData.json";
import Swal from "sweetalert2";
import Navbar from "../Navbar"; // Adjust the path if needed
import { div, head, u } from "framer-motion/client";
class RegisterUser extends Component {
  state = {
    showModal: false,
    header: "Add New User",
    users: [], // To manage modal visibility
    formData: {
      id: "",
      firstName: "",
      lastName: "",
      phoneNo: "",
      email: "",
      role: "",
      gate: "",
      password: "",
      confirmPassword: "",
    },
    errors: {
      firstName: "",
      lastName: "",
      phoneNo: "",
      email: "",
      role: "",
      gate: "",
      password: "",
      confirmPassword: "",
    },
  };
  async componentDidMount() {
    // Fetch users from the API
    await this.fetchUsers();
  }
  fetchUsers = async () => {
    const response = await fetch("https://localhost:7211/api/users");
    const data = await response.json();
    this.setState({ users: data });
    console.log("Fetched users:", data);
  };

  // Toggle modal visibility
  toggleModal = () => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
    }));
  };

  // Handle input field change
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      formData: {
        ...this.state.formData,
        [name]: value,
      },
    });
  };

  // Handle select field change (dropdown)
  handleSelectChange = (name, value) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [name]: value,
      },
    });
  };

  // Handle form validation
  validateForm = () => {
    const {
      firstName,
      lastName,
      phoneNo,
      email,
      role,
      gate,
      password,
      confirmPassword,
    } = this.state.formData;
    const errors = {};

    if (!firstName) errors.firstName = "First name is required";
    if (!lastName) errors.lastName = "Last name is required";
    if (!phoneNo) errors.phoneNo = "Phone number is required";
    else if (!/^\d+$/.test(phoneNo)) errors.phoneNo = "Phone number is invalid";
    else if (phoneNo.length < 10)
      errors.phoneNo = "Phone number must be at least 10 digits";
    else if (phoneNo.length > 15)
      errors.phoneNo = "Phone number must be at most 15 digits";
    if (!email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid";
    if (!role) errors.role = "Role is required";
    if (!gate) errors.gate = "Gate is required";
    if (!password) errors.password = "Password is required";
    else if (password.length < 8)
      errors.password = "Password must be at least 8 characters long";
    if (!confirmPassword)
      errors.confirmPassword = "Confirm password is required";
    else if (password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match";

    return errors;
  };
  // Handle delete user
  handleDelete = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `https://localhost:7211/api/users/${userId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          Swal.fire("Deleted!", "User has been deleted.", "success");
          this.fetchUsers(); // Refresh the user list
        } else {
          const errorData = await response.json();
          console.log("Error:", errorData);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: errorData.message,
          });
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete user.",
        });
      }
    }
  };
  // Handle edit user
  handleEdit = async (userId) => {
    const response = await fetch(`https://localhost:7211/api/users/${userId}`);
    const user = await response.json();
    this.setState({
      formData: {
        id: user.id,
        firstName: user.name,
        lastName: user.lastName,
        phoneNo: user.phone,
        email: user.email,
        role: user.role,
        gate: user.gate,
        password: user.password,
        confirmPassword: user.password,
      },
      showModal: true,
      header: "Edit User",
    });
  };

  // Handle form submission
  handleSubmit = async () => {
    const errors = this.validateForm();

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    const { firstName, lastName, phoneNo, email, role, gate, password } =
      this.state.formData;
    const userData = {
      Name: firstName,
      LastName: lastName,
      Phone: phoneNo,
      Email: email,
      Role: role,
      Gate: gate,
      Password: password,
    };
    var Method = this.state.header === "Add New User" ? "POST" : "PUT";
    var url =
      this.state.header === "Add New User"
        ? "https://localhost:7211/api/users"
        : "https://localhost:7211/api/users/" + this.state.formData.id;
    try {
      const response = await fetch(url, {
        method: Method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        this.setState({
          showModal: false,

          formData: {
            firstName: "",
            lastName: "",
            phoneNo: "",
            email: "",
            role: "",
            gate: "",
            password: "",
            confirmPassword: "",
            header: "Add New User",
          },
          errors: {},
        });
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "User registered successfully!",
        });
        this.fetchUsers(); // Refresh the user list
      } else {
        const errorData = await response.json();
        console.log("Error:", errorData);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorData.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
    this.setState({
      formData: {
        firstName: "",
        lastName: "",
        phoneNo: "",
        email: "",
        role: "",
        gate: "",
        password: "",
        confirmPassword: "",
      },
      errors: {},
      header: "Add New User",
    });
  };

  render() {
    const roleOptions = ministryData.roles.map((role) => ({
      value: role,
      label: role,
    }));

    const gateOptions = ministryData.gates.map((gate) => ({
      value: gate,
      label: gate,
    }));

    return (
      <div className="bg-light min-vh-100">
        <Navbar />

        <div className="container py-5 mt-5">
          <div className="card shadow-lg border-0">
            <div className="card-body">
              {this.state.users.length > 0 ? (
                <div>
                  <h3 className="mb-4 fw-bold text-primary">List of Users</h3>
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone No</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Gate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.users.map((user) => (
                        <tr key={user.id}>
                          <td>{user.name}</td>
                          <td>{user.lastName}</td>
                          <td>{user.phone}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          <td>{user.gate}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-danger rounded"
                              onClick={() => this.handleDelete(user.id)}
                            >
                              <i className="fa fa-trash"></i>{" "}
                              {/* Font Awesome Trash Icon */}
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-warning rounded"
                              onClick={() => this.handleEdit(user.id)}
                            >
                              <i className="fa fa-edit"></i>{" "}
                              {/* Font Awesome Edit Icon */}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>No users found.</p>
              )}

              <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-primary" onClick={this.toggleModal}>
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Component */}
        <AddUserModal
          show={this.state.showModal}
          onHide={this.toggleModal}
          onSubmit={this.handleSubmit}
          roleOptions={roleOptions}
          gateOptions={gateOptions}
          formData={this.state.formData}
          errors={this.state.errors}
          handleChange={this.handleChange}
          handleSelectChange={this.handleSelectChange}
          header={this.state.header}
        />
      </div>
    );
  }
}

export default RegisterUser;
