import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Notification from './Notification';
import '../src/FullFormD.css';

function FullFormFormD({ showNotification }) {
  const [formData, setFormData] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [expandedRecordIndex, setExpandedRecordIndex] = useState(null); // Track expanded record index

  useEffect(() => {
    axios.get('http://localhost:3001/getAllForm')
      .then(response => {
        setFormData(response.data.data);
        const filteredData = response.data.data.map(form => ({
          ...form,
          rejectOrConfirm: '',
          message: '',
        }));
        showNotification(filteredData);
      })
      .catch(error => {
        console.error('Error fetching form data:', error);
      });
  }, []);

  const handleRejectConfirmChange = (index, value) => {
    const updatedFormData = [...formData];
    updatedFormData[index].rejectOrConfirm = value;
    setFormData(updatedFormData);
  };

  const handleFormSubmit = (index) => {
    const updatedFormData = [...formData];
    const { _id, rejectOrConfirm, message } = updatedFormData[index];

    axios.post('http://localhost:3001/updateFormData', {
      id: _id,
      rejectOrConfirm: rejectOrConfirm,
      message: message,
    })
      .then(response => {
        console.log('Form data updated in MongoDB:', response.data);
        setNotifications([
          ...notifications,
          { message: 'Confirmation Data Updated Successfully!', type: 'success' }
        ]);
      })
      .catch(error => {
        console.error('Error updating form data in MongoDB:', error);
        setNotifications([
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

  const toggleExpanded = (index) => {
    // Toggle the expanded state of the record at the given index
    if (expandedRecordIndex === index) {
      setExpandedRecordIndex(null);
    } else {
      setExpandedRecordIndex(index);
    }
  };

  const reversedFormData = [...formData].reverse();

  return (
    <div className="form-container2">
        <h1 className="notific"> Request Notification</h1>
      {/* Render each record in a separate box in LIFO order */}
      {reversedFormData.map((form, index) => (
        <div className="record-box1" key={index}>
          <p className="applicant-name">Applicant Name:{form.applicantname}</p>
          <p className="requested-date1">Requested date: {form.dateofApply}</p>
          <p className="description">Description: {form.appiicantAppoinment}</p>
        
          {/* Add more data fields as needed */}
           <div className="reject-confirm-box">
            <input className=".inputt"
              type="text"
              onChange={e => handleRejectConfirmChange(index, e.target.value)}
              value={form.rejectOrConfirm}
            />
            
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

export default FullFormFormD;
