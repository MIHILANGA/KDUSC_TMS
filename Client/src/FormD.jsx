import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import Notification from './Notification';

function FormD({ showNotification }) {
  const [formData, setFormData] = useState([]);
  const [notifications, setNotifications] = useState([]); // Initialize notifications state

  useEffect(() => {
    // Fetch form data from the server
    axios.get('http://localhost:3001/getAllForm')
      .then(response => {
        setFormData(response.data.data);
        // Filter and prepare the data for the notification
        const filteredData = response.data.data.map(form => ({
          ...form, // Keep all existing data
          rejectOrConfirm: '', // Add a new property for reject/confirm input
          message: '', // Add a new property for the message
        }));
        showNotification(filteredData);
      })
      .catch(error => {
        console.error('Error fetching form data:', error);
      });
  }, []); // Only run this effect once on component mount

  // Update the notifications state when needed
  const updateNotifications = (newNotifications) => {
    setNotifications(newNotifications);
  };

  const handleRejectConfirmChange = (index, value) => {
    const updatedFormData = [...formData];
    updatedFormData[index].rejectOrConfirm = value;
    setFormData(updatedFormData);
  };

  const handleFormSubmit = (index) => {
    const updatedFormData = [...formData];
    const { _id, rejectOrConfirm, message } = updatedFormData[index];

    // Update the data in the MongoDB database
    axios.post('http://localhost:3001/updateFormData', {
      id: _id,
      rejectOrConfirm: rejectOrConfirm,
      message: message,
    })
    .then(response => {
      console.log('Form data updated in MongoDB:', response.data);
      updateNotifications([
        ...notifications,
        { message: 'Confirmation Data Updated Successfully!', type: 'success' }
      ]);
    })
    .catch(error => {
      console.error('Error updating form data in MongoDB:', error);
      updateNotifications([
        ...notifications,
        { message: 'Confirmation Data Update Error!', type: 'error' }
      ]);
    });
  };

  const handleConfirm = (index) => {
    const updatedFormData = [...formData];
    updatedFormData[index].rejectOrConfirm = 'Confirmed';
    updatedFormData[index].message = 'Request Confirmed';
    setFormData(updatedFormData);
    handleFormSubmit(index);
  };

  const handleReject = (index) => {
    const updatedFormData = [...formData];
    updatedFormData[index].rejectOrConfirm = 'Rejected';
    updatedFormData[index].message = 'Request Rejected';
    setFormData(updatedFormData);
    handleFormSubmit(index);
  };

  // Reverse the order of formData to display LIFO
  const reversedFormData = [...formData].reverse();

  return (
    <div className="form-container">
      <h1 className="request-head">Vehicle Request Forms</h1>
      {/* Render each record in a separate box in LIFO order */}
      {reversedFormData.map((form, index) => (
        <div className="record-box" key={index}>
          <p className="applicant-name">Applicant Name:{form.applicantname}</p>
          <p className="requested-date">Requested date: {form.dateofApply}</p>
          <p className="description">Description: {form.appiicantAppoinment}</p>
        <div className="expand-arrow" onClick={() => toggleExpand(index)}>
          <span>&#9660;</span> {/* Unicode arrow-down symbol */}
       </div>

       {/* Additional information */}
        <div className={`additional-info ${form.isExpanded ? 'expanded' : ''}`}>
            {/* Add more details here */}
            <p>Additional Info: {form.additionalInfo}</p>
        </div>


        {/* Add more data fields as needed */}
        <div className="reject-confirm-box">
            <input
              type="text"
              onChange={e => handleRejectConfirmChange(index, e.target.value)}
              value={form.rejectOrConfirm}
            />
            <button
              className="action-button"
              onClick={() => handleConfirm(index)}
            >
              Confirm
            </button>
            <button
              className="action-button2"
              onClick={() => handleReject(index)}
            >
              Reject
            </button>
        </div>
    </div>
    ))}

      {/* Render Notifications */}
      <div>
        {notifications.map((notification, index) => (
          <Notification key={index} message={notification.message} type={notification.type} />
        ))}
      </div>
    </div>
  );
}

export default FormD;
