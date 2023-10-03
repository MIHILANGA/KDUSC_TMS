import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/Driverdetails.css';
import AddDriverPopup from './AddDriverPopup'; // Import the AddVehiclePopup component

function FormD({ showNotification }) {
  const [formData, setFormData] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false); // State to control popup visibility

  useEffect(() => {
    // Fetch form data from the server
    axios
      .get('http://localhost:3001/getAllDriver')
      .then((response) => {
        setFormData(response.data.data);
        // Filter and prepare the data for the notification
        const filteredData = response.data.data.map((form) => ({
          ...form,
          isEditing: false, // Add property to track editing state
        }));
        showNotification(filteredData);
      })
      .catch((error) => {
        console.error('Error fetching form data:', error);
      });
  }, [showNotification]);

  // Function to fetch data from the database and populate the table
  const fetchData = async () => {
    const response = await axios.get('http://localhost:3001/getAllDriver');
    const data = response.data.data;
    setFormData(data);
  };

  // Render the table with the fetched data
  const renderTable = () => {
    return (
      <div className='notification-panelD'>
        <table className='driver-data-table'>
          <div className='table-containerD'>
            <thead className='fixed-header'>
              <tr>
                <th>Register Number</th>
                <th>Driver Name</th>
                <th>Telephone Number</th>
              </tr>
            </thead>
            <tbody>
              {formData.map((form, index) => (
                <tr key={index}>
                  <td>{form.registernumber}</td>
                  <td>{form.drivername}</td>
                  <td>{form.Telephone}</td>
                </tr>
              ))}
            </tbody>
          </div>
        </table>
      </div>
    );
  };

  // Function to show the popup form
  const showPopup = () => {
    setIsPopupVisible(true);
  };

  // Function to hide the popup form
  const hidePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <>
      <div className='header-rectangle' />
      <img className='logo' alt='Kotelawala defence' src='kdu.png' />
      <button type='button' className='backbtn' onClick={() => window.history.back()}>
        Back
      </button>

      {/* Left side with buttons */}
      <div style={{ flex: 1, padding: '10px' }}>
        <div className='Buttons'>
          {/* Show the popup form when the "Add" button is clicked */}
          <button className='AddDriverbtn' onClick={showPopup}> Add </button>
          <Link to='/DriverEdit' className='EditDriverbtn'> Edit </Link>
        </div>
      </div>

      {/* Render the table */}
      {renderTable()}

      {/* Render the popup form if isPopupVisible is true */}
      {isPopupVisible && <AddDriverPopup onClose={hidePopup} onAdd={fetchData} />}
   
    </>
  );
}

export default FormD;
