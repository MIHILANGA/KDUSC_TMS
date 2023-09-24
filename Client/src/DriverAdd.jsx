import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';



function Home() {
  // ... State and handleSubmit definitions ...
  const [registernumber, setregisternumber] = useState('');
  const [drivername, setdrivername] = useState('');
  const [Telephone, setTelephone] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/DriverDetails', {
        registernumber,
        drivername,
        Telephone,
    
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
          <h1>Add Driver Details</h1>
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
                <label htmlFor="name"><strong>Register Number</strong></label>
                <input type="text" placeholder="Enter Register Number" autoComplete="off" name="applicantname" className="form-control rounded-0" onChange={(e) => setregisternumber(e.target.value)} />
              </div>
              <div className="col">
                <label htmlFor="appiicantAppoinment"><strong>Driver Name</strong></label>
                <input type="text" placeholder="Enter Driver Name" autoComplete="off" name="appiicantAppoinment" className="form-control rounded-0" onChange={(e) => setdrivername(e.target.value)} />
              </div>
            </div>
            
            <div className="row mb-3">
              <div className="col">
              <label htmlFor="vehicleIncharge">
              <strong>Telephone Number</strong>
            </label>
            <input
              type="int"
              placeholder="Enter your Vehicle Incharge"
              autoComplete="off"
              name="vehicleIncharge"
              className="form-control rounded-0"
              onChange={(e) => setTelephone(e.target.value)}
            />
          </div>
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
