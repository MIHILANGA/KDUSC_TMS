import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/VehicleAdd.css';

function Home() {
  const [vehiclenumber, setvehiclenumber] = useState('');
  const [vehicleowner, setvehicleowner] = useState('');
  const [registerdate, setregisterdate] = useState('');
  const [insurancedate, setinsurancedate] = useState('');
  const [expierddate, setexpierddate] = useState('');
  const navigate = useNavigate();

  // Function to reset form fields
  const resetForm = () => {
    setvehiclenumber('');
    setvehicleowner('');
    setregisterdate('');
    setinsurancedate('');
    setexpierddate('');
  };

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
      // Reset the form fields
      resetForm();
    })
    .catch(err => {
      console.log(err);
      alert('An error occurred. Please try again.');
    });
  };

  return (

      <form onSubmit={handleSubmit} className="form-bg">
      <button type="button" className="closebtn" onClick={() => { navigate('/VehicleDetails'); window.location.reload(); }}> X </button>

        <div className="row1">
          <label htmlFor="name">Vehicle Number</label>
          <input type="text" placeholder="Enter Vehicle Number" autoComplete="off" name="applicantname" className="input-box" value={vehiclenumber} onChange={(e) => setvehiclenumber(e.target.value)} required />
        </div>

        <div className="row2">
          <label htmlFor="appiicantAppoinment">Vehicle Owner</label>
          <input type="text" placeholder="Enter Owner's Name" autoComplete="off" name="appiicantAppoinment" className="input-box" value={vehicleowner} onChange={(e) => setvehicleowner(e.target.value)} required />
          <label htmlFor="vehicleIncharge">Register Date</label>
          <input type="Date" placeholder="Enter your Vehicle Incharge" autoComplete="off" name="vehicleIncharge" className="input-box" value={registerdate} onChange={(e) => setregisterdate(e.target.value)} required />
        </div>

        <div className="row3">
          <label htmlFor="dateofRequired"> Start Date of Insurance </label>
          <input type="date" placeholder="Enter your appointment" autoComplete="off" name="dateofRequired" className="input-box" value={insurancedate} onChange={(e) => setinsurancedate(e.target.value)} required />
          <label htmlFor="dateofRequired"> Expire Date of Insurance </label>
          <input type="date" placeholder="Enter Expired Date" autoComplete="off" name="dateofRequired" className="input-box" value={expierddate} onChange={(e) => setexpierddate(e.target.value)} required />
          <button type="submit" className="Addbtn"> Add </button>
          

            
        </div>

      </form>
    
  );
}

export default Home;