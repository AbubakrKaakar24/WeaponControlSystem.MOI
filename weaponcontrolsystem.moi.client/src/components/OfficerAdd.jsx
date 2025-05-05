import React, { Component } from 'react';
import Navbar from './Navbar';
import Dropdown from './DropDown'; // Your dropdown component

class OfficerAdd extends Component {
  state = {};

  render() {
    return (
      <div className="bg-light min-vh-100">
        <Navbar />

        <div className="container py-5 mt-5">
          <div className="card shadow-lg border-0">
            <div className="card-body">
              <h3 className="mb-4 fw-bold text-primary">Add New Officer</h3>
              <form noValidate>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">First Name</label>
                    <input type="text" className="form-control" placeholder="First name" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Last Name</label>
                    <input type="text" className="form-control" placeholder="Last name" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Badge No</label>
                    <input type="text" className="form-control" placeholder="Badge Number" />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-3">
                    <label className="form-label fw-semibold">Deputy Ministry</label>
                    <Dropdown Name="Deputy Ministry" />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label fw-semibold">Directorate</label>
                    <Dropdown Name="Directorate" />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label fw-semibold">Administration</label>
                    <Dropdown Name="Administration" />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label fw-semibold">Base</label>
                    <Dropdown Name="Base" />
                  </div>
                </div>

                <div className="text-end">
                  <button className="btn btn-primary px-4 py-2 fw-semibold shadow-sm" type="submit">
                    Add Officer
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
