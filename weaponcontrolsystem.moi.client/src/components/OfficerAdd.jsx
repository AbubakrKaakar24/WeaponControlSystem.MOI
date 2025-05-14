import React, { Component } from "react";
import Navbar from "./Navbar";
import Dropdown from "./DropDown"; // Your dropdown component
import Swal from "sweetalert2";
import ministryData from "../assets/ministryData.json";
import Select from "react-select";
class OfficerAdd extends Component {
  state = {
    firstName: "",
    lastName: "",
    badgeNo: "",
    deputyMinistry: "",
    directorate: "",
    administration: "",
    base: "",
    deputies: [],
    directorates: [],
    administrations: [],
    bases: [],

    errors: {
      firstName: "",
      lastName: "",
      badgeNo: "",
      deputyMinistry: "",
      directorate: "",
      administration: "",
      base: "",
    },
  };
  componentDidMount() {
    var listofDeputies = ministryData.deputies.map((deputy) => deputy.name);
    var listofDirectorates = ministryData.deputies
      .map((deputy) => deputy.directorates.map((dir) => dir.name))
      .flat();
    var listofAdministrations = ministryData.deputies
      .map((deputy) =>
        deputy.directorates.map((dir) =>
          dir.administrations.map((admin) => admin.name)
        )
      )
      .flat()
      .flat();
    this.setState({
      deputies: listofDeputies,
      directorates: listofDirectorates,
      administrations: listofAdministrations,
      bases: ministryData.Bases,
    });
  }
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleDropdownChange = (name, value) => {
    if (name === "deputyMinistry") {
      const selectedDeputy = ministryData.deputies.find(
        (deputy) => deputy.name === value
      );
      const directorates = selectedDeputy
        ? selectedDeputy.directorates.map((dir) => dir.name)
        : this.state.directorates;
      this.setState({
        deputyMinistry: value,
        directorates,
      });
    } else if (name === "directorate") {
      const selectedDirectorate = ministryData.deputies
        .find((deputy) => deputy.name === this.state.deputyMinistry)
        .directorates.find((dir) => dir.name === value);
      const administrations = selectedDirectorate
        ? selectedDirectorate.administrations.map((admin) => admin.name)
        : this.state.administrations;
      this.setState({
        directorate: value,
        administrations,
      });
    } else if (name === "administration") {
      this.setState({ administration: value });
    } else if (name === "base") {
      this.setState({ base: value });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      badgeNo,
      deputyMinistry,
      directorate,
      administration,
      base,
    } = this.state;
    const errors = {};
    if (!firstName) errors.firstName = "First name is required";
    if (!lastName) errors.lastName = "Last name is required";
    if (!badgeNo) errors.badgeNo = "Badge number is required";
    if (!deputyMinistry) errors.deputyMinistry = "Deputy ministry is required";
    if (!directorate) errors.directorate = "Directorate is required";
    if (!administration) errors.administration = "Administration is required";
    if (!base) errors.base = "Base is required";

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
    } else {
      try {
        const officerData = {
          Name: `${firstName} ${lastName}`, // Combining first and last name
          Base: base,
          Deputy_Ministry: deputyMinistry,
          Directorate: directorate,
          Administration: administration,
          BadgeNo: badgeNo,
        };

        const response = await fetch("https://localhost:7211/api/officer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(officerData),
        });

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Officer Added",
            text: "The officer has been added successfully!",
            timer: 3000,
          });
          this.setState({
            firstName: "",
            lastName: "",
            badgeNo: "",
            deputyMinistry: "",
            directorate: "",
            administration: "",
            base: "",
            errors: {},
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "There was an error adding the officer.",
            timer: 3000,
          });
        }
      } catch (error) {
        console.log("Errors:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
          timer: 3000,
        });
      }
      // Reset form
    }
  };

  handleBlur = (e) => {
    const { name, value } = e.target;
    let errors = this.state.errors;

    switch (name) {
      case "firstName":
        errors.firstName = value.length < 1 ? "First name is required" : "";
        break;
      case "lastName":
        errors.lastName = value.length < 1 ? "Last name is required" : "";
        break;
      case "badgeNo":
        errors.badgeNo = value.length < 1 ? "Badge number is required" : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  render() {
    const deputyOptions = this.state.deputies.map((deputy) => ({
      label: deputy,
      value: deputy,
    }));
    const directorateOptions = this.state.directorates.map((directorate) => ({
      label: directorate,
      value: directorate,
    }));
    const administrationOptions = this.state.administrations.map(
      (administration) => ({
        label: administration,
        value: administration,
      })
    );
    const baseOptions = this.state.bases.map((base) => ({
      label: base,
      value: base,
    }));
    return (
      <div className="bg-light min-vh-100">
        <Navbar />

        <div className="container py-5 mt-5">
          <div className="card shadow-lg border-0">
            <div className="card-body">
              <h3 className="mb-4 fw-bold text-primary">Add New Officer</h3>
              <form noValidate onSubmit={this.handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-3">
                    <label className="form-label fw-semibold">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-control"
                      placeholder="First name"
                      value={this.state.firstName}
                      onChange={this.handleInputChange}
                      onBlur={this.handleBlur}
                    />
                    <div className="text-danger">
                      {this.state.errors.firstName}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label fw-semibold">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-control"
                      placeholder="Last name"
                      value={this.state.lastName}
                      onChange={this.handleInputChange}
                      onBlur={this.handleBlur}
                    />
                    <div className="text-danger">
                      {this.state.errors.lastName}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label fw-semibold">Badge No</label>
                    <input
                      type="text"
                      name="badgeNo"
                      className="form-control"
                      placeholder="Badge Number"
                      value={this.state.badgeNo}
                      onChange={this.handleInputChange}
                      onBlur={this.handleBlur}
                    />
                    <div className="text-danger">
                      {this.state.errors.badgeNo}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label fw-semibold">
                      Deputy Ministry
                    </label>
                    <Select
                      name="deputyMinistry"
                      value={deputyOptions.find(
                        (opt) => opt.value === this.state.deputyMinistry
                      )}
                      options={deputyOptions}
                      onChange={(option) =>
                        this.handleDropdownChange(
                          "deputyMinistry",
                          option.value
                        )
                      }
                      placeholder="Select Deputy Ministry"
                    />
                    <div className="text-danger">
                      {this.state.errors.deputyMinistry}
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-3">
                    <label className="form-label fw-semibold">
                      Deputy Ministry
                    </label>
                    <Select
                      name="deputyMinistry"
                      value={deputyOptions.find(
                        (opt) => opt.value === this.state.deputyMinistry
                      )}
                      options={deputyOptions}
                      onChange={(option) =>
                        this.handleDropdownChange(
                          "deputyMinistry",
                          option.value
                        )
                      }
                      placeholder="Select Deputy Ministry"
                    />
                    <div className="text-danger">
                      {this.state.errors.deputyMinistry}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label fw-semibold">
                      Directorate
                    </label>
                    <Select
                      name="directorate"
                      value={directorateOptions.find(
                        (opt) => opt.value === this.state.directorate
                      )}
                      options={directorateOptions}
                      onChange={(option) =>
                        this.handleDropdownChange("directorate", option.value)
                      }
                      placeholder="Select Directorate"
                    />
                    <div className="text-danger">
                      {this.state.errors.directorate}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label fw-semibold">
                      Administration
                    </label>

                    <Select
                      name="administration"
                      value={administrationOptions.find(
                        (opt) => opt.value === this.state.administration
                      )}
                      options={administrationOptions}
                      onChange={(option) =>
                        this.handleDropdownChange(
                          "administration",
                          option.value
                        )
                      }
                      placeholder="Select Administration"
                    />

                    <div className="text-danger">
                      {this.state.errors.administration}
                    </div>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label fw-semibold">Base</label>

                    <Select
                      name="base"
                      value={baseOptions.find(
                        (opt) => opt.value === this.state.base
                      )}
                      options={baseOptions}
                      onChange={(option) =>
                        this.handleDropdownChange("base", option.value)
                      }
                      placeholder="Select Base"
                    />
                    <div className="text-danger">{this.state.errors.base}</div>
                  </div>
                </div>

                <div className="text-end">
                  <button
                    className="btn btn-primary px-4 py-2 fw-semibold shadow-sm"
                    type="submit"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default OfficerAdd;
