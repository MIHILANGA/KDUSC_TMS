import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

function FormD({ showNotification }) {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    // Fetch form data from the server
    axios.get('http://localhost:3001/getAllForm1')
      .then(response => {
        setFormData(response.data.data);
        // Filter and prepare the data for the notification
        const filteredData = response.data.data.map(form => ({
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
    axios.post('http://localhost:3001/updateFormData', {
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
    <div className="form-container">
      <h1>Form Comformation Data</h1>
      <table className="data-table full-width">
        <thead>
          <tr>
          <th>applicant
                   ID</th>
                  <th>applicant
                  name</th>
                <th>appiicant
                  Appoinment</th>
                
                <th>dateof
                  Apply</th>
            <th>Reject or Confirm</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((form, index) => (
            <tr key={index}>
              <td>{form._id}</td>
              <td>{form.applicantname}</td>
                <td>{form.appiicantAppoinment}</td>
                <td>{form.dateofApply}</td>
                <td bgcolor="#ffcc00">{form.rejectOrConfirm}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FormD;
