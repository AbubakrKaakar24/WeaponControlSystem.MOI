import React, { Component } from "react";
import Navbar from "./Navbar";
import Swal from "sweetalert2";
import ministryData from "../assets/ministryData.json";
import AddOfficerModal from "./AddOfficerModel";
import DataTable from "react-data-table-component";
class OfficerAdd extends Component {
  state = {
    header: "Add New Officer",
    showModal: false,
    officers: [],
    allOfficers: [],
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
  fetchOfficers = async () => {
    const response = await fetch("https://localhost:7211/api/officer");
    const data = await response.json();
    this.setState({ officers: data, allOfficers: data });
  };
  async componentDidMount() {
    await this.fetchOfficers();

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
  toggleModal = () => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
      header: "Add New Officer",
      id: "",
      firstName: "",
      lastName: "",
      badgeNo: "",
      deputyMinistry: "",
      directorate: "",
      administration: "",
      base: "",
      errors: {},
    }));
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
  handleDelete = async (officerId) => {
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
          `https://localhost:7211/api/officer/${officerId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          Swal.fire("Deleted!", "Officer has been deleted.", "success");
          this.fetchOfficers();
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
    const response = await fetch(
      `https://localhost:7211/api/officer/${userId}`
    );
    const officer = await response.json();
    console.log(officer);
    this.setState({
      id: userId,
      showModal: true,
      header: "Edit officer",
      firstName: officer.name,
      lastName: officer.name,
      badgeNo: officer.badgeNo,
      deputyMinistry: officer.deputy_Ministry,
      directorate: officer.directorate,
      administration: officer.administration,
      base: officer.base,
    });
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

        var Method = this.state.header === "Add New Officer" ? "POST" : "PUT";
        var url =
          this.state.header === "Add New Officer"
            ? "https://localhost:7211/api/officer"
            : "https://localhost:7211/api/officer/" + this.state.id;

        const response = await fetch(url, {
          method: Method,
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
            showModal: false,
          });
          this.fetchOfficers();
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
    }
  };

  searchOfficer = (e) => {
    if (e.target.value === "")
      this.setState({ officers: this.state.allOfficers });
    else {
      const searchTerm = e.target.value.toLowerCase();
      const FilteredOfficers = this.state.allOfficers.filter((officer) =>
        officer.name.toLowerCase().includes(searchTerm)
      );
      this.setState({ officers: FilteredOfficers });
    }
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

    const columns = [
      {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
      },
      {
        name: "Badge No",
        selector: (row) => row.badgeNo,
        sortable: true,
      },
      {
        name: "Deputy Ministry",
        selector: (row) => row.deputyMinistry,
        sortable: true,
        minWidth: "250px",
      },
      {
        name: "Directorate",
        selector: (row) => row.directorate,
        sortable: true,
      },
      {
        name: "Administration",
        selector: (row) => row.administration,
        sortable: true,
      },
      {
        name: "Base",
        selector: (row) => row.base,
        sortable: true,
      },
      {
        name: "Actions",
        cell: (row) => (
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <i
              className=" fa fa-trash fa-2x"
              style={{
                cursor: "pointer",
                color: "#F4631E", // Bootstrap danger red
                transition: "color 0.3s ease",
              }}
              onClick={() => this.handleDelete(row.id)}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#CB0404")} // darker red
              onMouseLeave={(e) => (e.currentTarget.style.color = "#F4631E")}
            />

            <i
              className="fa fa-edit fa-2x"
              style={{
                cursor: "pointer",
                color: "#FFCF50", // Bootstrap success green
                transition: "color 0.3s ease",
                marginTop: "4px",
              }}
              onClick={() => this.handleEdit(row.id)}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F5C45E")} // darker green
              onMouseLeave={(e) => (e.currentTarget.style.color = "#FFCF50")}
            />
          </div>
        ),
      },
    ];
    const rows = this.state.officers.map((officer) => ({
      id: officer.id,
      name: officer.name,
      badgeNo: officer.badgeNo,
      deputyMinistry: officer.deputy_Ministry,
      directorate: officer.directorate,
      administration: officer.administration,
      base: officer.base,
    }));

    console.log("BadgeNo: " + this.state.badgeNo);
    return (
      <div className="bg-light min-vh-100">
        <Navbar />

        <div className="container py-5 mt-5">
          <div className="card shadow-lg border-0">
            <div className="card-body">
              <div className="d-flex justify-content-end">
                <input
                  type="search"
                  name="searchOfficer"
                  placeholder="🔍 Search Officer"
                  className="form-control w-50 shadow-sm rounded-pill"
                  style={{ maxWidth: "300px" }}
                  onChange={(e) => {
                    this.searchOfficer(e);
                  }}
                />
              </div>
              <h3 className="mb-4 fw-bold text-primary">List of Officers</h3>
              <DataTable
                columns={columns}
                data={rows}
                highlightOnHover
                striped
                responsive
                fixedHeader
                fixedHeaderScrollHeight="400px"
                customStyles={{
                  rows: {
                    style: {
                      minHeight: "50px", // override the row height
                    },
                  },
                  headCells: {
                    style: {
                      backgroundColor: "#f8f9fa",
                      fontWeight: "bold",
                    },
                  },
                  cells: {
                    style: {
                      paddingLeft: "8px", // override the cell padding for data cells
                      paddingRight: "8px",
                    },
                  },
                }}
              />
              <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-primary" onClick={this.toggleModal}>
                  Add officer
                </button>
              </div>
              <AddOfficerModal
                firstName={this.state.firstName}
                lastName={this.state.lastName}
                badgeNo={this.state.badgeNo}
                deputyMinistry={this.state.deputyMinistry}
                administration={this.state.administration}
                directorate={this.state.directorate}
                base={this.state.base}
                show={this.state.showModal}
                onHide={this.toggleModal}
                onSubmit={this.handleSubmit}
                deputyOptions={deputyOptions}
                directorateOptions={directorateOptions}
                administrationOptions={administrationOptions}
                baseOptions={baseOptions}
                errors={this.state.errors}
                handleChange={this.handleInputChange}
                handleSelectChange={this.handleDropdownChange}
                header={this.state.header}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default OfficerAdd;
