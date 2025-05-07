import React, { Component } from 'react';
import Navbar from '../Navbar';
import Dropdown from '../DropDown';
import Swal from 'sweetalert2';
class RegisterUser extends Component {
    state = {
        firstName: '',
        lastName: '',
        phoneNo: '',
        email: '',
        role: '',
        gate: '',
        password: '',
        confirmPassword: '',
        errors: {
          firstName: '',
          lastName: '',
          phoneNo: '',
          email: '',
          role: '',
          gate: '',
          password: '',
          confirmPassword: '',
        },
      };
      
    
      handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
          [name]: value,
        });
      };
    
      handleDropdownChange = (name, value) => {
        this.setState({
          [name]: value,
        });
      };
    
      handleSubmit = async (e) => {
        e.preventDefault();
        const { firstName, lastName, phoneNo, email, role, gate, password, confirmPassword } = this.state;

        const errors = {};
        if (!firstName) errors.firstName = 'First name is required';
        if (!lastName) errors.lastName = 'Last name is required';
        if (!phoneNo) errors.phoneNo = 'Phone number is required';
        else if (!/^\d+$/.test(phoneNo)) errors.phoneNo = 'Phone number is invalid';
        else if (phoneNo.length < 10) errors.phoneNo = 'Phone number must be at least 10 digits';
        else if (phoneNo.length > 15) errors.phoneNo = 'Phone number must be at most 15 digits';
        if (!email) errors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid';
        if (!role) errors.role = 'Role is required';
        if (!gate) errors.gate = 'Gate is required';
        if (!password) errors.password = 'Password is required';
        else if (password.length < 8) errors.password = 'Password must be at least 8 characters long';
        if (!confirmPassword) {
            errors.confirmPassword = 'Confirm password is required';
          } else if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
          }
          

    
        if (Object.keys(errors).length > 0) {
          this.setState({ errors });
        } else {
          try {
            const userData = {
              Name: firstName,
              LastName: lastName,
              Phone: phoneNo,
              Email: email,
              Role: role,
              Gate: gate,
              Password: password,
            };
            
            const response = await fetch('https://localhost:7211/api/users', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(userData),
            });
      
        if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'User Added',
                    text: 'The User has been added successfully!',
                    timer: 3000,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'There was an error adding the user.',
                    timer: 3000,
                });
            }
          } catch (error) {
           console.log('Errors:',error);
          }
          // Reset form
          this.setState({
            firstName: '',
            lastName: '',
            phoneNo: '',
            email: '',
            role: '',
            gate: '',
            password:'',
            confirmPassword:'',
            errors: {},
          });
        }
      };
    
      handleBlur = (e) => {
        const { name, value } = e.target;
        let errors = this.state.errors;
    
        switch (name) {
          case 'firstName':
            errors.firstName = value.length < 1 ? 'First name is required' : '';
            break;
          case 'lastName':
            errors.lastName = value.length < 1 ? 'Last name is required' : '';
            break;
          case 'phoneNo':
            errors.phoneNo = value.length < 1 ? 'Phone number is required' : '';
            break;
          case 'email': 
            errors.email = value.length < 1 ? 'Email is required' : '';
            break;
            case 'password':
            errors.password = value.length < 1 ? 'Password is required' : '';
            break;
            case 'confirmPassword':
            errors.confirmPassword = value.length < 1 ? 'Confirm password is required' : '';
            break;
        }
    
        this.setState({ errors, [name]: value });
      };
      handlealert = () => {
        Swal.fire({
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          iconColor: "#198754",
          toast: true,

        });
      }
    render() { 
        return (<div className="bg-light min-vh-100">
            <Navbar />
         
            <div className="container py-5 mt-5">
              <div className="card shadow-lg border-0">
                <div className="card-body">
                  <h3 className="mb-4 fw-bold text-primary">Add New User</h3>
                  <form noValidate onSubmit={this.handleSubmit}>
                    <div className="row mb-3">
                      <div className="col-md-4">
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
                        <div className="text-danger">{this.state.errors.firstName}</div>
                      </div>
                      <div className="col-md-4">
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
                        <div className="text-danger">{this.state.errors.lastName}</div>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label fw-semibold">Phone No</label>
                        <input
                          type="text"
                          name="phoneNo"
                          className="form-control"
                          placeholder="Phone Number"
                          value={this.state.phoneNo}
                          onChange={this.handleInputChange}
                          onBlur={this.handleBlur}
                        />
                        <div className="text-danger">{this.state.errors.phoneNo}</div>
                      </div>
                    </div>
    
                    <div className="row mb-3">
                      <div className="col-md-3">
                        <label className="form-label fw-semibold">Email Address</label>
                        <input
                          type="text"
                          name="email"
                          className="form-control"
                          placeholder="Email Address"
                          value={this.state.email}
                          onChange={this.handleInputChange}
                          onBlur={this.handleBlur}
                        />
                        <div className="text-danger">{this.state.errors.email}</div>
                      </div>
                      <div className="col-md-3">
                        <label className="form-label fw-semibold">Role</label>
                        <Dropdown
                          name="role"
                          value={this.state.role}
                          onChange={this.handleDropdownChange}
                        />
                        <div className="text-danger">{this.state.errors.role}</div>
                      </div>
                      <div className="col-md-3">
                        <label className="form-label fw-semibold">Gate</label>
                        <Dropdown
                          name="gate"
                          value={this.state.gate}
                          onChange={this.handleDropdownChange}
                        />
                        <div className="text-danger">{this.state.errors.gate}</div>
                      </div>
                      <button onClick={this.handlealert} className='btn btn-primary'>Click Alert</button>
                      
                    </div>
                    <div className='row mb-3'>
                    <div className="col-md-3">
  <label className="form-label fw-semibold">Password</label>
  <input
    type="password"
    name="password"
    className="form-control"
    placeholder="Password"
    value={this.state.password}
    onChange={this.handleInputChange}
    onBlur={this.handleBlur}
  />
  <div className="text-danger">{this.state.errors.password}</div>
</div>
<div className="col-md-3">
  <label className="form-label fw-semibold">Confirm Password</label>
  <input
    type="password"
    name="confirmPassword"
    className="form-control"
    placeholder="Confirm Password"
    value={this.state.confirmPassword}
    onChange={this.handleInputChange}
    onBlur={this.handleBlur}
  />
  <div className="text-danger">{this.state.errors.confirmPassword}</div>
</div>
                    </div>
    
                    <div className="text-end">
                      <button className="btn btn-primary px-4 py-2 fw-semibold shadow-sm" type="submit">
                        Add
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>);
    }
}
 
export default RegisterUser;