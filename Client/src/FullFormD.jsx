import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Notification from './Notification';
import './CSS/FullFormD.css';

function FullFormFormD({ showNotification }) {
  const [formData, setFormData] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [expandedRecordIndex, setExpandedRecordIndex] = useState(null);

  useEffect(() => {
    // Define the URLs for the GET requests
    const urls = [
      'http://localhost:3001/getAllForm',
      'http://localhost:3001/getAllForm1',
      'http://localhost:3001/getAllForm2',
    ];

    // Use Promise.all to make parallel requests
    Promise.all(urls.map(url => axios.get(url)))
      .then(responses => {
        // Process the responses here
        const combinedData = responses.map(response => response.data.data);

        // Assuming you want to merge the data into a single array
        const mergedData = [].concat(...combinedData);

        // Sort the data in ascending order based on the dateofApply field
        const sortedData = mergedData.sort((a, b) => {
          const dateA = new Date(a.dateofApply);
          const dateB = new Date(b.dateofApply);

          return dateB - dateA;
        });

        setFormData(sortedData);

        // Further processing or notifications here
        const filteredData = sortedData.map(form => ({
          ...form,
          rejectOrConfirm: '',
          message: '',
        }));
        showNotification(filteredData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Rest of your code (handleRejectConfirmChange, handleFormSubmit, handleConfirm, handleReject, toggleExpanded)

  return (
    <div className="form-container2">
      {/* Render each record in a separate box */}
      {formData.map((form, index) => {
        // Skip records where rejectOrConfirm is present
        if (form.rejectOrConfirm) {
          return null;
        }

        return (
          
          <div className="record-box1" key={index}>
            <p className="applicant-name">Applicant Name: {form.applicantname}</p>
            <p className="requested-date1">Requested date: {form.dateofApply}<p className="Name" >New Request</p></p>
            <p className="description">Description: {form.appiicantAppoinment} </p>

            {/* Add more data fields as needed */}
          </div>
          
        );
      })}

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
