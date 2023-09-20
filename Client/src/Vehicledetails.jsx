import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';



function FormD({ showNotification }) {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    // Fetch form data from the server
    axios.get('http://localhost:3001/getAllVehicle')
      .then(response => {
        setFormData(response.data.data);
        // Filter and prepare the data for the notification
        const filteredData = response.data.data.map(form => ({
          ...form,
          isEditing: false, // Add property to track editing state
        }));
        showNotification(filteredData);
      })
      .catch(error => {
        console.error('Error fetching form data:', error);
      });
  }, [showNotification]);

  // Function to fetch data from database and populate the table
  const fetchData = async () => {
    const response = await axios.get('http://localhost:3001/getAllVehicle');
    const data = response.data.data;
    setFormData(data);
  };

  // Render the table with the fetched data
  const renderTable = () => {
    return (
      <table className="data-table full-width">
        <thead>
          <tr>
            <th>Vehicle Number</th>
            <th>Vehicle Owner</th>
            <th>Register Date</th>
            <th>Insurance Date</th>
            <th>Expiered Date</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((form, index) => (
            <tr key={index}>
              <td>{form.vehiclenumber}</td>
              <td>{form.vehicleowner}</td>
              <td>{form.registerdate}</td>
              <td>{form.insurancedate}</td>
              <td>{form.expierddate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
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
          <h1>Vehicle And Insurance Details</h1>
        </div>
        <div>
          <Link to="/vehicleadd" className="btn btn-curly w-100 mb-3">
            <b>Add Vehicle Details</b>
          </Link>
          <Link to="/vehicleedit" className="btn btn-curly w-100">
            <b>Edit Vehicle Details</b>
          </Link>
          
        </div>
      </div>

      {/* Right side with form */}
      <div style={{ flex: 3, padding: '10px' }}>
        <div className="bg-light p-3 rounded w-100">
          <h3></h3>
          {renderTable()}
          
          
          
        </div>
        
      </div>
      
    </div>
    
  );
}
export default FormD;
