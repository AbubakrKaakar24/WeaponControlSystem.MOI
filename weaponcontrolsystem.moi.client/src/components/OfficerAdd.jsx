import React, { Component } from 'react';
import Navbar from './Navbar';
import Dropdown from './DropDown'; // Importing the Dropdown component

class OfficerAdd extends Component {
  state = {};
  render() {
    return (
      <div>
        <header>
          <Navbar />
        </header>

        <form className="container mt-4" noValidate>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label>First name</label>
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                required
              />
            </div>

            <div className="col-md-4 mb-3">
              <label>Last name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
                required
              />
            </div>
            <div className="col-md-3 mb-3">
              <label>BadgeNo</label>
              <input
                type="text"
                className="form-control"
                placeholder="BadgeNo"
                required
              />
            </div>
         
          </div>

          <div className="row">
            <div className="col-md-6 ">
              <Dropdown Name="Moeenyat" /> {/* Dropdown usage */}
            </div>

            <div className="col-md-3">
            
             <Dropdown Name="Directorate" /> {/* Dropdown usage */}
            </div>

            <div className="col-md-3 ">
              <Dropdown Name="Administration" /> {/* Dropdown usage */}
            </div>
           
            <div className="col-md-4 ">
              <Dropdown Name="Base" /> {/* Dropdown usage */}
            </div>
          </div>

          <button className="btn btn-primary" type="submit">
            Submit form
          </button>
        </form>
      </div>
    );
  }
}

export default OfficerAdd;
