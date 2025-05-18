import React, { Component } from "react";
import Navbar from "./Navbar";
import Swal from "sweetalert2";
import weaponData from "../assets/weaponData.json";
import Select from "react-select";
import persian from "react-date-object/calendars/persian";
import persian_fa from "../assets/persian_fa";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

class WeaponAdd extends Component {
  state = {
    name: "",
    type: "",
    names: [],
    types: [],
    inDate: "",
    inTime: "",
    outDate: "",
    officerBadgeNo: "",
    cardNo: "",
    errors: {
      name: "",
      type: "",
      inDate: "",
      officerBadgeNo: "",
      cardNo: "",
    },
  };

  componentDidMount() {
    // Access the weaponTypes array from the weaponData object
    const names = weaponData.weaponTypes
      .map((weaponType) => weaponType.weapons)
      .flat();
    const types = weaponData.weaponTypes.map((weaponType) => weaponType.type);

    this.setState({
      names,
      types,
    });
  }
  handleTimeChange = (time) => {
    this.setState({ inTime: time });
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

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  combineDateAndTime = (date, time) => {
    if (!date || !time) return null;

    const [hoursStr, minutesStr, secondsStr = "0"] = time.toString().split(":");
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);
    const seconds = parseInt(secondsStr, 10);

    const newDate = new Date(date);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    newDate.setSeconds(seconds);
    newDate.setMilliseconds(0);
    console.log("Combined (local):", newDate.toString());
    console.log("Combined (ISO):", newDate.toISOString());

    return newDate;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, type, inDate, outDate, officerBadgeNo, cardNo } = this.state;
    const errors = {};

    if (!name) errors.name = "Name is required";
    if (!type) errors.type = "Type is required";
    //if (!inDate) errors.inDate = "In date is required";
    if (!officerBadgeNo) errors.officerBadgeNo = "Officer badge is required";
    if (!cardNo) errors.cardNo = "Card Number is required";

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }
    var InDate = inDate?.toDate();
    InDate = this.combineDateAndTime(InDate, this.state.inTime);
    // var ISODate = InDate?.toISOString();
    if (outDate != "") {
      var OutDate = outDate?.toDate();
      var OutISODate = OutDate?.toISOString();
    }

    try {
      const weaponData = {
        Name: name,
        Type: type,
        InDate: InDate || new Date().toISOString(),
        OutDate: OutISODate || null, // explicitly allow null
        OfficerBadgeNo: officerBadgeNo,
        CardNo: cardNo,
      };

      const response = await fetch("https://localhost:7211/api/weapon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(weaponData),
      });
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Weapon Added",
          text: "The weapon has been added successfully!",
          timer: 3000,
        });
        this.setState({
          name: "",
          type: "",
          inDate: "",
          outDate: "",
          officerBadgeNo: "",
          cardNo: "",
          errors: {
            name: "",
            type: "",
            inDate: "",
            officerBadgeNo: "",
            cardNo: "",
          },
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "There was an error adding the weapon.",
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
  };
  render() {
    const { name, type, inDate, outDate, officerBadgeNo, errors, cardNo } =
      this.state;

    return (
      <div className="bg-light min-vh-100">
        <Navbar />

        <div className="container py-5 mt-5">
          <div className="card shadow-lg border-0">
            <div className="card-body">
              <h3 className="mb-4 fw-bold text-primary">Add New Weapon</h3>
              <form noValidate onSubmit={this.handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-3">
                    <label className="form-label fw-semibold">Type</label>
                    <Select
                      name="type"
                      options={this.state.types.map((type) => ({
                        value: type,
                        label: type,
                      }))}
                      value={this.state.types.find((t) => t.value === type)}
                      onChange={(selectedOption) =>
                        this.handleDropdownChange("type", selectedOption.value)
                      }
                      placeholder="Select Type"
                    />
                    <div className="text-danger">{errors.type}</div>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label fw-semibold">Name</label>
                    <Select
                      name="name"
                      options={this.state.names.map((name) => ({
                        value: name,
                        label: name,
                      }))}
                      value={this.state.names.find((n) => n.value === name)}
                      onChange={(selectedOption) =>
                        this.handleDropdownChange("name", selectedOption.value)
                      }
                      placeholder="Select Name"
                    />

                    <div className="text-danger">{errors.name}</div>
                  </div>

                  <div className="col-md-3 d-flex flex-column">
                    <label className="form-label fw-semibold">In Date</label>
                    <DatePicker
                      value={this.state.inDate}
                      onChange={(value) => this.setState({ inDate: value })}
                      calendar={persian}
                      locale={persian_fa}
                      calendarposition="bottom-left"
                      placeholder="Select In Date"
                      style={{
                        width: "100%",
                        backgroundColor: "#fff",
                        height: "130%",
                        color: "black",
                      }}
                    />

                    <div className="text-danger">{errors.inDate}</div>
                  </div>
                  <div className="col-md-3 d-flex flex-column">
                    <label className="form-label fw-semibold">In time</label>
                    <DatePicker
                      disableDayPicker
                      value={this.state.inTime}
                      onChange={(value) => {
                        this.setState({ inTime: value });
                      }}
                      format="hh:mm:ss "
                      calendarposition="bottom-left"
                      placeholder="Select In Date"
                      plugins={[<TimePicker position="bottom" />]}
                      style={{
                        width: "100%",
                        backgroundColor: "#fff",
                        height: "130%",
                        color: "black",
                      }}
                    />

                    <div className="text-danger">{errors.inDate}</div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-4 d-flex flex-column">
                    <label className="form-label fw-semibold">
                      Out Date (optional)
                    </label>

                    <DatePicker
                      value={this.state.outDate}
                      onChange={(value) => this.setState({ outDate: value })}
                      calendar={persian}
                      locale={persian_fa}
                      placeholder="Select Out Date"
                      style={{
                        width: "100%",
                        backgroundColor: "#fff",
                        color: "black",
                        height: "130%",
                      }}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      Officer Badge No
                    </label>
                    <input
                      type="text"
                      name="officerBadgeNo"
                      className="form-control"
                      value={officerBadgeNo}
                      placeholder="Officer Badge No"
                      onChange={this.handleInputChange}
                    />
                    <div className="text-danger">{errors.officerBadgeNo}</div>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Card No</label>
                    <input
                      type="text"
                      name="cardNo"
                      className="form-control"
                      value={cardNo}
                      placeholder="Card No"
                      onChange={this.handleInputChange}
                    />
                    <div className="text-danger">{errors.cardNo}</div>
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
export default WeaponAdd;
