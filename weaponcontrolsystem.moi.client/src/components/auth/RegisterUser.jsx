import React, { Component } from "react";
import AddUserModal from "../AddUserModel";
import ministryData from "../../assets/ministryData.json";
import Swal from "sweetalert2";
import Navbar from "../Navbar";
import DataTable from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css";
import { withTranslation } from "react-i18next";

class RegisterUser extends Component {
  state = {
    showModal: false,
    header: "Add New User",
    users: [],
    AllUsers: [],
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
    errors: {},
  };

  async componentDidMount() {
    await this.fetchUsers();
  }

  fetchUsers = async () => {
    const response = await fetch("https://localhost:7211/api/users");
    const data = await response.json();
    this.setState({ users: data, AllUsers: data });
  };

  toggleModal = () => {
    const { t } = this.props;
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
      header: t("Add New User"),
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
    }));
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      formData: {
        ...this.state.formData,
        [name]: value,
      },
    });
  };

  handleSelectChange = (name, value) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [name]: value,
      },
    });
  };

  validateForm = () => {
    const { t } = this.props;
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

    if (!firstName) errors.firstName = t("Error first name required");
    if (!lastName) errors.lastName = t("Error last name required");
    if (!phoneNo) errors.phoneNo = t("Phone number required");
    else if (!/^[0-9]+$/.test(phoneNo))
      errors.phoneNo = t("Phone number invalid");
    else if (phoneNo.length < 10)
      errors.phoneNo = t("Phone number must be at least 10 digits");
    else if (phoneNo.length > 15)
      errors.phoneNo = t("Phone number must not exceed 15 digits");
    if (!email) errors.email = t("Error email required");
    else if (!/\S+@\S+\.\S+/.test(email))
      errors.email = t("Error email invalid");
    if (!role) errors.role = t("Error role required");
    if (!gate) errors.gate = t("Error gate required");
    if (!password) errors.password = t("Error password required");
    else if (password.length < 8)
      errors.password = t("Password must be at least 8 characters");
    if (!confirmPassword)
      errors.confirmPassword = t("Error confirm password required");
    else if (password !== confirmPassword)
      errors.confirmPassword = t("Passwords do not match");

    return errors;
  };

  handleDelete = async (userId) => {
    const result = await Swal.fire({
      title: this.props.t("Are you sure?"),
      text: this.props.t("You won't be able to revert this!"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: this.props.t("Yes, delete it!"),
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `https://localhost:7211/api/users/${userId}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.ok) {
          Swal.fire(
            this.props.t("Deleted!"),
            this.props.t("User has been deleted."),
            "success"
          );
          this.fetchUsers();
        } else {
          const errorData = await response.json();
          Swal.fire({
            icon: "error",
            title: this.props.t("Error"),
            text: errorData.message,
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: this.props.t("Error"),
          text: this.props.t("Failed to delete user."),
        });
      }
    }
  };

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
      header: this.props.t("Edit User"),
    });
  };

  handleSubmit = async () => {
    const { t } = this.props;
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
    const Method = this.state.header === t("Add New User") ? "POST" : "PUT";
    const url =
      Method === "POST"
        ? "https://localhost:7211/api/users"
        : `https://localhost:7211/api/users/${this.state.formData.id}`;

    try {
      const response = await fetch(url, {
        method: Method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: this.props.t("Success"),
          text: this.props.t("User registered successfully!"),
        });
        this.fetchUsers();
        this.setState({
          showModal: false,
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
          header: this.props.t("Add New User"),
          errors: {},
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: this.props.t("Error"),
          text: errorData.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: this.props.t("Error"),
        text: error.message,
      });
    }
  };

  searchUser = (e) => {
    const value = e.target.value.toLowerCase();
    const filteredUsers = value
      ? this.state.AllUsers.filter((user) =>
          user.name.toLowerCase().includes(value)
        )
      : this.state.AllUsers;
    this.setState({ users: filteredUsers });
  };

  render() {
    const { t, i18n } = this.props;
    const isRTL = i18n.dir() === "rtl";

    const columns = [
      { name: t("First name"), selector: (row) => row.name, sortable: true },
      { name: t("Last name"), selector: (row) => row.lastName, sortable: true },
      { name: t("Phone no"), selector: (row) => row.phone, sortable: true },
      { name: t("Email"), selector: (row) => row.email, sortable: true },
      { name: t("Role"), selector: (row) => row.role, sortable: true },
      { name: t("Gate"), selector: (row) => row.gate, sortable: true },
      {
        name: t("Actions"),
        cell: (row) => (
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <i
              className="fa fa-trash fa-2x"
              style={{ cursor: "pointer", color: "#DC3545" }}
              onClick={() => this.handleDelete(row.id)}
            />
            <i
              className="fa fa-edit fa-2x"
              style={{ cursor: "pointer", color: "#FFC107" }}
              onClick={() => this.handleEdit(row.id)}
            />
          </div>
        ),
      },
    ];

    const rows = this.state.users.map((user) => ({
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      role: user.role,
      gate: user.gate,
    }));
    const paginationOptions = {
      rowsPerPageText: t("RowsPerPage"),
      rangeSeparatorText: t("Of"),
      selectAllRowsItem: true,
      selectAllRowsItemText: t("All"),
    };
    return (
      <div className="bg-light min-vh-100" dir={isRTL ? "rtl" : "ltr"}>
        <Navbar />
        <div className="container py-5 mt-5">
          <div className="card shadow-lg border-0">
            <div className="card-body">
              <div className="d-flex justify-content-end">
                <input
                  type="search"
                  name="searchUser"
                  placeholder={t("Search User") + " 🔍"}
                  className="form-control w-50 shadow-sm rounded-pill"
                  style={{ maxWidth: "300px" }}
                  onChange={this.searchUser}
                />
              </div>
              <h3 className="mb-4 fw-bold text-primary text-center">
                {t("Registered Users")}
              </h3>
              <DataTable
                columns={columns}
                data={rows}
                pagination
                persistTableHead
                striped
                highlightOnHover
                paginationComponentOptions={paginationOptions}
                noDataComponent={t("No Data")}
              />
              <div className="text-start">
                <button
                  className="btn btn-primary shadow"
                  onClick={this.toggleModal}
                >
                  {t("Add user")}
                </button>
              </div>
              <AddUserModal
                show={this.state.showModal}
                handleClose={this.toggleModal}
                header={this.state.header}
                formData={this.state.formData}
                errors={this.state.errors}
                handleChange={this.handleChange}
                handleSelectChange={this.handleSelectChange}
                handleSubmit={this.handleSubmit}
                onHide={this.toggleModal}
                onSubmit={this.handleSubmit}
                roleOptions={ministryData.roles.map((role) => ({
                  value: role,
                  label: role,
                }))}
                gateOptions={ministryData.gates.map((gate) => ({
                  value: gate,
                  label: gate,
                }))}
                t={t}
                dir={isRTL ? "rtl" : "ltr"}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(RegisterUser);
