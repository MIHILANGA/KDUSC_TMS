import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import Notification from './Notification';

function FormD({ showNotification }) {
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


  return (
    <div className="form-container">
      <h1 className="request-head">Vehicle Request Forms</h1>
      {/* Render each record in a separate box in LIFO order */}
      {formData.map((form, index) => {
        // Calculate the total for each form
        const total =form.numofOfficers + form.numofLectures + form.numofInstructors + form.numofcadetOfficers + form.numofdayScholers + form.numofcivilStaff;

        return (
          <div className="record-box" key={index}>
            <p className="applicant-name">Applicant Name: {form.applicantname}</p>
            <p className="requested-date">Requested date: {form.dateofApply}</p>
            <p className="description">Description: {form.appiicantAppoinment}</p>

            {/* Render additional details only for the expanded record */}
            {expandedRecordIndex === index && (
              <div className="description">
              <p className="expanded-detail">vehicleIncharge : {form.vehicleIncharge}</p>
              <p className="expanded-detail">dateofRequired : {form.dateofRequired}</p>
              <p className="expanded-detail">timeofRequired : {form.timeofRequired}</p>
              <p className="expanded-detail">natureofDuty : {form.natureofDuty}</p> <br/>

              <p className="expanded-detail"> addresstoGo : {form.addresstoGo}</p>
              <p className="expanded-detail">requirement : {form.requirement}</p>
              <p className="expanded-detail">timetobeSpent : {form.timetobeSpent}</p>
              <p className="expanded-detail">distance : {form.distance}</p> <br/>

              <p className="expanded-detail">dateofArriva: {form.dateofArriva}</p>
              <p className="expanded-detail"> timeofArrival: {form.timeofArrival}</p>

              <p className="expanded-detail"> numofOfficers : {form.numofOfficers}</p>
              <p className="expanded-detail"> numofLectures : {form.numofLectures}</p>
              <p className="expanded-detail"> numofInstructors : {form.numofInstructors}</p>
              <p className="expanded-detail">numofcadetOfficers : {form.numofcadetOfficers}</p>
              <p className="expanded-detail">numofdayScholers: {form.numofdayScholers}</p>
              <p className="expanded-detail"> numofcivilStaff : {form.numofcivilStaff}</p>
              <p className="expanded-detail"> totalofPassengers : {total}</p>
              </div>
            )}

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
            <div>
              <button
                className="action-button-showmore"
                onClick={() => toggleExpanded(index)}
              >
                {expandedRecordIndex === index ? "Hide Details" : "Show More"}
              </button>
            </div>
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

export default FormD;
