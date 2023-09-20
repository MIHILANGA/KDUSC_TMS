import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';



function Home() {
  // ... State and handleSubmit definitions ...
  const [applicantname, setapplicantname] = useState('');
  const [appiicantAppoinment, setappiicantAppoinment] = useState('');
  const [vehicleIncharge, setvehicleIncharge] = useState('');
  const [dateofRequired, setdateofRequired] = useState('');
  const [timeofRequired, settimeofRequired] = useState('');
  const [natureofDuty, setnatureofDuty] = useState('');
  const [addresstoGo, setaddresstoGo] = useState('');
  const [requirement, setrequirement] = useState('');
  const [timetobeSpent, settimetobeSpent] = useState('');
  const [distance, setdistance] = useState('');
  const [dateofArrival, setdateofArrival] = useState('');
  const [timeofArrival, settimeofArrival] = useState('');
  const [numofOfficers, setnumofOfficers] = useState('');
  const [numofLectures, setnumofLectures] = useState('');
  const [numofInstructors, setnumofInstructors] = useState('');
  const [numofcadetOfficers, setnumofcadetOfficers] = useState('');
  const [numofdayScholers, setnumofdayScholers] = useState('');
  const [numofcivilStaff, setnumofcivilStaff] = useState('');
  const [totalofPassengers, settotalofPassengers] = useState('');
  const [routetoFollow, setroutetoFollow] = useState('');
  const [dateofApply, setdateofApply] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/home1', {
      applicantname,
      appiicantAppoinment,
      vehicleIncharge,
      dateofRequired,
      timeofRequired,
      natureofDuty,
      addresstoGo,
      requirement,
      timetobeSpent,
      distance,
      dateofArrival,
      timeofArrival,
      numofOfficers,
      numofLectures,
      numofInstructors,
      numofcadetOfficers,
      numofdayScholers,
      numofcivilStaff,
      totalofPassengers,
      routetoFollow,
      dateofApply,

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
          <h1>FBESS MA Home</h1>
        </div>
        <div>
          <Link to="/conformation1" className="btn btn-curly w-100 mb-3">
            <b>Request Confirmations or Rejections</b>
          </Link>
          <Link to="/cancel1" className="btn btn-curly w-100">
            <b>Edit Or Cancel Request</b>
          </Link>
          <p>(If you Cancel Request  please call MTO Office)</p>
        </div>
      </div>

      {/* Right side with form */}
      <div style={{ flex: 3, padding: '10px' }}>
        <div className="bg-light p-3 rounded w-100">
          <h3>Request Form</h3>
          
          
          <form onSubmit={handleSubmit} className="custom-text-color">
            {/* First Column */}
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="name"><strong>Applicant Name</strong></label>
                <input type="text" placeholder="Enter your name" autoComplete="off" name="applicantname" className="form-control rounded-0" onChange={(e) => setapplicantname(e.target.value)} />
              </div>
              <div className="col">
                <label htmlFor="appiicantAppoinment"><strong>Appiicant Appoinment</strong></label>
                <input type="text" placeholder="Enter your appointment" autoComplete="off" name="appiicantAppoinment" className="form-control rounded-0" onChange={(e) => setappiicantAppoinment(e.target.value)} />
              </div>
            </div>
            
            <div className="row mb-3">
              <div className="col">
              <label htmlFor="vehicleIncharge">
              <strong>Vehicle Incharge</strong>
            </label>
            <input
              type="text"
              placeholder="Enter your Vehicle Incharge"
              autoComplete="off"
              name="vehicleIncharge"
              className="form-control rounded-0"
              onChange={(e) => setvehicleIncharge(e.target.value)}
            />
          </div>
              <div className="col">
              <label htmlFor="dateofRequired">
              <strong>Date Of Required</strong>
            </label>
            <input
              type="date"
              placeholder="Enter your appointment"
              autoComplete="off"
              name="dateofRequired"
              className="form-control rounded-0"
              onChange={(e) => setdateofRequired(e.target.value)}
            />
          </div>
            </div>
            <div className="row mb-3">
              <div className="col">
              <label htmlFor="timeofRequired">
              <strong>Time Of Required</strong>
            </label>
            <input
              type="time"
              placeholder="Enter your Time of Required"
              autoComplete="off"
              name="appiicantAppoinment"
              className="form-control rounded-0"
              onChange={(e) => settimeofRequired(e.target.value)}
            />
          </div>
              <div className="col">
              <label htmlFor="natureofDuty">
              <strong>Nature Of Duty</strong>
            </label>
            <input
              type="text"
              placeholder="Enter your Nature of Duty"
              autoComplete="off"
              name="natureofDuty"
              className="form-control rounded-0"
              onChange={(e) => setnatureofDuty(e.target.value)}
            />
          </div>
            </div>
            <div className="row mb-3">
              <div className="col">
              <label htmlFor="addresstoGo">
              <strong>Address To Go</strong>
            </label>
            <input
              type="text"
              placeholder="Enter your Address to Go"
              autoComplete="off"
              name="addresstoGo"
              className="form-control rounded-0"
              onChange={(e) => setaddresstoGo(e.target.value)}
            />
          </div>
              <div className="col">
              <label htmlFor="requirement">
              <strong>Requirement</strong>
            </label>
            <input
              type="text"
              placeholder="Enter your requirement"
              autoComplete="off"
              name="requirement"
              className="form-control rounded-0"
              onChange={(e) => setrequirement(e.target.value)}
            />
          </div>
            </div>
            <div className="row mb-3">
              <div className="col">
              <label htmlFor="timetobeSpent">
              <strong>Time To Be Spent</strong>
            </label>
            <input
              type="time"
              placeholder="Enter your Time to be Spent"
              autoComplete="off"
              name="timetobeSpent"
              className="form-control rounded-0"
              onChange={(e) => settimetobeSpent(e.target.value)}
            />
          </div>
              <div className="col">
              <label htmlFor="distance">
              <strong>Distance</strong>
            </label>
            <input
              type="text"
              placeholder="Enter your distance"
              autoComplete="off"
              name="distance"
              className="form-control rounded-0"
              onChange={(e) => setdistance(e.target.value)}
            />
          </div>
            </div>
            <div className="row mb-3">
              <div className="col">
              <label htmlFor="dateofArrival">
              <strong>Date Of Arrival</strong>
            </label>
            <input
              type="date"
              placeholder="Enter your Date of Arrival"
              autoComplete="off"
              name="dateofArrival"
              className="form-control rounded-0"
              onChange={(e) => setdateofArrival(e.target.value)}
            />
          </div>
              <div className="col">
              <label htmlFor="timeofArrival">
              <strong>Time Of Arrival</strong>
            </label>
            <input
              type="time"
              placeholder="Enter your Time of Arrival"
              autoComplete="off"
              name="timeofArrival"
              className="form-control rounded-0"
              onChange={(e) => settimeofArrival(e.target.value)}
            />
          </div>
            </div>
            <div className="row mb-3">
              <div className="col">
              <label htmlFor="numofOfficers">
              <strong>Number Of Officers</strong>
            </label>
            <input
              type="number"
              placeholder="Enter your Num of Officers"
              autoComplete="off"
              name="numofOfficers"
              className="form-control rounded-0"
              onChange={(e) => setnumofOfficers(e.target.value)}
            />
          </div>
              <div className="col">
              <label htmlFor="numofLectures">
              <strong>Number of Lectures</strong>
            </label>
            <input
              type="number"
              placeholder="Enter your Num of Lectures"
              autoComplete="off"
              name="numofLectures"
              className="form-control rounded-0"
              onChange={(e) => setnumofLectures(e.target.value)}
            />
          </div>
            </div>
            <div className="row mb-3">
              <div className="col">
              <label htmlFor="numofInstructors">
              <strong>Number Of Instructors</strong>
            </label>
            <input
              type="number"
              placeholder="Enter your Num of Instructors"
              autoComplete="off"
              name="numofInstructors"
              className="form-control rounded-0"
              onChange={(e) => setnumofInstructors(e.target.value)}
            />
          </div>
              <div className="col">
              <label htmlFor="numofcadetOfficers">
              <strong>Number Of Cadet Officers</strong>
            </label>
            <input
              type="number"
              placeholder="Enter your Num of Cadet Officers"
              autoComplete="off"
              name="numofcadetOfficers"
              className="form-control rounded-0"
              onChange={(e) => setnumofcadetOfficers(e.target.value)}
            />
          </div>
            </div>
            <div className="row mb-3">
              <div className="col">
              <label htmlFor="numofdayScholers">
              <strong>Number Of Day Scholers</strong>
            </label>
            <input
              type="number"
              placeholder="Enter your Num of DayScholers"
              autoComplete="off"
              name="numofdayScholers"
              className="form-control rounded-0"
              onChange={(e) => setnumofdayScholers(e.target.value)}
            />
          </div>
              <div className="col">
              <label htmlFor="numofcivilStaff">
              <strong>Number Of Civil Staff</strong>
            </label>
            <input
              type="number"
              placeholder="Enter your Num of Civil Staff"
              autoComplete="off"
              name="numofcivilStaff"
              className="form-control rounded-0"
              onChange={(e) => setnumofcivilStaff(e.target.value)}
            />
          </div>
            </div>
            <div className="row mb-3">
              <div className="col">
              <label htmlFor="Total of Passengers">
              <strong>Total Of Passengers</strong>
            </label>
            <input
              type="number"
              placeholder="Enter your totalofPassengers"
              autoComplete="off"
              name="totalofPassengers"
              className="form-control rounded-0"
              onChange={(e) => settotalofPassengers(e.target.value)}
            />
          </div>
              <div className="col">
              <label htmlFor="routetoFollow">
              <strong>Route To Follow</strong>
            </label>
            <input
              type="text"
              placeholder="Enter your Route to Follow"
              autoComplete="off"
              name="routetoFollow"
              className="form-control rounded-0"
              onChange={(e) => setroutetoFollow(e.target.value)}
            />
          </div>
            </div>
            <div className="row mb-3">
              <div className="col">
              <label htmlFor="dateofApply">
              <strong>Date Of Apply</strong>
            </label>
            <input
              type="date"
              placeholder="Enter your Date of Apply"
              autoComplete="off"
              name="dateofApply"
              className="form-control rounded-0"
              onChange={(e) => setdateofApply(e.target.value)}
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
