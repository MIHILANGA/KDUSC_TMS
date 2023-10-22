import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/VehicleAdd.css';

function Home() {
  const [vehiclenumber, setvehiclenumber] = useState('');
  const [vehicletype, setvehicletype] = useState('');
  const [vehiclemodel, setvehiclemodel] = useState('');
  const [vehicleowner, setvehicleowner] = useState('');
  const [registerdate, setregisterdate] = useState('');
  const [insurancedate, setinsurancedate] = useState('')
  const navigate = useNavigate();

  // Function to reset form fields
  const resetForm = () => {
    setvehiclenumber('');
    setvehicletype('');
    setvehiclemodel('');
    setvehicleowner('');
    setregisterdate('');
    insurancedate('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://kdu-tms.onrender.com/VehicleDetails', {
      vehiclenumber,
      vehicletype,
      vehiclemodel,
      vehicleowner,
      registerdate,
      insurancedate
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
          <label htmlFor="name">Vehicle </label>
          <input type="text" placeholder="Enter Vehicle Number" autoComplete="off" name="applicantname" className="input-box" value={vehiclenumber} onChange={(e) => setvehiclenumber(e.target.value)} required />
        </div>

        <div className="row2">
          <label htmlFor="appiicantAppoinment">Vehicle type</label>
          <input type="text" placeholder="Enter Vehicle Type" autoComplete="off" name="appiicantAppoinment" className="input-box" value={vehicletype} onChange={(e) => setvehicletype(e.target.value)} required />
          <label htmlFor="vehicleIncharge">Vehicle Model</label>
          <input type="text" placeholder="Enter Vehicle Model" autoComplete="off" name="Vehicle Model" className="input-box" value={vehiclemodel} onChange={(e) => setvehiclemodel(e.target.value)} required />
        </div>

        <div className="row3">
          <label htmlFor="dateofRequired">Vehicle A.P </label>
          <input type="text" placeholder="Enter Vehicle AP" autoComplete="off" name="dateofRequired" className="input-box" value={vehicleowner} onChange={(e) => setvehicleowner(e.target.value)} required />
         
         <label htmlFor="dateofRequired"> Register date </label>
          <input type="date" placeholder="Enter Registerd" autoComplete="off" name="dateofRequired" className="input-box" value={registerdate} onChange={(e) => setregisterdate(e.target.value)} required />
         
          <label htmlFor="dateofRequired"> Insuarance date </label>
          <input type="date" placeholder="Enter Registerd" autoComplete="off" name="dateofRequired" className="input-box" value={insurancedate} onChange={(e) => setinsurancedate(e.target.value)} required />
         
           
        </div>
        <div className="row4">
        <button type="submit" className="Addbtn"> Add </button>
         
        </div>

      </form>
    
  );
}

export default Home;