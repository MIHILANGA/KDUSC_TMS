import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/VehicleEdit.css'

function FormD({ showNotification }) {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editedIndex, setEditedIndex] = useState(-1); // Track the index of the edited row
  const [expandedRecordIndex, setExpandedRecordIndex] = useState(-1); // Track the index of the expanded record

  useEffect(() => {
    // Fetch form data from the server when the component mounts
    axios.get('http://localhost:3001/getAllVehicle')
      .then(response => {
        setFormData(response.data.data);
        setLoading(false); // Data has been loaded
        // Filter and prepare the data for the notification
        const filteredData = response.data.data.map(form => ({
          ...form,
          isEditing: false, // Add property to track editing state
        }));
        showNotification(filteredData);
      })
      .catch(error => {
        console.error('Error fetching form data:', error);
        setLoading(false); // Error occurred while loading data
      });
  }, [showNotification]);

  // Handle cell click for editing
  const handleCellClick = (rowIndex, columnName) => {
    setEditedIndex(rowIndex); // Set the edited row index
  };

  // Handle cell change for editing
  const handleCellChange = (rowIndex, columnName, newValue) => {
    const updatedFormData = [...formData];
    updatedFormData[rowIndex][columnName] = newValue;
    setFormData(updatedFormData);
  };

  // Handle form submit to save edited data
  const handleFormSubmit = (index) => {
    const updatedForm = formData[index];

    // Update the data in the MongoDB database
    axios.post('http://localhost:3001/updateVehicleDatas', {
      id: updatedForm._id,
      updatedData: updatedForm,
    })
    .then(response => {
      console.log('Form data updated in MongoDB:', response.data);
      alert('Data Update successfully!');
    })
    .catch(error => {
      console.error('Error updating form data in MongoDB:', error);
      alert('Data Update error!');
    });

    // Reset the editedIndex after saving
    setEditedIndex(-1);
  };

  // Handle delete
  const handleDelete = (id) => {
    // Delete data from the MongoDB database
    axios.post('http://localhost:3001/deleteVehicleData', {
      id: id,
    })
    .then(response => {
      console.log('Form data deleted from MongoDB:', response.data);
      // Refresh form data after deletion
      axios.get('http://localhost:3001/getAllVehicle')
        .then(response => {
          setFormData(response.data.data);
          alert('Request Form Cancel successfully!');
        })
        .catch(error => {
          console.error('Error fetching updated form data:', error);
          alert('Request Form Cancel Error!');
        });
    })
    .catch(error => {
      console.error('Error deleting form data from MongoDB:', error);
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <><div className='header-rectangle' />
    <img className='logo' alt='Kotelawala defence' src='kdu.png' />
    <button type='button' className='backbtn' onClick={() => window.history.back()}> Back </button>
    
    <div className="mid-container">
        <table className="table">
        <thead className='fixed-header1'>
            <tr>
              <th>Vehicle Number</th>
              <th>Vehicle Owner </th>
              <th>Register Date</th>
              <th>Start Date of Insurance	</th>
              <th>Expire Date of Insurance </th> {/* Corrected the typo here */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((form, index) => (
              <tr key={index}>
                <td>
                  {editedIndex === index ? (
                    <input
                      type="text"
                      value={form.vehiclenumber}
                      onChange={(e) => handleCellChange(index, 'vehiclenumber', e.target.value)} />
                  ) : (
                    <span onClick={() => handleCellClick(index, 'vehiclenumber')}>{form.vehiclenumber}</span>
                  )}
                </td>
                <td>
                  {editedIndex === index ? (
                    <input
                      type="text"
                      value={form.vehicleowner}
                      onChange={(e) => handleCellChange(index, 'vehicleowner', e.target.value)} />
                  ) : (
                    <span onClick={() => handleCellClick(index, 'vehicleowner')}>{form.vehicleowner}</span>
                  )}
                </td>
                <td>
                  {editedIndex === index ? (
                    <input
                      type="text"
                      value={form.registerdate}
                      onChange={(e) => handleCellChange(index, 'registerdate', e.target.value)} />
                  ) : (
                    <span onClick={() => handleCellClick(index, 'registerdate')}>{form.registerdate}</span>
                  )}
                </td>
                <td>
                  {editedIndex === index ? (
                    <input
                      type="text"
                      value={form.insurancedate}
                      onChange={(e) => handleCellChange(index, 'insurancedate', e.target.value)} />
                  ) : (
                    <span onClick={() => handleCellClick(index, 'insurancedate')}>{form.insurancedate}</span>
                  )}
                </td>
                <td>
                  {editedIndex === index ? (
                    <input
                      type="text"
                      value={form.expireddate}
                      onChange={(e) => handleCellChange(index, 'expireddate', e.target.value)} />
                  ) : (
                    <span onClick={() => handleCellClick(index, 'expireddate')}>{form.expireddate}</span>
                  )}
                </td>
                <td>
                  {editedIndex === index && (
                    <button className='savebtn' onClick={() => handleFormSubmit(index)}>Save</button>
                  )}

                  <button className='deletebtn' onClick={() => handleDelete(form._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div></>
  );
}

export default FormD;
