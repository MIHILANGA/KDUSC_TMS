import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CSS/HomeA.css';
import FormD from './FormD';
import FullFormFormD from './FullFormD';

function HomeA() {
  const [notification, setNotification] = useState('');
  const [newRequestsCount, setNewRequestsCount] = useState(0); // State for new requests from FullFormFormD
  const isAdmin = true; // Set this to true if the user is an admin, otherwise set it to false

  const showNotification = message => {
    setNotification(message);
  };

  // Function to refresh the page
  const refreshPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    // Set up a timer to refresh the page every 30 seconds
    const intervalId = setInterval(refreshPage, 60000);

    // Clean up the timer when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    // Fetch the count of unconfirmed or unrejected requests from your backend API
    fetchUnconfirmedCount();
  }, []);

  const fetchUnconfirmedCount = () => {
    // Replace the URL with your actual API endpoint to fetch the unconfirmed count
    // You should implement this endpoint in your backend
    fetch('http://your-api-endpoint/unconfirmedCount')
      .then((response) => response.json())
      .then((data) => setUnconfirmedCount(data.count))
      .catch((error) => console.error('Error fetching unconfirmed count:', error));
  };

  return (
    <>
      <div className="header-rectangle" />
      <img className="logo" alt="Kotelawala defence" src="kdu.png" />
      <h1 className='user'>MTO</h1>
      <img src='profile-user.png' className='userimg'></img>
      <button
        type="button"
        className="logoutbtn"
        onClick={() => {
          window.location.href = '/';
          window.history.replaceState(null, null, '/');
        }}
      >
        Logout
      </button>

      {/* Navigation Links */}
      <div className="nav-buttons">
      <Link to="/FormD" className="requestsbtn">
          Requests
          <span className="badge">{newRequestsCount}</span>
        </Link>
        <Link to="/VehicleDetails" className="vehiclesbtn">
          Vehicles
        </Link>
        <Link to="/Assign" className="assignbtn">
          Assign
        </Link>
        <Link to="/DriversDetails" className="driverbtn">
          Drivers
        </Link>
        <Link to="/SpecialRequest" className="reservationbtn">
          Reservations
        </Link>
      </div>

      {isAdmin && (
        <div className="notification-panelA">
          <div>
          <FullFormFormD onDataReady={showNotification} onNewRequestsCountChange={setNewRequestsCount} />
          </div>
        </div>
      )}
    </>
  );
}

export default HomeA;
