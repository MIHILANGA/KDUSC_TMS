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

  

  const handlePrint = (index) => {
    // Create a new window for printing
    const printWindow = window.open('', '', 'width=600,height=600');
  
    // Create the content to be printed
    const printContent = `
      <html>
        <head>
          <title>Form Details</title>
        </head>
        <body>
          <h1>Form Details</h1>
          <p>Applicant Name: ${formData[index].applicantname}</p>
          <p>Requested date: ${formData[index].dateofApply}</p>
          <!-- Include other form details here -->
        </body>
      </html>
    `;
  
    // Write the content to the print window
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
  
    // Trigger the print dialog
    printWindow.print();
  
    // Close the print window after printing (optional)
    printWindow.close();
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
              <p className="expanded-detail">VehicleIncharge : {form.vehicleIncharge}</p>
              <p className="expanded-detail">DateofRequired  : {form.dateofRequired}</p>
              <p className="expanded-detail">TimeofRequired  : {form.timeofRequired}</p>
              <p className="expanded-detail">NatureofDuty    : {form.natureofDuty}</p> <br/>

              <p className="expanded-detail">AddresstoGo  : {form.addresstoGo}</p>
              <p className="expanded-detail">Requirement   : {form.requirement}</p>
              <p className="expanded-detail">TimetobeSpent : {form.timetobeSpent}</p>
              <p className="expanded-detail">Distance      : {form.distance}</p> <br/>

              <p className="expanded-detail">DateofArriva  : {form.dateofArriva}</p>
              <p className="expanded-detail">TimeofArrival : {form.timeofArrival}</p><br/>

              <p className="expanded-detail">Num of Officers: {form.numofOfficers}</p>
              <p className="expanded-detail">Num of Lectures: {form.numofLectures}</p>
              <p className="expanded-detail">Num of Instructors: {form.numofInstructors}</p>
              <p className="expanded-detail">Num of CadetOfficers: {form.numofcadetOfficers}</p>
              <p className="expanded-detail">Num of DayScholers: {form.numofdayScholers}</p>
              <p className="expanded-detail">Num of civil Staff: {form.numofcivilStaff}</p>
              <p className="expanded-detail">Total Passengers: {total}</p>

              {/* .......................... print the form.......................... ... */}
              <div className="" key={index}>
                    {/* ... other details ... */}
                      <button
                        className="print-button"
                        onClick={() => handlePrint(index)}
                      >
                        Print
                      </button>
                    </div>
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
