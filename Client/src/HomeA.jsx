import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import FormD from './FormD';

function HomeA() {
  const [notification, setNotification] = useState('');
  const isAdmin = true; // Set this to true if the user is an admin, otherwise set it to false

  const showNotification = message => {
    setNotification(message);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1>Admin Dashboard</h1>
        {/* Navigation Links */}
        <div className="nav-buttons">
          <Link to="/FormD" className="btn btn1-curly gap-5 w-100">Request Forms</Link>
          <Link to="/VehicleDetails" className="btn btn1-curly gap-5 w-100">Vehicle Details</Link>
          <Link to="/InsuranceDetails" className="btn btn1-curly gap-5 w-100">Insurance Details</Link>
          <Link to="/DriversDetails" className="btn btn1-curly gap-5 w-100">Drivers Details</Link>
          <Link to="/SpecialRequest" className="btn btn1-curly gap-5 w-100">Special Requests</Link>
        </div>
      </div>
      {isAdmin && (
        <div className="notification-panel">
          <h2>Notifications</h2>
          <FormD onDataReady={showNotification} />
          <p></p>
          <table style={{ width: '80%' }}>
            {/* Your table content */}
            
          </table>
        </div>
      )}
    </div>
  );
}

export default HomeA;
