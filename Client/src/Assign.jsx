import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Notification from './Notification';
import './CSS/FormD.css';

function FormD({ showNotification }) {
  const [formData, setFormData] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [expandedRecordIndex, setExpandedRecordIndex] = useState(null);
  const [driver, setDriver] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [selectedFormType, setSelectedFormType] = useState('');

  // Sets to keep track of selected drivers and vehicles in forms
  const driversInForms = new Set();
  const vehiclesInForms = new Set();

  // Lists of drivers and vehicles
  const driversList = ['Driver 1', 'Driver 2', 'Driver 3','Driver 4', 'Driver 5', 'Driver 6']; // Replace with your driver list
  const vehiclesList = ['Vehicle 1', 'Vehicle 2', 'Vehicle 3','Vehicle 4', 'Vehicle 5', 'Vehicle 6']; // Replace with your vehicle list

  useEffect(() => {
    fetchFormData('http://localhost:3001/getAllForm', '');
    setSelectedFormType('FOC');
  }, []);

  const fetchFormData = (url, formType) => {
    axios
      .get(url)
      .then((response) => {
        const formDataWithTypes = response.data.data
          .filter((form) => form.rejectOrConfirm === 'Confirmed') // Filter forms with rejectOrConfirm equal to 'Confirmed'
          .map((form) => ({
            ...form,
            rejectOrConfirm: '',
            message: '',
            formType,
            isEditing: false,
            isCompleted: form.status === 'completed',
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

    // Check if the selected driver and vehicle are not selected in other forms
    if (
      driversInForms.has(driver) ||
      vehiclesInForms.has(vehicle)
    ) {
      // You can show an error message or take appropriate action here
      return;
    }

    let updateUrl = '';

    // Determine the update URL based on the selected form type
    if (selectedFormType === 'FOC') {
      updateUrl = 'http://localhost:3001/updateAssignData';
    } else if (selectedFormType === 'FBESS') {
      updateUrl = 'http://localhost:3001/updateAssignData1';
    } else if (selectedFormType === 'FOT') {
      updateUrl = 'http://localhost:3001/updateAssignData2';
    }

    // Send the edited data to your API endpoint for saving
    axios
      .post(updateUrl, {
        id: editedForm._id,
        vehicle: vehicle,
        driver: driver,
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
        updatedFormData[index].driver = driver; // Update selectedDriver in the form data
        updatedFormData[index].vehicle = vehicle; // Update selectedVehicle in the form data
        setFormData(updatedFormData);

        // Add the selected driver and vehicle to the set
        driversInForms.add(driver);
        vehiclesInForms.add(vehicle);
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
    setDriver(value);
  };

  const handleVehicleSelectChange = (index, value) => {
    setVehicle(value);
  };

  const handleCompleteClick = (index) => {
    const updatedFormData = [...formData];
    updatedFormData[index].driver = 'Complete'; // Change driver data to "Complete"
    updatedFormData[index].vehicle = 'Complete'; // Change vehicle data to "Complete"
    updatedFormData[index].isCompleted = true; // Mark the form as completed

    let updateUrl = '';

    // Determine the update URL based on the selected form type
    if (selectedFormType === 'FOC') {
      updateUrl = 'http://localhost:3001/updateAssignData';
    } else if (selectedFormType === 'FBESS') {
      updateUrl = 'http://localhost:3001/updateAssignData1';
    } else if (selectedFormType === 'FOT') {
      updateUrl = 'http://localhost:3001/updateAssignData2';
    }

    // Send the updated data to the appropriate API endpoint for saving
    axios
      .post(updateUrl, {
        id: updatedFormData[index]._id,
        driver: 'Complete',
        vehicle: 'Complete',
        status: 'completed', // Mark the form as completed
      })
      .then((response) => {
        console.log('Data updated and uploaded to MongoDB:', response.data);
        setNotifications([
          ...notifications,
          { message: 'Data Updated and Uploaded Successfully!', type: 'success' },
        ]);
        setFormData(updatedFormData);
      })
      .catch((error) => {
        console.error('Error updating and uploading data to MongoDB:', error);
        setNotifications([
          ...notifications,
          { message: 'Data Update and Upload Error!', type: 'error' },
        ]);
      });
  };

  return (
    <>
      <div className="header-rectangle" />
      <img className="logo" alt="Kotelawala defence" src="kdu.png" />
      <button type="button" className="backbtn" onClick={() => window.location.href = '/Ahome'}>
        Back
      </button>

      <div className="buttons-container">
        <button className='btn1' onClick={() => {
          fetchFormData('http://localhost:3001/getAllForm', '');
          setSelectedFormType('FOC');
        }}>
          FOC
        </button>
        <button className='btn2' onClick={() => {
          fetchFormData('http://localhost:3001/getAllForm1', '1');
          setSelectedFormType('FBESS');
        }}>
          FBESS
        </button>
        <button className='btn3' onClick={() => {
          fetchFormData('http://localhost:3001/getAllForm2', '2');
          setSelectedFormType('FOT');
        }}>
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
              <th></th>
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
                      value={driver}
                      onChange={(e) => handleDriverSelectChange(index, e.target.value)}
                      disabled={form.isCompleted}
                    >
                      <option value="">Select Driver</option>
                      {driversList.map((driver, driverIndex) => (
                        <option key={driverIndex} value={driver}>
                          {driver}
                        </option>
                      ))}
                    </select>
                  ) : (
                    form.driver
                  )}
                </td>
                <td>
                  {form.isEditing ? (
                    <select
                      value={vehicle}
                      onChange={(e) => handleVehicleSelectChange(index, e.target.value)}
                      disabled={form.isCompleted}
                    >
                      <option value="">Select Vehicle</option>
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
                   {form.isEditing && (
                    <button onClick={() => handleCancelEditClick(index)}>Cancel</button>
                  )}
                </td>
                <td>
                  {!form.isCompleted && (
                    <button onClick={() => handleCompleteClick(index)}>Complete</button>
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
