import React, { useState, useEffect } from 'react';
import './CSS/Locatin.css';
import GoogleMapsLocation from './Map'; // Import the GoogleMapsLocation component

function FormD({ showNotification }) {
  return (
    <>
      <div className="header-rectangle" />
      <img className="logo" alt="Kotelawala defence" src="kdu.png" />
      <button type="button" className="backbtn" onClick={() => window.location.href = '/VehicleDetails'}>
        Back
      </button>
      
      <div className='notification-panel4'>
        <div class Name='mappanel'>
        <GoogleMapsLocation /> {/* Include the GoogleMapsLocation component here */}</div>
      </div>
    </>
  );
}

export default FormD;
