import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';



function Home() {
  // ... State and handleSubmit definitions ...
  const [vehiclenumber, setvehiclenumber] = useState('');
  const [vehicleowner, setvehicleowner] = useState('');
  const [registerdate, setregisterdate] = useState('');
  const [insurancedate, setinsurancedate] = useState('');
  const [expierddate, setexpierddate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/VehicleDetails', {
      vehiclenumber,
      vehicleowner,
      registerdate,
      insurancedate,
      expierddate,

    })
    .then(result => {
      console.log(result);
      alert('Request submitted successfully!');
      
    })
    .catch(err => {
      console.log(err);
      alert('An error occurred. Please try again.');
    });
  };
  return (
<div
      style={{
        background: 'linear-gradient(120deg, #a1c4fd, #c2e9fb)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'row', // Align components side by side
        padding: '20px',
      }}
    >
      {/* Left side with buttons */}
      <div style={{ flex: 1, padding: '10px' }}>
        <div>
          <h1>Add Vehicle Details</h1>
        </div>
        
      </div>

      {/* Right side with form */}
      <div style={{ flex: 3, padding: '10px' }}>
        <div className="bg-light p-3 rounded w-100">
          <h3>Details Form</h3>
          
          
          <form onSubmit={handleSubmit} className="custom-text-color">
            {/* First Column */}
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="name"><strong>Vehicle Number</strong></label>
                <input type="text" placeholder="Enter Vehicle Number" autoComplete="off" name="applicantname" className="form-control rounded-0" onChange={(e) => setvehiclenumber(e.target.value)} />
              </div>
              <div className="col">
                <label htmlFor="appiicantAppoinment"><strong>Vehicle Owner</strong></label>
                <input type="text" placeholder="Enter Owner Name" autoComplete="off" name="appiicantAppoinment" className="form-control rounded-0" onChange={(e) => setvehicleowner(e.target.value)} />
              </div>
            </div>
            
            <div className="row mb-3">
              <div className="col">
              <label htmlFor="vehicleIncharge">
              <strong>Register Date</strong>
            </label>
            <input
              type="Date"
              placeholder="Enter your Vehicle Incharge"
              autoComplete="off"
              name="vehicleIncharge"
              className="form-control rounded-0"
              onChange={(e) => setregisterdate(e.target.value)}
            />
          </div>
              <div className="col">
              <label htmlFor="dateofRequired">
              <strong>Insurance Date</strong>
            </label>
            <input
              type="date"
              placeholder="Enter your appointment"
              autoComplete="off"
              name="dateofRequired"
              className="form-control rounded-0"
              onChange={(e) => setinsurancedate(e.target.value)}
            />
          </div>
            </div>
            <div className="col">
              <label htmlFor="dateofRequired">
              <strong>Expired Date</strong>
            </label>
            <input
              type="date"
              placeholder="Enter your appointment"
              autoComplete="off"
              name="dateofRequired"
              className="form-control rounded-0"
              onChange={(e) => setexpierddate(e.target.value)}
            />
          </div>
            
            {/* Continue with other fields similarly */}
            
            <button type="submit" className="btn btn-success w-100 rounded-0" style={{ backgroundColor: 'darkgoldenrod' }}>
              Submit Form
            </button>
          </form>
          
        </div>
        
      </div>
      
    </div>
    
  );
}
export default Home;
