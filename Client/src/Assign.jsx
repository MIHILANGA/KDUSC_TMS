import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Notification from './Notification';
import './CSS/FormD.css';

function FormD({ showNotification }) {
  const [formData, setFormData] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [expandedRecordIndex, setExpandedRecordIndex] = useState(null);

  // Lists of drivers and vehicles
  const driversList = ['Driver 1', 'Driver 2', 'Driver 3']; // Replace with your driver list
  const vehiclesList = ['Vehicle 1', 'Vehicle 2', 'Vehicle 3']; // Replace with your vehicle list

  useEffect(() => {
    fetchFormData('http://localhost:3001/getAllForm', '');
  }, []);

  const fetchFormData = (url, formType) => {
    axios
      .get(url)
      .then((response) => {
        const formDataWithTypes = response.data.data.map((form) => ({
          ...form,
          rejectOrConfirm: '',
          message: '',
          formType,
          isEditing: false,
          isCompleted: form.status === 'completed', // Assuming 'completed' is the status for completed forms
        }));
        setFormData(formDataWithTypes.reverse());
        showNotification(formDataWithTypes);
      })
      .catch((error) => {
        console.error('Error fetching form data:', error);
      });
  };

  const toggleExpanded = (index) => {
    if (expandedRecordIndex === index) {
      setExpandedRecordIndex(null);
    } else {
      setExpandedRecordIndex(index);
    }
  };

  const handleEditClick = (index) => {
    const updatedFormData = [...formData];
    updatedFormData[index].isEditing = true;
    setFormData(updatedFormData);
  };

  const handleSaveClick = (index) => {
    const editedForm = formData[index];

    // Check if the selected driver and vehicle are already completed
    if (editedForm.isCompleted) {
      // You can show an error message or take appropriate action here
      return;
    }

    // Send the edited data to your API endpoint for saving
    // For example, using axios.post here to update the data on the server
    axios
      .post('http://localhost:3001/updateFormData', {
        id: editedForm._id,
        vehicleIncharge: editedForm.selectedVehicle,
        driverName: editedForm.selectedDriver,
        status: 'completed', // Mark the form as completed
      })
      .then((response) => {
        console.log('Form data updated in MongoDB:', response.data);
        setNotifications([
          ...notifications,
          { message: 'Data Updated Successfully!', type: 'success' },
        ]);

        const updatedFormData = [...formData];
        updatedFormData[index].isEditing = false;
        updatedFormData[index].isCompleted = true; // Mark the form as completed
        setFormData(updatedFormData);
      })
      .catch((error) => {
        console.error('Error updating form data in MongoDB:', error);
        setNotifications([
          ...notifications,
          { message: 'Data Update Error!', type: 'error' },
        ]);
      });
  };

  const handleCancelEditClick = (index) => {
    const updatedFormData = [...formData];
    updatedFormData[index].isEditing = false;
    setFormData(updatedFormData);
  };

  const handleDriverSelectChange = (index, value) => {
    const updatedFormData = [...formData];
    updatedFormData[index].selectedDriver = value;
    setFormData(updatedFormData);
  };

  const handleVehicleSelectChange = (index, value) => {
    const updatedFormData = [...formData];
    updatedFormData[index].selectedVehicle = value;
    setFormData(updatedFormData);
  };

  return (
    <>
      <div className="header-rectangle" />
      <img className="logo" alt="Kotelawala defence" src="kdu.png" />
      <button type="button" className="backbtn" onClick={() => window.location.href = '/Ahome'}>
        Back
      </button>

      <div className="buttons-container">
        <button className='btn1' onClick={() => fetchFormData('http://localhost:3001/getAllForm', '')}>
          FOC
        </button>
        <button className='btn2' onClick={() => fetchFormData('http://localhost:3001/getAllForm1', '1')}>
          FBESS
        </button>
        <button className='btn3' onClick={() => fetchFormData('http://localhost:3001/getAllForm2', '2')}>
          FOT
        </button>
      </div>
      <div className='notification-panel'>
        <table className="data-table full-width">
          <thead>
            <tr>
              <th>Applicant Name</th>
              <th>Applicant Appointment</th>
              <th>Date of Apply</th>
              <th>Driver Name</th>
              <th>Vehicle</th>
              <th>Edit</th>
              <th>Save</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((form, index) => (
              <tr key={index}>
                <td>{form.applicantname}</td>
                <td>{form.appiicantAppoinment}</td>
                <td>{form.dateofApply}</td>
                <td>
                  {form.isEditing ? (
                    <select
                      value={form.selectedDriver}
                      onChange={(e) => handleDriverSelectChange(index, e.target.value)}
                      disabled={form.isCompleted} // Disable the select if the form is completed
                    >
                      {driversList.map((driver, driverIndex) => (
                        <option key={driverIndex} value={driver}>
                          {driver}
                        </option>
                      ))}
                    </select>
                  ) : (
                    form.driverName
                  )}
                </td>
                <td>
                  {form.isEditing ? (
                    <select
                      value={form.selectedVehicle}
                      onChange={(e) => handleVehicleSelectChange(index, e.target.value)}
                      disabled={form.isCompleted} // Disable the select if the form is completed
                    >
                      {vehiclesList.map((vehicle, vehicleIndex) => (
                        <option key={vehicleIndex} value={vehicle}>
                          {vehicle}
                        </option>
                      ))}
                    </select>
                  ) : (
                    form.vehicle
                  )}
                </td>
                <td>
                  {form.isEditing ? (
                    <button onClick={() => handleSaveClick(index)}>Save</button>
                  ) : (
                    <button onClick={() => handleEditClick(index)}>Edit</button>
                  )}
                </td>
                <td>
                  {form.isEditing && (
                    <button onClick={() => handleCancelEditClick(index)}>Cancel</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default FormD;
