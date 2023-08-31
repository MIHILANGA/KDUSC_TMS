import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

function FormD({ showNotification }) {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    // Fetch form data from the server
    axios.get('http://localhost:3001/getAllForm')
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
      alert('Conformation Data Update successfully!');
    })
    .catch(error => {
      console.error('Error updating form data in MongoDB:', error);
      alert('Conformation Data Update error!');
    });
  };

  return (
    <div className="form-container">
      <h1> Requests Form Data</h1>
      <table className="data-table full-width">
        <thead>
          <tr>
          <th>applicant
                  name</th>
                <th>appiicant
                  Appoinment</th>
                <th>vehicle
                  Incharge</th>
                <th>dateof
                  Required</th>
                <th>timeof
                  Required</th>
                <th>natureof
                  Duty</th>
                <th>address
                  toGo</th>
                <th>requirement</th>
                <th>timetobe
                  Spent</th>
                <th>distance</th>
                <th>dateof
                  Arrival</th>
                <th>timeof
                  Arrival</th>
                <th>numof
                  Officers</th>
                <th>numof
                  Lectures</th>
                <th>numof
                  Instructors</th>
                <th>numofcadet
                  Officers</th>
                <th>numofday
                  Scholers</th>
                <th>numof
                  civilStaff</th>
                <th>totalof
                  Passengers</th>
                <th>routeto
                  Follow</th>
                <th>dateof
                  Apply</th>
            <th>Reject or Confirm</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((form, index) => (
            <tr key={index}>
              <td>{form.applicantname}</td>
                <td>{form.appiicantAppoinment}</td>
                <td>{form.vehicleIncharge}</td>
                <td>{form.dateofRequired}</td>
                <td>{form.timeofRequired}</td>
                <td>{form.natureofDuty}</td>
                <td>{form.addresstoGo}</td>
                <td>{form.requirement}</td>
                <td>{form.timetobeSpent}</td>
                <td>{form.distance}</td>
                <td>{form.dateofArrival}</td>
                <td>{form.timeofArrival}</td>
                <td>{form.numofOfficers}</td>
                <td>{form.numofLectures}</td>
                <td>{form.numofInstructors}</td>
                <td>{form.numofcadetOfficers}</td>
                <td>{form.numofdayScholers}</td>
                <td>{form.numofcivilStaff}</td>
                <td>{form.totalofPassengers}</td>
                <td>{form.routetoFollow}</td>
                <td>{form.dateofApply}</td>
                <td bgcolor="#ffcc00">{form.rejectOrConfirm}</td>
              <td>
                <input
                  type="text"
                  onChange={e => handleRejectConfirmChange(index, e.target.value)}
                />
              </td>
              <td>
                <button className="action-button save-button" onClick={() => handleFormSubmit(index)}>Submit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FormD;
