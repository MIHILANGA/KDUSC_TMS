import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

function FormD({ showNotification }) {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    // Fetch form data from the server
    axios.get('https://kdu-tms.onrender.com/getAllForm3')
      .then(response => {
        // Reverse the data array to display in reverse order
        const reversedData = response.data.data.reverse();
        setFormData(reversedData);
        // Filter and prepare the data for the notification
        const filteredData = reversedData.map(form => ({
          ...form, // Keep all existing data
          rejectOrConfirm: '', // Add a new property for reject/confirm input
        }));
        showNotification(filteredData);
      })
      .catch(error => {
        console.error('Error fetching form data:', error);
      });
  }, [showNotification]);

  const handleRejectConfirmChange = (index, value) => {
    const updatedFormData = [...formData];
    updatedFormData[index].rejectOrConfirm = value;
    setFormData(updatedFormData);
  };

  const handleFormSubmit = (index) => {
    const updatedFormData = [...formData];
    const { _id, rejectOrConfirm } = updatedFormData[index];

    // Update the data in the MongoDB database
    axios.post('https://kdu-tms.onrender.com/updateFormData', {
      id: _id,
      rejectOrConfirm: rejectOrConfirm,
    })
    .then(response => {
      console.log('Form data updated in MongoDB:', response.data);
    })
    .catch(error => {
      console.error('Error updating form data in MongoDB:', error);
    });
  };

  return (

    <><div className='header-rectangle' />
    <img className='logo' alt='Kotelawala defence' src='kdu.png' />
    <button type='button' className='backbtn' onClick={() => window.history.back()}> Back </button>
    
    <div className="mid-container">

    <table className="Stable">
          <thead className='fixed-headerD'>
            <tr>
             
              <th>Applicant Name</th>
              <th>Requirement</th>
              <th>Date Apply</th>
              <th>Driver Name</th>
              <th>Vehicle</th>
              <th>Request Status</th>
              
            </tr>
          </thead>
          <tbody>
            {formData.map((form, index) => (
              <tr key={index}>
                
                <td>{form.applicantname}</td>
                <td>{form.requirement}</td>
                <td>{form.dateofApply}</td>
                <td>{form.driver}</td>
                <td>{form.vehicle}</td>
                <td>{form.rejectOrConfirm1}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div></>
  );
}

export default FormD;
