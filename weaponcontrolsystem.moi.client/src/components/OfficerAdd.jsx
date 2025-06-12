import React, { Component } from "react";
import Navbar from "./Navbar";
import Swal from "sweetalert2";
import ministryData from "../assets/ministryData.json";
import AddOfficerModal from "./AddOfficerModel";
import DataTable from "react-data-table-component";
import { withRouter } from "./withRouter";
import { withTranslation } from "react-i18next";
class OfficerAdd extends Component {
  state = {
    header: this.props.t("Add New Officer"),
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
    phoneNo: "",

    errors: {
      firstName: "",
      lastName: "",
      badgeNo: "",
      deputyMinistry: "",
      directorate: "",
      administration: "",
      base: "",
      phoneNo: "",
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
      header: this.props.t("Add New Officer"),
      id: "",
      firstName: "",
      lastName: "",
      badgeNo: "",
      deputyMinistry: "",
      directorate: "",
      administration: "",
      base: "",
      phoneNo: "",
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
    const { t } = this.props;
    const result = await Swal.fire({
      title: t("Are you sure?"),
      text: t("You won't be able to revert this!"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("Yes, delete it!"),
      cancelButtonText: t("Cancel"),
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
          Swal.fire(t("Deleted!"), t("Officer has been deleted!"), "success");
          this.fetchOfficers();
        } else {
          const errorData = await response.json();
          Swal.fire({
            icon: "error",
            title: t("Error"),
            text: errorData.message,
          });
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        Swal.fire({
          icon: "error",
          title: t("Error"),
          text: t("An error occurred while deleting the officer."),
        });
      }
    }
  };
  // Handle edit user
  handleEdit = async (userId) => {
    const response = await fetch(
      `https://localhost:7211/api/officer/by-id/${userId}`
    );
    const officer = await response.json();
    console.log(officer);
    this.setState({
      id: userId,
      showModal: true,
      header: this.props.t("Edit Officer"),
      firstName: officer.name,
      lastName: officer.name,
      badgeNo: officer.badgeNo,
      deputyMinistry: officer.deputy_Ministry,
      directorate: officer.directorate,
      administration: officer.administration,
      base: officer.base,
      phoneNo: officer.phoneNo,
    });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const navigate = this.props.router.navigate;
    const {
      firstName,
      lastName,
      badgeNo,
      deputyMinistry,
      directorate,
      administration,
      base,
      phoneNo,
    } = this.state;
    const errors = {};
    if (!firstName) errors.firstName = "First name is required";
    if (!lastName) errors.lastName = "Last name is required";
    if (!badgeNo) errors.badgeNo = "Badge number is required";
    if (!deputyMinistry) errors.deputyMinistry = "Deputy ministry is required";
    if (!directorate) errors.directorate = "Directorate is required";
    if (!administration) errors.administration = "Administration is required";
    if (!base) errors.base = "Base is required";
    if (!phoneNo) errors.phoneNo = "Phone number is required";

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
          PhoneNo: phoneNo,
        };

        var Method =
          this.state.header === this.props.t("Add New Officer")
            ? "POST"
            : "PUT";
        var url =
          this.state.header === this.props.t("Add New Officer")
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
          const officerTemp = await fetch(
            "https://localhost:7211/api/officer/by-phone/" + phoneNo
          );
          const tempofficer = await officerTemp.json();
          this.setState({
            firstName: "",
            lastName: "",
            badgeNo: "",
            deputyMinistry: "",
            directorate: "",
            administration: "",
            base: "",
            phoneNo: "",
            errors: {},
            showModal: false,
          });
          this.fetchOfficers();
          navigate("/weapon", {
            state: { officer: tempofficer },
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
    const { t, i18n } = this.props;
    const isRTL = i18n.dir() === "rtl";
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
        name: t("Name"),
        selector: (row) => row.name,
        sortable: true,
      },
      {
        name: t("Badge no"),
        selector: (row) => row.badgeNo,
        sortable: true,
      },
      {
        name: t("Phone number"),
        selector: (row) => row.phoneNo,
        sortable: true,
      },
      {
        name: t("Deputy Ministry"),
        selector: (row) => row.deputyMinistry,
        sortable: true,
        minWidth: "250px",
      },
      {
        name: t("Directorate"),
        selector: (row) => row.directorate,
        sortable: true,
      },
      {
        name: t("Administration"),
        selector: (row) => row.administration,
        sortable: true,
      },
      {
        name: t("Base"),
        selector: (row) => row.base,
        sortable: true,
      },
      {
        name: t("Actions"),
        cell: (row) => (
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <i
              className=" fa fa-trash fa-2x"
              style={{
                cursor: "pointer",
                color: "#DC3545", // Bootstrap danger red
                transition: "color 0.3s ease",
              }}
              onClick={() => this.handleDelete(row.id)}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#A71D2A")} // darker red
              onMouseLeave={(e) => (e.currentTarget.style.color = "#DC3545")}
            />

            <i
              className="fa fa-edit fa-2x"
              style={{
                cursor: "pointer",
                color: "#FFC107", // Bootstrap success green
                transition: "color 0.3s ease",
              }}
              onClick={() => this.handleEdit(row.id)}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#E0A800")} // darker green
              onMouseLeave={(e) => (e.currentTarget.style.color = "#FFC107")}
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
      phoneNo: officer.phoneNo,
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
                  name="searchOfficer"
                  placeholder={t("Search Officer") + " 🔍"}
                  className="form-control w-50 shadow-sm rounded-pill"
                  style={{ maxWidth: "300px" }}
                  onChange={(e) => {
                    this.searchOfficer(e);
                  }}
                />
              </div>
              <h3 className="mb-4 fw-bold text-primary">
                {t("List of Officers")}
              </h3>
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
                direction={isRTL ? "rtl" : "ltr"}
                noDataComponent={t("No Data")}
                pagination
                paginationComponentOptions={paginationOptions}
              />
              <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-primary" onClick={this.toggleModal}>
                  {this.props.t("Add New Officer")}
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
                phoneNo={this.state.phoneNo}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withTranslation()(withRouter(OfficerAdd));
