import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FormD.css'; // Import a separate CSS file for styling

function FormD({ showNotification }) {
  const [formData, setFormData] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(-1);

  useEffect(() => {
    // Fetch form data from the server initially
    fetchFormData('http://localhost:3001/getAllForm');
    fetchFormData('http://localhost:3001/getAllForm1');
    fetchFormData('http://localhost:3001/getAllForm2');
  }, []);

  const fetchFormData = (url) => {
    axios
      .get(url)
      .then((response) => {
        setFormData(response.data.data);
        const filteredData = response.data.data.map((form) => ({
          ...form,
          rejectOrConfirm: '', // Add a new property for reject/confirm input
        }));
        showNotification(filteredData);
      })
      .catch((error) => {
        console.error('Error fetching form data:', error);
      });
  };

  const handleRejectConfirmChange = (index, value) => {
    const updatedFormData = [...formData];
    updatedFormData[index].rejectOrConfirm = value;
    setFormData(updatedFormData);
  };

  const handleFormSubmit = (index) => {
    const updatedFormData = [...formData];
    const { _id, rejectOrConfirm } = updatedFormData[index];

    // Update the data in the MongoDB database
    axios
      .post('http://localhost:3001/updateFormData', {
        id: _id,
        rejectOrConfirm: rejectOrConfirm,
      })
      .then((response) => {
        console.log('Form data updated in MongoDB:', response.data);
        alert('Confirmation Data Updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating form data in MongoDB:', error);
        alert('Confirmation Data Update error!');
      });
  };

  const toggleDetails = (index) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  return (
    <div className="form-container">
      <h1>Requests Form Data</h1>
      <div className="buttons-container">
        <button onClick={() => fetchFormData('http://localhost:3001/getAllForm')}>
          FOC Request Forms
        </button>
        <button onClick={() => fetchFormData('http://localhost:3001/getAllForm1')}>
          FDSS Request Forms
        </button>
        <button onClick={() => fetchFormData('http://localhost:3001/getAllForm2')}>
          FOT Request Forms
        </button>
      </div>
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
                <th>
                  Officers</th>
                <th>
                  Lectures</th>
                <th>
                  Instructors</th>
                <th>cadet
                  Officers</th>
                <th>day
                  Scholers</th>
                <th>
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
            <React.Fragment key={index}>
              <tr onClick={() => toggleDetails(index)} className="clickable-row">
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
                  <button
                    className="action-button save-button"
                    onClick={() => handleFormSubmit(index)}
                  >
                    Submit
                  </button>
                </td>
              </tr>
              {expandedIndex === index && (
                <tr className="details-row">
                  <td colSpan="4">
                    <div className="details">
                      {/* Display additional details here */}
                      Date of Required: {form.dateofRequired}<br />
                      Nature of Duty: {form.natureofDuty}<br />
                      {/* Add more details as needed */}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FormD;
