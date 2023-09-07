import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function FormD({ showNotification }) {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    // Fetch form data from the server
    axios.get('http://localhost:3001/getAllForm2')
      .then(response => {
        setFormData(response.data.data);
        // Filter and prepare the data for the notification
        const filteredData = response.data.data.map(form => ({
          ...form,
          isEditing: false, // Add property to track editing state
        }));
        showNotification(filteredData);
      })
      .catch(error => {
        console.error('Error fetching form data:', error);
      });
  }, [showNotification]);

  const handleCellClick = (rowIndex, columnName) => {
    const updatedFormData = [...formData];
    updatedFormData[rowIndex].isEditing = columnName;
    setFormData(updatedFormData);
  };

  const handleCellChange = (rowIndex, columnName, newValue) => {
    const updatedFormData = [...formData];
    updatedFormData[rowIndex][columnName] = newValue;
    setFormData(updatedFormData);
  };

  const handleFormSubmit = (index) => {
    const updatedForm = formData[index];

    // Update the data in the MongoDB database
    axios.post('http://localhost:3001/updateFormDatas2', {
      id: updatedForm._id,
      updatedData: updatedForm,
    })
    .then(response => {
      console.log('Form data updated in MongoDB:', response.data);
      // Refresh form data after update
      axios.get('http://localhost:3001/getAllForm2')
        .then(response => {
          setFormData(response.data.data);
          alert('Data Update successfully!');
        })
        .catch(error => {
          console.error('Error fetching updated form data:', error);
          alert('Data Update error!');
        });
    })
    .catch(error => {
      console.error('Error updating form data in MongoDB:', error);
    });
  };


  const handleDelete = (id) => {
    // Delete data from the MongoDB database
    axios.post('http://localhost:3001/deleteFormData2', {
      id: id,
    })
    .then(response => {
      console.log('Form data deleted from MongoDB:', response.data);
      // Refresh form data after deletion
      axios.get('http://localhost:3001/getAllForm2')
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

  

  return (
    <div className="form-container">
      <h1>Edit Or Cancel Form Data</h1>
      <h4>(If you cancel request please call to inform MTO admin officer)</h4>
      <table className="data-table full-width">
        <thead>
          {/* ... Table header ... */}
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
            
          </tr>
        </thead>
        <tbody>
          {formData.map((form, rowIndex) => (
            <tr key={rowIndex}>
              {/* ... Table data cells ... */}
              <td
                onClick={() => handleCellClick(rowIndex, 'applicantname')}
              >
                {form.isEditing === 'applicantname' ? (
                  <input
                    type="text"
                    value={form.applicantname}
                    onChange={e => handleCellChange(rowIndex, 'applicantname', e.target.value)}
                  />
                ) : (
                  form.applicantname
                )}
              </td>
              <td
                onClick={() => handleCellClick(rowIndex, 'appiicantAppoinment')}
              >
                {form.isEditing === 'appiicantAppoinment' ? (
                  <input
                    type="text"
                    value={form.appiicantAppoinment}
                    onChange={e => handleCellChange(rowIndex, 'appiicantAppoinment', e.target.value)}
                  />
                ) : (
                  form.appiicantAppoinment
                )}
              </td>
              <td
                onClick={() => handleCellClick(rowIndex, 'vehicleIncharge')}
              >
                {form.isEditing === 'vehicleIncharge' ? (
                  <input
                    type="text"
                    value={form.vehicleIncharge}
                    onChange={e => handleCellChange(rowIndex, 'vehicleIncharge', e.target.value)}
                  />
                ) : (
                  form.vehicleIncharge
                )}
              </td>
              <td
                onClick={() => handleCellClick(rowIndex, 'dateofRequired')}
              >
                {form.isEditing === 'dateofRequired' ? (
                  <input
                    type="text"
                    value={form.dateofRequired}
                    onChange={e => handleCellChange(rowIndex, 'dateofRequired', e.target.value)}
                  />
                ) : (
                  form.dateofRequired
                )}
              </td>
              <td
                onClick={() => handleCellClick(rowIndex, 'timeofRequired')}
              >
                {form.isEditing === 'timeofRequired' ? (
                  <input
                    type="text"
                    value={form.timeofRequired}
                    onChange={e => handleCellChange(rowIndex, 'timeofRequired', e.target.value)}
                  />
                ) : (
                  form.timeofRequired
                )}
              </td>
              <td
                onClick={() => handleCellClick(rowIndex, 'natureofDuty')}
              >
                {form.isEditing === 'natureofDuty' ? (
                  <input
                    type="text"
                    value={form.natureofDuty}
                    onChange={e => handleCellChange(rowIndex, 'natureofDuty', e.target.value)}
                  />
                ) : (
                  form.natureofDuty
                )}
              </td>
              <td
                onClick={() => handleCellClick(rowIndex, 'addresstoGo')}
              >
                {form.isEditing === 'addresstoGo' ? (
                  <input
                    type="text"
                    value={form.addresstoGo}
                    onChange={e => handleCellChange(rowIndex, 'addresstoGo', e.target.value)}
                  />
                ) : (
                  form.addresstoGo
                )}
              </td>
              <td
                onClick={() => handleCellClick(rowIndex, 'requirement')}
              >
                {form.isEditing === 'requirement' ? (
                  <input
                    type="text"
                    value={form.addresstoGo}
                    onChange={e => handleCellChange(rowIndex, 'requirement', e.target.value)}
                  />
                ) : (
                  form.requirement
                )}
              </td>
              <td
                onClick={() => handleCellClick(rowIndex, 'timetobeSpent')}
              >
                {form.isEditing === 'timetobeSpent' ? (
                  <input
                    type="text"
                    value={form.timetobeSpent}
                    onChange={e => handleCellChange(rowIndex, 'timetobeSpent', e.target.value)}
                  />
                ) : (
                  form.timetobeSpent
                )}
              </td>
              <td
                onClick={() => handleCellClick(rowIndex, 'distance')}
              >
                {form.isEditing === 'distance' ? (
                  <input
                    type="text"
                    value={form.distance}
                    onChange={e => handleCellChange(rowIndex, 'distance', e.target.value)}
                  />
                ) : (
                  form.distance
                )}
              </td>
              <td
                onClick={() => handleCellClick(rowIndex, 'dateofArrival')}
              >
                {form.isEditing === 'dateofArrival' ? (
                  <input
                    type="text"
                    value={form.dateofArrival}
                    onChange={e => handleCellChange(rowIndex, 'dateofArrival', e.target.value)}
                  />
                ) : (
                  form.dateofArrival
                )}
              </td>
              <td
                onClick={() => handleCellClick(rowIndex, 'timeofArrival')}
              >
                {form.isEditing === 'timeofArrival' ? (
                  <input
                    type="text"
                    value={form.timeofArrival}
                    onChange={e => handleCellChange(rowIndex, 'timeofArrival', e.target.value)}
                  />
                ) : (
                  form.timeofArrival
                )}
              </td>
              <td
                onClick={() => handleCellClick(rowIndex, 'numofOfficers')}
              >
                {form.isEditing === 'numofOfficers' ? (
                  <input
                    type="text"
                    value={form.numofOfficers}
                    onChange={e => handleCellChange(rowIndex, 'numofOfficers', e.target.value)}
                  />
                ) : (
                  form.numofOfficers
                )}
              </td>
              <td
                onClick={() => handleCellClick(rowIndex, 'numofLectures')}
              >
                {form.isEditing === 'numofLectures' ? (
                  <input
                    type="text"
                    value={form.numofLectures}
                    onChange={e => handleCellChange(rowIndex, 'numofLectures', e.target.value)}
                  />
                ) : (
                  form.numofLectures
                )}
              </td>
              <td
                onClick={() => handleCellClick(rowIndex, 'numofInstructors')}
              >
                {form.isEditing === 'numofInstructors' ? (
                  <input
                    type="text"
                    value={form.numofInstructors}
                    onChange={e => handleCellChange(rowIndex, 'numofInstructors', e.target.value)}
                  />
                ) : (
                  form.numofInstructors
                )}
              </td>
              <td
                onClick={() => handleCellClick(rowIndex, 'numofcadetOfficers')}
              >
                {form.isEditing === 'numofcadetOfficers' ? (
                  <input
                    type="text"
                    value={form.numofcadetOfficers}
                    onChange={e => handleCellChange(rowIndex, 'numofcadetOfficers', e.target.value)}
                  />
                ) : (
                  form.numofcadetOfficers
                )}
              </td>
              <td
                onClick={() => handleCellClick(rowIndex, 'numofdayScholers')}
              >
                {form.isEditing === 'numofdayScholers' ? (
                  <input
                    type="text"
                    value={form.numofdayScholers}
                    onChange={e => handleCellChange(rowIndex, 'numofdayScholers', e.target.value)}
                  />
                ) : (
                  form.numofdayScholers
                )}
              </td>
              <td
                onClick={() => handleCellClick(rowIndex, 'numofcivilStaff')}
              >
                {form.isEditing === 'numofcivilStaff' ? (
                  <input
                    type="text"
                    value={form.numofcivilStaff}
                    onChange={e => handleCellChange(rowIndex, 'numofcivilStaff', e.target.value)}
                  />
                ) : (
                  form.numofcivilStaff
                )}
              </td>
              <td
                onClick={() => handleCellClick(rowIndex, 'totalofPassengers')}
              >
                {form.isEditing === 'totalofPassengers' ? (
                  <input
                    type="text"
                    value={form.totalofPassengers}
                    onChange={e => handleCellChange(rowIndex, 'totalofPassengers', e.target.value)}
                  />
                ) : (
                  form.totalofPassengers
                )}
              </td>
              <td
                onClick={() => handleCellClick(rowIndex, 'routetoFollow')}
              >
                {form.isEditing === 'routetoFollow' ? (
                  <input
                    type="text"
                    value={form.routetoFollow}
                    onChange={e => handleCellChange(rowIndex, 'routetoFollow', e.target.value)}
                  />
                ) : (
                  form.routetoFollow
                )}
              </td>
              <td
                onClick={() => handleCellClick(rowIndex, 'dateofApply')}
              >
                {form.isEditing === 'dateofApply' ? (
                  <input
                    type="text"
                    value={form.dateofApply}
                    onChange={e => handleCellChange(rowIndex, 'dateofApply', e.target.value)}
                  />
                ) : (
                  form.dateofApply
                )}
              </td>
              {/* ... Other data cells ... */}
              <td>
              <button className="action-button save-button" onClick={() => handleFormSubmit(rowIndex)}>Save</button>
              
              </td>
              <td>
              <button className="action-button delete-button" onClick={() => handleDelete(form._id)}>Delete</button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FormD;
