import React, { Component } from "react";
import Navbar from "../common/Navbar";
import Swal from "sweetalert2";
import weaponData from "../../assets/weaponData.json";
import { withRouter } from "../common/withRouter";
import DataTable from "react-data-table-component";
import WeaponModel from "./weaponModel";
import { withTranslation } from "react-i18next";
import { t } from "i18next";

class WeaponAdd extends Component {
  state = {
    showModal: false,
    Weapons: [],
    name: "",
    type: "",
    isAvailable: false,
    names: [],
    types: [],
    errors: {
      name: "",
      type: "",
      serialNo: "",
    },
  };
  fetchWeapons = async () => {
    const { officer } = this.props.router.location.state || {};
    if (officer) {
      const response = await fetch(
        `https://localhost:7211/api/weapon/byOfficer/${officer.id}`
      );
      const data = await response.json();
      console.log(data);
      this.setState({
        Weapons: data,
      });
    }
  };
  async componentDidMount() {
    // Access the weaponTypes array from the weaponData object
    await this.fetchWeapons();
    const names = weaponData.weaponTypes
      .map((weaponType) => weaponType.weapons)
      .flat();
    const types = weaponData.weaponTypes.map((weaponType) => weaponType.type);
    this.setState({
      names,
      types,
    });
  }

  handleDelete = async (id) => {
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
          `https://localhost:7211/api/weapon/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: t("Weapon Deleted"),
            text: t("The weapon has been deleted successfully!"),
            timer: 3000,
            timerProgressBar: true,
            confirmButtonText: t("Ok"),
          });
          this.fetchWeapons(); // Refresh the weapons list after deletion
        } else {
          Swal.fire({
            icon: "error",
            title: t("Error"),
            text: t("There was an error deleting the weapon."),
            timer: 3000,
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: t("Error"),
          text: t("There was an error deleting the weapon."),
          timer: 3000,
        });
      }
    }
  };
  handleDropdownChange = (name, value) => {
    if (name === "type") {
      const selectedType = weaponData.weaponTypes.find(
        (weapon) => weapon.type === value
      );
      // Check if selectedType is found, then use its weapons array, otherwise fallback to previous state
      const names = selectedType ? selectedType.weapons : [];

      this.setState({
        type: value,
        names: names,
      });
    } else if (name === "name") {
      this.setState({ name: value });
    }
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const { Weapons } = this.state;

    try {
      const tempIds = [];
      for (const weapon of Weapons) {
        if (weapon) {
          if (weapon.in) {
            tempIds.push(weapon.id);
          }
          const response = await fetch(
            `https://localhost:7211/api/weapon/${weapon.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(weapon),
            }
          );
        }
      }
      if (Object.keys(tempIds).length > 0) {
        const tempCard = {
          cardNo: "",
          issueDate: new Date().toISOString(),
          returnDate: null,
          weaponsId: tempIds,
        };
        const response = await fetch(`https://localhost:7211/api/card`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(tempCard),
        });
        if (response.ok) {
          const data = await response.json();
          Swal.fire({
            icon: "success",
            title: t("Card no") + data,
            timer: 5000,
            timerProgressBar: true,
            confirmButtonText: t("Ok"),
          });
          this.props.router.navigate("/home");
        } else {
          Swal.fire({
            icon: "error",
            title: t("Error"),
            text: response.statusText,
            timer: 3000,
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: t("Error"),
        text: error.message,
        timer: 3000,
      });
    }
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
    }));
  };
  handleCheckboxChange = (e, id) => {
    const { checked } = e.target;
    console.log("Checkbox changed:", id, checked);
    const updatedWeapons = this.state.Weapons.map((weapon) => {
      if (weapon.id === id) {
        return { ...weapon, in: checked };
      }
      return weapon;
    });
    this.setState({ Weapons: updatedWeapons });
  };
  render() {
    const { t, i18n } = this.props;
    const isRTL = i18n.dir() === "rtl";
    const { name, type, errors, serialNo } = this.state;
    const { officer } = this.props.router.location.state || {};

    const Columns = [
      {
        name: t("Actions"),
        cell: (row) => (
          <div className="d-flex justify-content-center">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                name="isAvailable"
                checked={row.in}
                onChange={(e) => {
                  this.handleCheckboxChange(e, row.id);
                }}
              />
            </div>
          </div>
        ),
      },
      { name: t("Name"), selector: (row) => row.name, sortable: true },
      { name: t("Type"), selector: (row) => row.type, sortable: true },
      { name: t("Serial no"), selector: (row) => row.serialNo, sortable: true },
      {
        name: t("Actions"),
        cell: (row) => (
          <div className="d-flex justify-content-center">
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
          </div>
        ),
      },
    ];
    // const { weapons } = this.props.router.location.state || {};
    const { Weapons } = this.state;
    const rows = Weapons.map((weapon) => ({
      id: weapon.id,
      name: weapon.name,
      type: weapon.type,
      serialNo: weapon.serialNo,
      in: weapon.in,
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
              <h3 className="mb-4 fw-bold text-primary">
                {t("Select Weapon")}
              </h3>
              <div className="d-flex justify-content-end mb-3">
                <h6 className="mb-4 fw-bold text-primary text-start">
                  {this.props.router.location.state?.officer?.name ||
                    t("Officer")}
                </h6>
              </div>
              <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-primary" onClick={this.toggleModal}>
                  {t("Add Weapon")}
                </button>
              </div>
              <DataTable
                columns={Columns}
                data={rows}
                highlightOnHover
                direction={isRTL ? "rtl" : "ltr"}
                noDataComponent={t("No Data")}
                pagination
                paginationComponentOptions={paginationOptions}
              />
              <WeaponModel
                show={this.state.showModal}
                onHide={this.toggleModal}
                id={officer.id}
                fetchWeapons={this.fetchWeapons}
              />

              <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-primary" onClick={this.handleSubmit}>
                  {t("Submit")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withTranslation()(withRouter(WeaponAdd));
